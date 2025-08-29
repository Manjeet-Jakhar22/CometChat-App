import { ImageSourcePropType, ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { deepMerge } from "../../helper/helperFunctions";
import { JSX } from "react";

export type ConfirmDialogStyle = {
  containerStyle: ViewStyle;
  titleTextStyle: TextStyle;
  messageTextStyle: TextStyle;
  icon?: ImageSourcePropType | JSX.Element;
  iconContainerStyle: ViewStyle;
  iconImageStyle: ImageStyle;
  cancelButtonStyle: ViewStyle;
  confirmButtonStyle: ViewStyle;
  cancelButtonTextStyle: TextStyle;
  confirmButtonTextStyle: TextStyle;
};

export const getConfirmDialogStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): ConfirmDialogStyle => {
  return StyleSheet.create({
    containerStyle: {
      backgroundColor: color.background1,
      width: "100%",
      padding: 24,
      borderRadius: 16,
      alignItems: "center",
    },
    titleTextStyle: {
      color: color.textPrimary,
      marginBottom: spacing.margin.m2,
      ...typography.heading2.medium,
    },
    messageTextStyle: {
      color: color.textSecondary,
      marginBottom: 24,
      textAlign: "center",
      ...typography.body.regular,
    },
    iconContainerStyle: {
      backgroundColor: color.background2,
      borderRadius: spacing.radius.max,
      width: spacing.spacing.s20,
      height: spacing.spacing.s20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: spacing.spacing.s3,
    },
    iconImageStyle: {
      height: spacing.spacing.s20,
      width: spacing.spacing.s20,
      tintColor: color.iconPrimary,
    },
    cancelButtonStyle: {
      borderRadius: spacing.radius.r2,
      height: 40,
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: color.borderDark,
    },
    cancelButtonTextStyle: {
      color: color.textPrimary,
      //textTransform: "uppercase",
      ...typography.button.medium,
    },
    confirmButtonStyle: {
      backgroundColor: color.error,
      borderRadius: spacing.radius.r2,
      height: 40,
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    confirmButtonTextStyle: {
      color: color.primaryButtonIcon,
      //textTransform: "uppercase",
      ...typography.button.medium,
    },
  });
};

export const getConfirmDialogStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): ConfirmDialogStyle => {
  return <Omit<ConfirmDialogStyle, "icon">>(
    deepMerge(getConfirmDialogStyleLight(color, spacing, typography), {
      containerStyle: {
        backgroundColor: color.background2,
      },
      titleTextStyle: {
        color: color.textPrimary,
      },
      messageTextStyle: {
        color: color.textSecondary,
      },
      iconImageStyle: {
        tintColor: color.iconPrimary,
      },
      iconContainerStyle: {
        backgroundColor: color.background1,
      },
      cancelButtonStyle: {
        borderColor: color.borderDark,
      },
      cancelButtonTextStyle: {
        color: color.textPrimary,
      },
      confirmButtonStyle: {
        backgroundColor: color.error,
      },
      confirmButtonTextStyle: {
        color: color.primaryButtonIcon,
      },
    })
  );
};
