import {AppRegistry, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import {voipHandler} from './src/utils/VoipNotificationHandler';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import {navigationRef} from './src/navigation/NavigationService';
import {displayLocalNotification} from './src/utils/helper';
import notifee, {EventType} from '@notifee/react-native';
import {StackActions} from '@react-navigation/native';
import AppErrorBoundary from './AppErrorBoundary';
import {ActiveChatProvider} from './src/utils/ActiveChatContext';

if (global?.ErrorUtils) {
  const defaultHandler = global.ErrorUtils.getGlobalHandler();

  function globalErrorHandler(error, isFatal) {
    console.log(
      '[GlobalErrorHandler]:',
      isFatal ? 'Fatal:' : 'Non-Fatal:',
      error,
    );
    defaultHandler?.(error, isFatal);
  }

  global.ErrorUtils.setGlobalHandler(globalErrorHandler);
}

if (typeof process === 'object' && process.on) {
  process.on('unhandledRejection', (reason, promise) => {
    console.log('[Unhandled Promise Rejection]:', reason);
  });
}

const Root = () => (
  <AppErrorBoundary>
    <ActiveChatProvider>
      <App />
    </ActiveChatProvider>
  </AppErrorBoundary>
);

// Run Notifee background event handler only on Android
if (Platform.OS === 'android') {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    try {
      if (type === EventType.PRESS) {
        const {notification} = detail;
        if (notification?.id) {
          await notifee.cancelNotification(notification.id);
        }
        const data = detail?.notification?.data || {};

        if (data.receiverType === 'group') {
          const extractedId =
            typeof data.conversationId === 'string'
              ? data.conversationId.split('_').slice(1).join('_')
              : '';
          CometChat.getGroup(extractedId).then(
            group => {
              navigationRef.current?.dispatch(
                StackActions.push('Messages', {group}),
              );
            },
            error => console.log('Error fetching group details:', error),
          );
        } else if (data.receiverType === 'user') {
          CometChat.getUser(data.sender).then(
            ccUser => {
              navigationRef.current?.dispatch(
                StackActions.push('Messages', {user: ccUser}),
              );
            },
            error => console.log('Error fetching user details:', error),
          );
        }
      }
    } catch (error) {
      console.log('Error handling notifee background event:', error);
    }
  });
}

// This runs for background/killed states on Android.
if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    try {
      const data = remoteMessage.data || {};
      if (data.type === 'call') {
        switch (data.callAction) {
          case 'initiated':
            voipHandler.msg = data;
            voipHandler.displayCallAndroid();
            break;
          case 'ended':
            CometChat.clearActiveCall();
            voipHandler.endCall(voipHandler.callerId);
            break;
          case 'unanswered':
            CometChat.clearActiveCall();
            if (voipHandler?.callerId) {
              voipHandler.removeCallDialerWithUUID(voipHandler.callerId);
            } else {
              console.warn('Caller ID is missing. Cannot remove call dialer.');
            }
            break;
          case 'busy':
            CometChat.clearActiveCall();
            if (voipHandler?.callerId) {
              voipHandler.removeCallDialerWithUUID(voipHandler.callerId);
            } else {
              console.warn('Caller ID is missing. Cannot remove call dialer.');
            }
            break;
          case 'ongoing':
            voipHandler.displayNotification({
              title: data?.receiverName || '',
              body: 'ongoing call',
            });
            break;
          case 'rejected':
            CometChat.clearActiveCall();
            if (voipHandler?.callerId) {
              voipHandler.removeCallDialerWithUUID(voipHandler.callerId);
            } else {
              console.warn('Caller ID is missing. Cannot remove call dialer.');
            }
            break;
          case 'cancelled':
            CometChat.clearActiveCall();
            if (voipHandler?.callerId) {
              voipHandler.removeCallDialerWithUUID(voipHandler.callerId);
            } else {
              console.warn('Caller ID is missing. Cannot remove call dialer.');
            }
            break;
          default:
            break;
        }
        return;
      } else {
        await displayLocalNotification(remoteMessage);
      }
    } catch (error) {
      console.error('Error in background message handler:', error);
    }
  });
}
AppRegistry.registerComponent(appName, () => Root);
