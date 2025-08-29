import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";

export type BadgeStyle = {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const getBadgeStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): BadgeStyle => {
  return StyleSheet.create({
    containerStyle: {
      backgroundColor: color.primary,
      borderRadius: spacing.radius.max,
      minWidth: spacing.spacing.s5,
      maxWidth: spacing.spacing.s12,
      height: spacing.spacing.s5,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.spacing.s1,
      paddingVertical: spacing.spacing.s0_5,
    },
    textStyle: {
      color: color.primaryButtonIcon,
      ...typography.caption1.regular,
    },
  });
};
