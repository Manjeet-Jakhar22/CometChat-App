import { TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../theme/type";

export type IncomingCallStyle = {
  containerStyle: ViewStyle;
  titleTextStyle: TextStyle;
  subtitleTextStyle: TextStyle;
  avatarStyle: CometChatTheme["avatarStyle"];
  acceptCallTextStyle: TextStyle;
  acceptCallButtonStyle: ViewStyle;
  declineCallTextStyle: TextStyle;
  declineCallButtonStyle: ViewStyle;
};

export const getIncomingCallStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): IncomingCallStyle => {
  return {
    containerStyle: {
      backgroundColor: color.background3,
      padding: 20,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
    titleTextStyle: {
      color: color.textPrimary,
      ...typography.heading2.bold,
    },
    subtitleTextStyle: {
      color: color.textSecondary,
      marginTop: spacing.spacing.s1,
      ...typography.heading4.regular,
    },
    avatarStyle: {
      containerStyle: {
        height: 48,
        width: 48,
      },
      imageStyle: {},
      textStyle: {},
    },
    acceptCallButtonStyle: {
      flex: 1,
      backgroundColor: color.success,
      paddingVertical: 12,
      borderRadius: 8,
    },
    acceptCallTextStyle: {
      color: color.primaryButtonText,
      textAlign: "center",
      ...typography.button.medium,
    },
    declineCallButtonStyle: {
      flex: 1,
      backgroundColor: color.error,
      paddingVertical: 12,
      borderRadius: 8,
    },
    declineCallTextStyle: {
      color: color.primaryButtonText,
      textAlign: "center",
      ...typography.button.medium,
    },
  };
};