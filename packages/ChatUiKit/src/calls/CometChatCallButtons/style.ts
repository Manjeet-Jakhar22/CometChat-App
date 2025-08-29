import { ImageSourcePropType, ImageStyle, StyleSheet, ViewStyle } from "react-native";
import { CometChatTheme } from "../../theme/type";
import { JSX } from "react";

export type CallButtonStyle = {
  containerStyle: ViewStyle;

  audioCallButtonIcon?: ImageSourcePropType | JSX.Element;
  audioCallButtonIconStyle: ImageStyle;
  audioCallButtonIconContainerStyle: ViewStyle;

  videoCallButtonIcon?: ImageSourcePropType | JSX.Element;
  videoCallButtonIconStyle: ImageStyle;
  videoCallButtonIconContainerStyle: ViewStyle;
};

export const getCallButtonStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
) =>
  StyleSheet.create({
    containerStyle: {
      flexDirection: "row",
      gap: 16,
    },
    audioCallButtonIconStyle: {
      tintColor: color.iconPrimary,
      height: spacing.spacing.s6,
      width: spacing.spacing.s6,
    },
    videoCallButtonIconStyle: {
      tintColor: color.iconPrimary,
      height: spacing.spacing.s6,
      width: spacing.spacing.s6,
    },
  }) as CometChatTheme['callButtonStyles'];
