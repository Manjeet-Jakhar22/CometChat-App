import { CometChatTheme } from "../../../theme/type";

export const getFileBubbleStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingFileBubbleStyle: Partial<CometChatTheme["fileBubbleStyles"]>;
  outgoingFileBubbleStyle: Partial<CometChatTheme["fileBubbleStyles"]>;
} => {
  return {
    incomingFileBubbleStyle: {
      containerStyle: {
        paddingTop: spacing.padding.p3,
        paddingHorizontal: spacing.padding.p2,
        paddingBottom: spacing.padding.p0,
        borderRadius: spacing.radius.r3,
        alignSelf: "flex-start",
        height: 74,
        width: 240,
      },
      titleStyle: {
        color: color.neutral900,
        ...typography.body.medium,
        flexShrink: 1,
        maxWidth: "90%",
      },
      subtitleStyle: {
        color: color.neutral600,
        ...typography.caption2.regular,
      },
      downloadIconStyle: {
        height: 20,
        width: 20,
        tintColor: color.primary,
      },
    },
    outgoingFileBubbleStyle: {
      containerStyle: {
        paddingTop: spacing.padding.p3,
        paddingHorizontal: spacing.padding.p2,
        borderRadius: spacing.radius.r3,
        height: 74,
        width: 240,
      },
      titleStyle: {
        color: color.staticWhite,
        ...typography.body.medium,
        flexShrink: 1,
        maxWidth: "90%",
      },
      subtitleStyle: {
        color: color.staticWhite,
        ...typography.caption2.regular,
      },
      downloadIconStyle: {
        height: 20,
        width: 20,
        tintColor: color.staticWhite,
      },
    },
  };
};

export const getFileBubbleStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingFileBubbleStyle: Partial<CometChatTheme["fileBubbleStyles"]>;
  outgoingFileBubbleStyle: Partial<CometChatTheme["fileBubbleStyles"]>;
} => {
  return {
    incomingFileBubbleStyle: {
      containerStyle: {
        paddingTop: spacing.padding.p3,
        paddingHorizontal: spacing.padding.p2,
        paddingBottom: spacing.padding.p0,
        borderRadius: spacing.radius.r3,
        alignSelf: "flex-start",
        height: 74,
        width: 240,
      },
      titleStyle: {
        color: color.neutral900,
        ...typography.body.medium,
        flexShrink: 1,
        maxWidth: "90%",
      },
      subtitleStyle: {
        color: color.neutral600,
        ...typography.caption2.regular,
      },
      downloadIconStyle: {
        height: 20,
        width: 20,
        tintColor: color.primary,
      },
    },
    outgoingFileBubbleStyle: {
      containerStyle: {
        paddingTop: spacing.padding.p3,
        paddingHorizontal: spacing.padding.p2,
        borderRadius: spacing.radius.r3,
        height: 74,
        width: 240,
      },
      titleStyle: {
        color: color.staticWhite,
        ...typography.body.medium,
        flexShrink: 1,
        maxWidth: "90%",
      },
      subtitleStyle: {
        color: color.staticWhite,
        ...typography.caption2.regular,
      },
      downloadIconStyle: {
        height: 20,
        width: 20,
        tintColor: color.staticWhite,
      },
    },
  };
};
