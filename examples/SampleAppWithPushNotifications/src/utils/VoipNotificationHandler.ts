import {AppState, Platform} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import RNCallKeep, {IOptions} from 'react-native-callkeep';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {navigate, navigationRef} from '../navigation/NavigationService';
import VoipPushNotification from 'react-native-voip-push-notification';

/**
 * Generate a unique UUID (Universally Unique Identifier).
 * This will be used, for example, as a 'callUUID' in RNCallKeep so it can track calls.
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Configuration options for RNCallKeep (for both iOS and Android).
 * This is mostly about setting up how the app handles calls natively on each platform.
 */
const options: IOptions = {
  ios: {
    appName: 'Sampleapp',
  },
  android: {
    alertTitle: 'VOIP required',
    alertDescription:
      'This application needs to access your phone accounts to make calls',
    cancelButton: 'Cancel',
    okButton: 'OK',
    imageName: 'ic_notification', // For Android notifications
    additionalPermissions: [],
    foregroundService: {
      channelId: 'com.cometchat.sampleapp.reactnative.android',
      channelName: 'Sampleapp Channel',
      notificationTitle: 'Sampleapp is running in the background',
    },
  },
};

export class VoipNotificationHandler {
  channelId: string = '';
  currentNotificationId: string = '';
  // Whether the phone is currently 'ringing'
  isRinging: boolean = false;
  // Whether the call has been answered
  isAnswered: boolean = false;
  // UUID of the caller
  callerId: string = '';
  // Object that holds data about the incoming message/call
  msg: any = {};

  constructor() {
    this.initialize();
  }

  /**
   * The main initialization function that sets up:
   *  - RNCallKeep permissions
   *  - The Notifee channel (on Android)
   *  - Event listeners for incoming calls and actions
   */
  initialize() {
    this.getPermissions();
    if (Platform.OS === 'android') {
      this.createNotificationChannel();
    }
    this.setupEventListeners();
  }

  /**
   * Request permissions and set up RNCallKeep for handling calls.
   * - On iOS, checks/requests permission to show native call UI.
   * - On Android, sets up phone account if needed.
   */
  async getPermissions() {
    try {
      // Setup RNCallKeep using the provided options
      await RNCallKeep.setup(options);
      // Mark the device as available and reachable for calls
      RNCallKeep.setAvailable(true);
      RNCallKeep.setReachable();
      // Check if a phone account is enabled (Android-specific)
      await RNCallKeep.checkPhoneAccountEnabled();
    } catch (err) {
      console.error('[VoipNotificationHandler] Error in getPermissions:', err);
    }
  }

  /**
   * Create a Notifee notification channel on Android
   * so that notifications have the correct importance level (HIGH),
   * vibration, lights, etc.
   */
  async createNotificationChannel() {
    try {
      this.channelId = await notifee.createChannel({
        id: 'message',
        name: 'Messages',
        lights: true,
        vibration: true,
        importance: AndroidImportance.HIGH,
      });
    } catch (error) {
      console.error(
        '[VoipNotificationHandler] Error in createNotificationChannel:',
        error,
      );
    }
  }

  /**
   * Display the native incoming call screen on Android using RNCallKeep.
   * - Called when an incoming call notification is received.
   */
  displayCallAndroid() {
    this.isRinging = true;
    this.callerId = generateUUID();

    if (this.msg) {
      // Display the incoming call UI with the caller's name
      RNCallKeep.displayIncomingCall(
        this.callerId,
        this.msg.senderName,
        this.msg.senderName,
        'generic',
      );
    } else {
      console.error(
        '[VoipNotificationHandler] displayCallAndroid => No call data found in this.msg!',
      );
    }
  }

  /**
   * Callback function for 'didDisplayIncomingCall' event (iOS only),
   * which is fired when the native iOS call screen is displayed.
   * - This sets the internal callerId if provided by iOS,
   *   and marks that we are indeed ringing.
   */
  didDisplayIncomingCall(args: {callUUID?: string; error?: any}) {
    if (args.callUUID && Platform.OS === 'ios') {
      this.callerId = args.callUUID;
    }
    if (args.error) {
      console.error(
        '[VoipNotificationHandler] didDisplayIncomingCall error =>',
        args.error,
      );
    }
    this.isRinging = true;
  }

  /**
   * Ends the call with a given UUID (or fallback to our stored callerId).
   * - This is typically used when we manually want to remove the dialer UI.
   */
  removeCallDialerWithUUID = (callerId: string) => {
    const uuidToEnd = callerId || this.callerId;
    if (uuidToEnd) {
      // 6 -> Call hung up
      RNCallKeep.reportEndCallWithUUID(uuidToEnd, 6);
    }
  };

  /**
   * Handles the 'answerCall' event from RNCallKeep.
   * - When the user answers the call on the native call screen,
   *   bring the app to the foreground, accept the call via CometChat,
   *   and then navigate to our 'OngoingCallScreen'.
   */
  onAnswerCall = async ({callUUID}: {callUUID: string}) => {
    if (this.isAnswered) {
      return; // Avoid double-answer
    }

    this.isRinging = false;
    this.isAnswered = true;

    // Bring the app to the foreground
    setTimeout(async () => {
      try {
        const sessionID = this.msg?.sessionId;
        if (!sessionID) {
          console.error(
            '[VoipNotificationHandler] onAnswerCall => No session ID to accept call.',
          );
          return;
        }
        // Accept the call in CometChat
        await CometChat.acceptCall(sessionID);
        console.log('[VoipNotificationHandler] acceptCall => success');

        // On Android, close the native dialer UI to avoid duplication

        console.log(
          '[VoipNotificationHandler] Is navigation ready?',
          navigationRef.isReady(),
        );
        if (Platform.OS === 'android') {
          RNCallKeep.endAllCalls();
        }
        // Navigate to your call screen
        navigate('OngoingCallScreen', {call: this.msg});
      } catch (error: any) {
        // If the call is already accepted, just navigate
        if (error.code === 'ERR_CALL_USER_ALREADY_JOINED') {
          navigate('OngoingCallScreen', {call: this.msg});
        } else {
          console.error('[VoipNotificationHandler] Accept call error:', error);
        }
      } finally {
        RNCallKeep.backToForeground();
      }
    }, 1000);
  };

  /**
   * Convenience method to end all calls on the dialer UI immediately.
   */
  removeCallDialer() {
    RNCallKeep.endAllCalls();
  }

  /**
   * End or reject the call.
   * - If the call was already answered (this.isAnswered) and we have a session ID,
   *   we end the call via CometChat.
   * - Otherwise, if it wasn't answered yet, we reject it.
   * - Finally, we end the call in RNCallKeep and reset local state.
   */
  endCall = async ({callUUID}: {callUUID: string}) => {
    // If msg indicates it's a call
    if (this.msg?.type === 'call') {
      const sessionID = this.msg.sessionId;
      // If call was answered, end it in CometChat
      if (this.isAnswered && sessionID) {
        this.isAnswered = false;
        CometChat.endCall(sessionID);
      } else if (sessionID) {
        // If call wasn't answered, reject the call
        try {
          setTimeout(() => {
            CometChat.rejectCall(sessionID, CometChat.CALL_STATUS.REJECTED);
          }, 300);
        } catch (err) {
          console.error(
            '[VoipNotificationHandler] endCall => Error rejecting call:',
            err,
          );
        }
      }
    }

    // End the call in RNCallKeep
    const callIdToEnd = callUUID || this.callerId;
    if (callIdToEnd) {
      RNCallKeep.endCall(callIdToEnd);
    }
    // Also ensure no ongoing calls remain
    RNCallKeep.endAllCalls();

    // Reset the local state tracking calls
    this.isRinging = false;
    this.isAnswered = false;
    this.callerId = '';
    this.msg = {};
  };

  /**
   * Cancel the Notifee notification if one is shown.
   * - Typically used if you have a custom notification that
   *   you need to cancel for an incoming call.
   */
  async cancel(notificationId: any) {
    await notifee.cancelNotification(
      notificationId || this.currentNotificationId,
    );
  }

  /**
   * Set up various event listeners for incoming VOIP push notifications
   * (on iOS) and for RNCallKeep (on both iOS and Android).
   */
  setupEventListeners() {
    // For iOS VOIP push notifications
    if (Platform.OS === 'ios') {
      VoipPushNotification.addEventListener(
        'notification',
        (notification: any) => {
          // Store the call data
          console.log(
            '[VoipNotificationHandler] Received VOIP push notification:',
            notification,
          );
          this.msg = notification;
        },
      );

      VoipPushNotification.addEventListener('didLoadWithEvents', events => {
        if (!events || !Array.isArray(events) || events.length < 1) {
          return;
        }
        for (let voipPushEvent of events) {
          let {name, data} = voipPushEvent;
          if (
            name ===
            VoipPushNotification.RNVoipPushRemoteNotificationReceivedEvent
          ) {
            this.msg = data;
          }
        }
      });
    }

    // RNCallKeep events for all platforms
    RNCallKeep.addEventListener('answerCall', this.onAnswerCall);
    RNCallKeep.addEventListener('endCall', this.endCall);
    RNCallKeep.addEventListener(
      'didDisplayIncomingCall',
      this.didDisplayIncomingCall.bind(this),
    );
  }
}

// Export a single instance of VoipNotificationHandler to be reused
export const voipHandler = new VoipNotificationHandler();
