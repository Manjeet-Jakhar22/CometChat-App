import { ImageSourcePropType, ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { JSX } from "react";

export type DeletedBubbleStyle = {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  icon?: JSX.Element | ImageSourcePropType;
  iconContainerStyle?: ViewStyle;
  iconStyle?: ImageStyle;
};

export const getDeletedBubbleStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: DeletedBubbleStyle;
  outgoingBubbleStyle: DeletedBubbleStyle;
} => {
  return {
    incomingBubbleStyle: {
      containerStyle: {},
      textStyle: {
        color: color.receiveBubbleTimestamp,
        ...typography.body.regular,
      },
      iconStyle: {
        tintColor: color.receiveBubbleTimestamp
      }
    },
    outgoingBubbleStyle: {
      containerStyle: {},
      textStyle: {
        color: color.sendBubbleText,
        ...typography.body.regular,
      },
      iconStyle: {
        tintColor: color.sendBubbleText
      }
    },
  };
};
