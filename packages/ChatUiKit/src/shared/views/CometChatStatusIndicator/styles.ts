import { ImageStyle, StyleSheet, ViewStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";

export type StatusIndicatorStyles = {
  containerStyleOnline: ViewStyle;
  containerStylePrivate: ViewStyle;
  containerStyleProtected: ViewStyle;
  imageStylePrivate: ImageStyle;
  imageStyleProtected: ImageStyle;
};

export const getStatusIndicatorStyles = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): StatusIndicatorStyles => {
  return StyleSheet.create({
    containerStyleOnline: {
      position: "absolute",
      end: spacing.spacing.s0,
      bottom: spacing.spacing.s0,
      height: spacing.spacing.s3 + spacing.spacing.s0_5,
      width: spacing.spacing.s3 + spacing.spacing.s0_5,
      borderRadius: spacing.radius.max,
      borderWidth: spacing.spacing.s0_5,
      borderColor: color.background1,
      backgroundColor: color.success,
      justifyContent: "center",
      alignItems: "center",
    },
    containerStylePrivate: {
      position: "absolute",
      end: spacing.spacing.s0,
      bottom: spacing.spacing.s0,
      height: spacing.spacing.s3 + spacing.spacing.s0_5,
      width: spacing.spacing.s3 + spacing.spacing.s0_5,
      borderRadius: spacing.radius.max,
      borderWidth: spacing.spacing.s0_5,
      borderColor: color.background1,
      backgroundColor: color.success,
      justifyContent: "center",
      alignItems: "center",
    },
    containerStyleProtected: {
      position: "absolute",
      end: spacing.spacing.s0,
      bottom: spacing.spacing.s0,
      height: spacing.spacing.s3 + spacing.spacing.s0_5,
      width: spacing.spacing.s3 + spacing.spacing.s0_5,
      borderRadius: spacing.radius.max,
      borderWidth: spacing.spacing.s0_5,
      borderColor: color.background1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: color.warning,
    },
    imageStylePrivate: { width: spacing.spacing.s2, height: spacing.spacing.s2 },
    imageStyleProtected: { width: spacing.spacing.s2, height: spacing.spacing.s2 },
  });
};
