import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";

export type AvatarStyle = {
  containerStyle: ViewStyle;
  textStyle: TextStyle;
  imageStyle: ImageStyle;
};

export const getAvatarStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): AvatarStyle => {
  return StyleSheet.create({
    containerStyle: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: color.extendedPrimary500,
      height: spacing.spacing.s12,
      width: spacing.spacing.s12,
      borderRadius: spacing.radius.max,
    },
    imageStyle: {
      height: "100%",
      width: "100%",
      borderRadius: spacing.radius.max,
    },
    textStyle: {
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: typography.heading2.bold.fontSize,
      color: color.primaryButtonIcon,
      fontFamily: typography.fontFamily,
      ...typography.heading2.bold,
    },
  });
};
