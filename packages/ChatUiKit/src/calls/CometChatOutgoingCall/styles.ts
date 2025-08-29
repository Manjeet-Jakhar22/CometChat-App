import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../theme/type";

export type OutgoingCallStyle = {
  containerStyle: ViewStyle;
  titleTextStyle: TextStyle;
  subtitleTextStyle: TextStyle;
  avatarStyle: CometChatTheme["avatarStyle"];
  endCallButtonStyle: ViewStyle;
  endCallIconStyle: ImageStyle;
};

export const getOutgoingCallStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): OutgoingCallStyle => {
  return {
    containerStyle: {
      flex: 1,
      backgroundColor: color.background2,
      alignItems: "center",
      paddingVertical: 100,
      paddingHorizontal: spacing.spacing.s6,
    },
    titleTextStyle: {
      color: color.textPrimary,
      textAlign: "center",
      ...typography.heading1.bold,
    },
    subtitleTextStyle: {
      color: color.textSecondary,
      marginTop: spacing.spacing.s2,
      ...typography.body.regular,
    },
    avatarStyle: {
      containerStyle: {
        marginTop: spacing.spacing.s10,
        height: 120,
        width: 120,
        borderRadius: spacing.radius.max,
      },
      imageStyle: {},
      textStyle: {},
    },
    endCallButtonStyle: {
      marginTop: "auto",
      backgroundColor: "red",
      padding: 14,
      borderRadius: 1000,
    },
    endCallIconStyle: {
      tintColor: color.staticWhite,
      height: 32,
      width: 32,
    },
  };
};
