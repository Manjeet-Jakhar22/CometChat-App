import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../theme/type";
import { DeepPartial } from "../../shared/helper/types";
import { JSX } from "react";

export type GroupCallBubbleStyles = {
  titleStyle: TextStyle;
  subtitleStyle: TextStyle;
  containerStyle: ViewStyle;
  iconStyle: ImageStyle;
  iconContainerStyle: ViewStyle;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  dividerStyle?: ViewStyle;
};

export const getGroupCallBubbleStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: GroupCallBubbleStyles;
  outgoingBubbleStyle: GroupCallBubbleStyles;
} => {
  return {
    incomingBubbleStyle: {
      titleStyle: {
        color: color.receiveBubbleText,
        ...typography.body.medium,
      },
      subtitleStyle: {
        color: color.receiveBubbleTimestamp,
        ...typography.caption1.regular,
      },
      containerStyle: {
        minWidth: 240,
      },
      iconContainerStyle: {
        backgroundColor: color.primaryButtonIcon,
        borderRadius: spacing.radius.max,
        width: spacing.spacing.s10,
        height: spacing.spacing.s10,
        justifyContent: "center",
        alignItems: "center",
      },
      iconStyle: {
        width: spacing.spacing.s5,
        height: spacing.spacing.s5,
        tintColor: color.iconHighlight,
      },
      buttonStyle: {
        paddingVertical: spacing.padding.p3,
        borderRadius: spacing.radius.r3,
        alignItems: "center",
      },
      buttonTextStyle: {
        color: color.primary,
        ...typography.button.medium,
      },
      dividerStyle: {
        height: 1,
        backgroundColor: color.borderDark,
      },
    },
    outgoingBubbleStyle: {
      titleStyle: {
        color: color.sendBubbleText,
        ...typography.body.medium,
      },
      subtitleStyle: {
        color: color.sendBubbleText,
        ...typography.caption1.regular,
      },
      containerStyle: {
        minWidth: 240,
      },
      iconContainerStyle: {
        backgroundColor: color.primaryButtonIcon,
        borderRadius: spacing.radius.max,
        width: spacing.spacing.s10,
        height: spacing.spacing.s10,
        justifyContent: "center",
        alignItems: "center",
      },
      iconStyle: {
        width: spacing.spacing.s5,
        height: spacing.spacing.s5,
        tintColor: color.sendBubbleBackground,
      },
      buttonStyle: {
        paddingVertical: spacing.padding.p3,
        borderRadius: spacing.radius.r3,
        alignItems: "center",
      },
      buttonTextStyle: {
        color: color.sendBubbleText,
        ...typography.button.medium,
      },
      dividerStyle: {
        height: 1,
        backgroundColor: color.extendedPrimary800,
      },
    },
  };
};

export type CallActionBubbleStyles = {
  containerStyle: ViewStyle;
  textStyle: TextStyle;
  iconStyle: ImageStyle;
  iconContainerStyle: ViewStyle;
  missedCallContainerStyle: ViewStyle;
  missedCallTextStyle: TextStyle;
  missedCallIconStyle: ImageStyle;
  missedCallIconContainerStyle: ViewStyle;
};

export const getCallActionBubbleStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<CallActionBubbleStyles> => {
  return {
    containerStyle: {
      flexDirection: "row",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: spacing.radius.max,
      paddingVertical: spacing.padding.p1,
      paddingHorizontal: spacing.padding.p3,
      borderColor: color.borderDefault,
      gap: spacing.spacing.s1,
    },
    textStyle: {
      color: color.textSecondary,
      ...typography.caption1.regular,
    },
    iconStyle: {},
    missedCallContainerStyle: {
      flexDirection: "row",
      alignSelf: "center",
      borderWidth: 1,
      borderRadius: spacing.radius.max,
      paddingVertical: spacing.padding.p1,
      paddingHorizontal: spacing.padding.p3,
      borderColor: color.borderDefault,
      gap: spacing.spacing.s1,
    },
    missedCallTextStyle: {
      color: color.error,
      ...typography.caption1.regular,
    },
    missedCallIconStyle: {
      tintColor: color.error,
    },
  };
};
