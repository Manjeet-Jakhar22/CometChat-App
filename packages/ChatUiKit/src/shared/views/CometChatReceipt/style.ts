import { ImageSourcePropType, ImageStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { JSX } from "react";

export type ReceiptStyles = {
  waitIcon?: ImageSourcePropType | JSX.Element;
  sentIcon?: ImageSourcePropType | JSX.Element;
  deliveredIcon?: ImageSourcePropType | JSX.Element;
  readIcon?: ImageSourcePropType | JSX.Element;
  errorIcon?: ImageSourcePropType | JSX.Element;

  waitIconStyle: ImageStyle;
  sentIconStyle: ImageStyle;
  deliveredIconStyle: ImageStyle;
  readIconStyle: ImageStyle;
  errorIconStyle: ImageStyle;
};

export const getMessageReceiptStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): ReceiptStyles => {
  return {
    waitIconStyle: {
      height: spacing.spacing.s4,
      width: spacing.spacing.s4,
      tintColor: color.iconSecondary,
    },
    sentIconStyle: {
      height: spacing.spacing.s4,
      width: spacing.spacing.s4,
      tintColor: color.iconSecondary,
    },
    deliveredIconStyle: {
      height: spacing.spacing.s4,
      width: spacing.spacing.s4,
      tintColor: color.iconSecondary,
    },
    readIconStyle: {
      height: spacing.spacing.s4,
      width: spacing.spacing.s4,
      tintColor: color.success,
    },
    errorIconStyle: {
      height: spacing.spacing.s4,
      width: spacing.spacing.s4,
      tintColor: color.error,
    },
  };
};
