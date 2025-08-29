import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { deepMerge } from "../../helper/helperFunctions";

export type DateStyle = {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const getDateStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DateStyle => {
  return StyleSheet.create({
    containerStyle: {},
    textStyle: {
      color: color.textSecondary,
      ...typography.caption1.regular,
    },
  });
};

export const getDateStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DateStyle => {
  return StyleSheet.create(
    deepMerge(getDateStyleLight(color, spacing, typography), {
      textStyle: {
        color: color.textSecondary,
      },
    })
  );
};
