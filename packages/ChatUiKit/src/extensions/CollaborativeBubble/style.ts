import { deepMerge } from "../../shared/helper/helperFunctions";
import { CometChatTheme } from "../../theme/type";

export const getCollabBubbleStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: CometChatTheme["collaborativeBubbleStyles"];
  outgoingBubbleStyle: CometChatTheme["collaborativeBubbleStyles"];
} => {
  return {
    incomingBubbleStyle: {
      containerStyle: {
        paddingHorizontal: spacing.padding.p1,
        paddingTop: spacing.padding.p1,
      },
      imageStyle: {
        width: 232,
        height: 140,
        borderRadius: spacing.radius.r2,
      },
      titleStyle: {
        ...typography.body.medium,
        color: color.receiveBubbleText,
      },
      subtitleStyle: {
        ...typography.caption2.regular,
        color: color.receiveBubbleTimestamp,
      },
      iconStyle: {
        height: 32,
        width: 32,
        tintColor: color.receiveBubbleIcon,
      },
      iconContainerStyle: {
        paddingHorizontal: spacing.padding.p1
      },
      buttonViewStyle: {
        paddingHorizontal: spacing.padding.p4,
        paddingVertical: spacing.padding.p2,
      },
      buttonTextStyle: {
        ...typography.button.medium,
        color: color.primaryButtonBackground,
        textAlign: 'center'
      },
      dividerStyle: {
        height: 1,
        backgroundColor: color.borderDark,
        width: 240,
        marginLeft: -4, // Negative margin equal to parent's padding
        marginRight: -4, // Negative margin equal to parent's padding
      }
    },
    outgoingBubbleStyle: {
      containerStyle: {
        paddingHorizontal: spacing.padding.p1,
        paddingTop: spacing.padding.p1,
      },
      imageStyle: {
        width: 232,
        height: 140,
        borderRadius: spacing.radius.r2,
      },
      titleStyle: {
        ...typography.body.medium,
        color: color.sendBubbleText,
      },
      subtitleStyle: {
        ...typography.caption2.regular,
        color: color.sendBubbleText,
      },
      iconStyle: {
        height: 32,
        width: 32,
        tintColor: color.sendBubbleIcon,
      },
      iconContainerStyle: {
        paddingHorizontal: spacing.padding.p1
      },
      buttonViewStyle: {
        paddingHorizontal: spacing.padding.p4,
        paddingVertical: spacing.padding.p2,
      },
      buttonTextStyle: {
        ...typography.button.medium,
        color: color.sendBubbleText,
        textAlign: 'center'
      },
      dividerStyle: {
        height: 1,
        backgroundColor: color.extendedPrimary800,
        width: 240,
        //position: 'absolute',
        marginLeft: -4, // Negative margin equal to parent's padding
        marginRight: -4, // Negative margin equal to parent's padding
      }
    },
  };
};

export const getCollabBubbleStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: CometChatTheme["collaborativeBubbleStyles"];
  outgoingBubbleStyle: CometChatTheme["collaborativeBubbleStyles"];
} => {
  return deepMerge(getCollabBubbleStyleLight(color, spacing, typography)!, {});
};
