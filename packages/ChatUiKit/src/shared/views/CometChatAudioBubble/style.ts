import { CometChatTheme } from "../../../theme/type";

export const getAudioBubbleStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingAudioBubbleStyle: Partial<CometChatTheme["audioBubbleStyles"]>;
  outgoingAudioBubbleStyle: Partial<CometChatTheme["audioBubbleStyles"]>;
} => {
  return {
    incomingAudioBubbleStyle: {
      containerStyle: {
        padding: spacing.padding.p3,
        paddingBottom: spacing.padding.p0,
        borderRadius: spacing.radius.r3,
        alignSelf: "flex-start",
        height: 74,
        width: 240,
      },
      playViewContainerStyle: {
        width: 216,
        height: 32,
        gap: spacing.padding.p3,
        flexDirection: "row",
      },
      playIconStyle: {
        tintColor: color.sendBubbleBackground,
        width: spacing.spacing.s7,
        height: spacing.spacing.s7,
      },
      playIconContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: spacing.spacing.s8,
        width: spacing.spacing.s8,
        backgroundColor: color.primaryButtonIcon,
        borderRadius: 1000,
      },
      waveStyle: {
        backgroundColor: color.receiveBubbleIcon,
        width: 2,
        marginHorizontal: 1,
        height: 18,
      },
      waveContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: 30,
        overflow: "hidden",
      },
      playProgressTextStyle: {
        ...typography.caption2.regular,
        color: color.neutral600,
        lineHeight: 12,
      },
    },
    outgoingAudioBubbleStyle: {
      containerStyle: {
        padding: spacing.padding.p3,
        paddingBottom: spacing.padding.p0,
        borderRadius: spacing.radius.r3,
        height: 74,
        width: 240,
      },
      playViewContainerStyle: {
        width: 216,
        height: 32,
        gap: spacing.padding.p3,
        flexDirection: "row",
      },
      playIconStyle: {
        tintColor: color.sendBubbleBackground,
        width: spacing.spacing.s7,
        height: spacing.spacing.s7,
      },
      playIconContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: spacing.spacing.s8,
        width: spacing.spacing.s8,
        backgroundColor: color.primaryButtonIcon,
        borderRadius: 1000,
      },
      waveStyle: {
        backgroundColor: color.primaryButtonIcon,
        width: 2,
        marginHorizontal: 1,
        height: 18,
      },
      waveContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: 30,
        overflow: "hidden",
      },
      playProgressTextStyle: {
        ...typography.caption2.regular,
        color: color.staticWhite,
        lineHeight: 12,
      },
    },
  };
};

export const getAudioBubbleStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingAudioBubbleStyle: Partial<CometChatTheme["audioBubbleStyles"]>;
  outgoingAudioBubbleStyle: Partial<CometChatTheme["audioBubbleStyles"]>;
} => {
  return {
    incomingAudioBubbleStyle: {
      containerStyle: {
        padding: spacing.padding.p3,
        paddingBottom: spacing.padding.p0,
        borderRadius: spacing.radius.r3,
        alignSelf: "flex-start",
        height: 74,
        width: 240,
      },
      playViewContainerStyle: {
        width: 216,
        height: 32,
        gap: spacing.padding.p3,
        flexDirection: "row",
      },
      playIconStyle: {
        tintColor: color.sendBubbleBackground,
        width: spacing.spacing.s7,
        height: spacing.spacing.s7,
      },
      playIconContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: spacing.spacing.s8,
        width: spacing.spacing.s8,
        backgroundColor: color.staticWhite,
        borderRadius: 1000,
      },
      waveStyle: {
        backgroundColor: color.receiveBubbleIcon,
        width: 2,
        marginHorizontal: 1,
        height: 18,
      },
      waveContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: 30,
        overflow: "hidden",
      },
      playProgressTextStyle: {
        ...typography.caption2.regular,
        color: color.neutral600,
        lineHeight: 12,
      },
    },
    outgoingAudioBubbleStyle: {
      containerStyle: {
        padding: spacing.padding.p3,
        paddingBottom: spacing.padding.p0,
        borderRadius: spacing.radius.r3,
        height: 74,
        width: 240,
      },
      playViewContainerStyle: {
        width: 216,
        height: 32,
        gap: spacing.padding.p3,
        flexDirection: "row",
      },
      playIconStyle: {
        tintColor: color.sendBubbleBackground,
        width: spacing.spacing.s7,
        height: spacing.spacing.s7,
      },
      playIconContainerStyle: {
        justifyContent: "center",
        alignItems: "center",
        height: spacing.spacing.s8,
        width: spacing.spacing.s8,
        backgroundColor: color.primaryButtonIcon,
        borderRadius: 1000,
      },
      waveStyle: {
        backgroundColor: color.primaryButtonIcon,
        width: 2,
        marginHorizontal: 1,
        height: 18,
      },
      waveContainerStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: 30,
        overflow: "hidden",
      },
      playProgressTextStyle: {
        ...typography.caption2.regular,
        color: color.staticWhite,
        lineHeight: 12,
      },
    },
  };
};
