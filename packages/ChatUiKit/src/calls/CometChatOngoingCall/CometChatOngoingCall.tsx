import { CometChat } from "@cometchat/chat-sdk-react-native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { CallingPackage } from "../CallingPackage";
import { useTheme } from "../../theme";
import { JSX } from "react";

const CometChatCalls = CallingPackage.CometChatCalls;

/**
 * Props for the CometChatOngoingCall component.
 *
 * @interface CometChatOngoingCallInterface
 */
export interface CometChatOngoingCallInterface {
  /** The session ID for the ongoing call */
  sessionID: string;
  /**
   * An instance of the CallSettingsBuilder used to configure the call.
   * This is typically built using CometChatCalls.CallSettingsBuilder.
   */
  callSettingsBuilder: typeof CometChatCalls.CallSettingsBuilder;
  /** Callback fired when an error occurs */
  onError?: (e: CometChat.CometChatException) => void;
}

/**
 * CometChatOngoingCall component.
 *
 * This component handles the ongoing call session by generating a call token and
 * rendering the CometChatCalls component with the appropriate call settings and token.
 *
 * @param {CometChatOngoingCallInterface} props - Component configuration props.
 * @returns {JSX.Element} The rendered ongoing call component.
 */
export const CometChatOngoingCall = (props: CometChatOngoingCallInterface): JSX.Element => {
  const { callSettingsBuilder, onError, sessionID } = props;

  const [callToken, setToken] = useState<string | undefined>(undefined);
  // Build call settings once using the provided builder.
  const callSettings = useRef(callSettingsBuilder?.build());
  const theme = useTheme();

  useEffect(() => {
    // Fetch the logged-in user and generate a token for the ongoing call session.
    CometChat.getLoggedinUser()
      .then((user) => {
        const authToken = user!.getAuthToken();
        CometChatCalls.generateToken(sessionID, authToken)
          .then((token: any) => {
            setToken(token.token);
          })
          .catch((rej: CometChat.CometChatException) => {
            setToken(undefined);
            onError && onError(rej);
          });
      })
      .catch((rej) => {
        console.log("Error", rej);
        onError && onError(rej);
      });

    // Cleanup call settings on unmount.
    return () => {
      callSettings.current = null;
    };
  }, [sessionID, onError]);

  return (
    <View style={[{ height: "100%", width: "100%", position: "relative" }]}>
      {(callSettings.current && callToken && (
        <CometChatCalls.Component callSettings={callSettings.current} callToken={callToken} />
      )) || (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator size={"large"} color={theme.color.primary} />
        </View>
      )}
    </View>
  );
};
