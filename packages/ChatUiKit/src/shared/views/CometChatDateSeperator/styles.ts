import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { deepMerge } from "../../helper/helperFunctions";
import { CometChatTheme } from "../../../theme/type";

export type DateSeparatorStyle = {
  containerStyle: ViewStyle;
  textStyle: TextStyle;
};

export const getDateSeparatorStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DateSeparatorStyle => {
  return StyleSheet.create({
    containerStyle: {
      paddingHorizontal: spacing.padding.p2,
      paddingVertical: spacing.padding.p1,
      borderWidth: 1,
      //borderColor: color.borderLight,
      borderRadius: spacing.radius.r1,
      alignSelf: "center",
      // TODO: Test this in IOS
      // shadowColor: "#101828",
      // shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 0.05, // 13 in hex (#0D) is 0.05 in decimal
      // shadowRadius: 2,
      // elevation: 2, // Only for Android
    },
    textStyle: {
      color: color.textPrimary,
      ...typography.caption1.medium,
    },
  });
};

export const getDateSeparatorStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DateSeparatorStyle => {
  return StyleSheet.create(
    deepMerge(getDateSeparatorStyleLight(color, spacing, typography), {
      containerStyle: {
        borderColor: color.borderDark,
      },
      textStyle: {
        color: color.textPrimary,
      },
    })
  );
};
