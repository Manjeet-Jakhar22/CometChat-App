import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import {
  CometChatUIKit,
  UIKitSettings,
  CometChatThemeProvider,
  CometChatUIEventHandler,
  CometChatUIEvents,
  CometChatIncomingCall,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppConstants } from "./src/utils/AppConstants";
import RootStackNavigator from "./src/navigation/RootStackNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";

const listenerId = "app";

const App = (): React.ReactElement => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasValidAppCredentials, setHasValidAppCredentials] = useState(false);
  const [callReceived, setCallReceived] = useState(false);
  const incomingCall = useRef<CometChat.Call | CometChat.CustomMessage | null>(
    null
  );

  useEffect(() => {
    const initCometChat = async () => {
      try {
        // Retrieve stored credentials
        const storedCredentials = JSON.parse(
          (await AsyncStorage.getItem("appCredentials")) || "{}"
        );

        // Determine final credentials
        const finalAppId = storedCredentials.appId || AppConstants.appId;
        const finalAuthKey = storedCredentials.authKey || AppConstants.authKey;
        const finalRegion = storedCredentials.region || AppConstants.region;

        // Validate credentials
        const credentialsValid =
          !!finalAppId && !!finalAuthKey && !!finalRegion;
        setHasValidAppCredentials(credentialsValid);

        if (!credentialsValid) {
          setIsInitializing(false);
          return;
        }

        // Initialize CometChat
        await CometChatUIKit.init({
          appId: finalAppId,
          authKey: finalAuthKey,
          region: finalRegion,
          subscriptionType: CometChat.AppSettings
            .SUBSCRIPTION_TYPE_ALL_USERS as UIKitSettings["subscriptionType"],
        });

        // Check if user is already logged in
        const loggedInUser = await CometChat.getLoggedinUser();
        if (loggedInUser) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Initialization error", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initCometChat();
  }, []);

  /**
   * Attach CometChat login listener to handle login and logout events.
   * Updates user login status accordingly.
   */
  useEffect(() => {
    CometChat.addLoginListener(
      listenerId,
      new CometChat.LoginListener({
        loginSuccess: () => {
          setIsLoggedIn(true);
        },
        loginFailure: (e: CometChat.CometChatException) => {
          console.log("LoginListener :: loginFailure", e.message);
        },
        logoutSuccess: () => {
          setIsLoggedIn(false);
        },
        logoutFailure: (e: CometChat.CometChatException) => {
          console.log("LoginListener :: logoutFailure", e.message);
        },
      })
    );

    // Clean up the login listener on component unmount.
    return () => {
      CometChat.removeLoginListener(listenerId);
    };
  }, []);

  /**
   * Attach CometChat call listeners to handle incoming, outgoing, and cancelled call events.
   * Also handles UI events for call end.
   */
  useEffect(() => {
    // Listener for call events.
    CometChat.addCallListener(
      listenerId,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {
          // Check if there's already an active call
          try {
            const activeCall = CometChat.getActiveCall();
            if (activeCall) {
              // If there's an active call, reject the incoming call with busy status
              setTimeout(() => {
                CometChat.rejectCall(
                  call.getSessionId(),
                  CometChat.CALL_STATUS.BUSY
                )
                  .then(() => {
                    console.log("Incoming call rejected due to active call");
                  })
                  .catch((error) => {
                    console.error(
                      "Error rejecting call with busy status:",
                      error
                    );
                  });
              }, 2000);
            } else {
              // No active call, proceed with normal incoming call handling
              // Hide any bottom sheet UI before showing the incoming call screen.
              CometChatUIEventHandler.emitUIEvent(
                CometChatUIEvents.ccToggleBottomSheet,
                {
                  isBottomSheetVisible: false,
                }
              );
              // Store the incoming call and update state.
              incomingCall.current = call;
              setCallReceived(true);
            }
          } catch (error) {
            console.error("Error getting active call:", error);
            // If error getting active call, proceed with normal handling
            CometChatUIEventHandler.emitUIEvent(
              CometChatUIEvents.ccToggleBottomSheet,
              {
                isBottomSheetVisible: false,
              }
            );
            incomingCall.current = call;
            setCallReceived(true);
          }
        },
        onOutgoingCallRejected: () => {
          // Clear the call state if outgoing call is rejected.
          incomingCall.current = null;
          setCallReceived(false);
        },
        onIncomingCallCancelled: () => {
          // Clear the call state if the incoming call is cancelled.
          incomingCall.current = null;
          setCallReceived(false);
        },
      })
    );

    // Additional listener to handle call end events.
    CometChatUIEventHandler.addCallListener(listenerId, {
      ccCallEnded: () => {
        // Clear the incoming call state when a call ends.
        console.log("Call ended, clearing incoming call state");
        incomingCall.current = null;
        setCallReceived(false);
      },
    });

    // Remove call listeners on cleanup.
    return () => {
      CometChatUIEventHandler.removeCallListener(listenerId);
      CometChat.removeCallListener(listenerId);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        const { status: micStatus } = await Audio.requestPermissionsAsync();

        if (cameraStatus !== "granted" || micStatus !== "granted") {
          console.warn("Camera or microphone permission not granted.");
        }
      } catch (error) {
        console.error("Permission request error:", error);
      }
    };

    requestPermissions();
  }, []);

  if (isInitializing) {
    return (
      <View style={[styles.fullScreen, styles.centerContent]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top','bottom']} style={{flex: 1}}>
      <CometChatThemeProvider>
        {isLoggedIn && callReceived && incomingCall.current ? (
          <CometChatIncomingCall
            call={incomingCall.current}
            onDecline={() => {
              // Handle call decline by clearing the incoming call state.
              incomingCall.current = null;
              setCallReceived(false);
            }}
          />
        ) : null}
        <RootStackNavigator
          isLoggedIn={isLoggedIn}
          hasValidAppCredentials={hasValidAppCredentials}
        />
      </CometChatThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles: { fullScreen: ViewStyle; centerContent: ViewStyle } = {
  fullScreen: { flex: 1 },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
};

export default App;
