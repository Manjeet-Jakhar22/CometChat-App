import { CometChatTheme } from "../../theme/type";
import { deepMerge } from "../../shared/helper/helperFunctions";

const getLinkPreviewBubbleStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["linkPreviewBubbleStyles"] => {
  return {
    containerStyle: {
      paddingHorizontal: spacing.padding.p1,
      paddingTop: spacing.padding.p1,
      flex: 1,
    },
    bodyStyle: {
      containerStyle: {
        //borderRadius: spacing.radius.r2,
        borderBottomLeftRadius: spacing.radius.r2,
        borderBottomRightRadius: spacing.radius.r2,
        padding: spacing.padding.p2,
        backgroundColor: color.extendedPrimary900,
        flex: 1,
      },
      titleStyle: {
        ...typography.body.bold,
        color: color.sendBubbleTimestamp,
      },
      titleContainerStyle: { flex: 1 },
      subtitleTitle: {
        ...typography.caption1.regular,
        color: color.sendBubbleTimestamp,
      },
      subtitleContainerStyle: {
        flex: 1,
        gap: spacing.spacing.s0_5,
      },
      faviconStyle: { height: 32.7, width: 32.7 },
      faviconContainerStyle: {},
    },
    headerImageStyle: {
      alignSelf: "center",
      borderTopLeftRadius: spacing.radius.r2,
      borderTopRightRadius: spacing.radius.r2,
    },
    headerImageContainerStyle: {
      flex: 1,
      maxHeight: 250,
      flexDirection: 'row',
      justifyContent: "center",
      backgroundColor: color.extendedPrimary900,
      borderTopLeftRadius: spacing.radius.r2,
      borderTopRightRadius: spacing.radius.r2,
    },
  };
};

export const getLinkPreviewBubbleStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: CometChatTheme["linkPreviewBubbleStyles"];
  outgoingBubbleStyle: CometChatTheme["linkPreviewBubbleStyles"];
} => {
  return {
    incomingBubbleStyle: deepMerge(getLinkPreviewBubbleStyle(color, spacing, typography)!, {
      bodyStyle: {
        containerStyle: {
          backgroundColor: color.neutral400,
        },
        titleStyle: {
          color: color.receiveBubbleText,
        },
        subtitleTitle: {
          color: color.receiveBubbleText,
        },
      },
      headerImageContainerStyle: {
        backgroundColor: color.neutral400,
      },
    }) as CometChatTheme['linkPreviewBubbleStyles'],
    outgoingBubbleStyle: getLinkPreviewBubbleStyle(color, spacing, typography),
  };
};

export const getLinkPreviewBubbleStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: CometChatTheme["linkPreviewBubbleStyles"];
  outgoingBubbleStyle: CometChatTheme["linkPreviewBubbleStyles"];
} => {
  return {
    incomingBubbleStyle: getLinkPreviewBubbleStyleLight(color, spacing, typography)
      .incomingBubbleStyle,
    outgoingBubbleStyle: getLinkPreviewBubbleStyleLight(color, spacing, typography)
      .outgoingBubbleStyle,
  };
};
