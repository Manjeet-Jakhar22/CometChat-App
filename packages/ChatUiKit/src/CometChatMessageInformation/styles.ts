import { StyleSheet } from "react-native";
import { deepMerge } from "../shared/helper/helperFunctions";
import { CometChatTheme } from "../theme/type";

export const Style = StyleSheet.create({
  container: {
    // paddingStart: 8,
    // paddingEnd: 8,
  },
  divider: {
    height: 1,
    marginVertical: 10,
  },
  viewContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: 24,
    width: 24,
    alignSelf: "center",
  }
});

export const getMessageInormationListStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["messageInformationStyles"] => {
  return {
    containerStyle: {
       height: '100%',
       width: '100%'
    },
    titleContainerStyle: {
      flexDirection: "row",
      height: 64,
      justifyContent: 'center'
    },
    titleStyle: {
      color: color.textPrimary,
      paddingHorizontal: spacing.padding.p4,
      paddingVertical: spacing.padding.p2,
      ...typography.heading2.bold,
      alignSelf: 'flex-start'
    },
    messageBubbleContainerStyle: {
      paddingHorizontal: spacing.padding.p4,
      paddingVertical: spacing.padding.p5,
      borderWidth: 1,
      borderColor: color.borderLight,
      backgroundColor: color.background2,
      maxHeight: '40%',
      width: '100%'
      //marginHorizontal: -10
    },
    receiptItemStyle: {
      containerStyle: {
        flexDirection: "row",
        gap: spacing.padding.p3,
        paddingVertical: spacing.padding.p3,
        paddingHorizontal: spacing.padding.p4,
      },
      titleStyle: {
        color: color.textPrimary,
        ...typography.heading4.medium,
      },
      subtitleStyle: {
        color: color.textSecondary,
        ...typography.caption1.regular,
      },
      avatarStyle: {
        containerStyle: {
          height: 40,
          width: 40,
        },
        imageStyle: {
          borderRadius: spacing.radius.max,
        },
        textStyle: {},
      },
      emojiStyle: {
        height: 24,
        width: 24,
        ...typography.heading2.regular,
      },
    },
    skeletonStyle: {
      linearGradientColors: ["#E8E8E8", "#F5F5F5"] as [string, string],
      shimmerBackgroundColor: color.staticBlack,
      shimmerOpacity: 0.01,
      speed: 0.1,
    },
    errorStateStyle: {
      containerStyle: {
        marginTop: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "10%",
        marginBottom: 50
      },
      iconContainerStyle: {
        marginBottom: spacing.margin.m5,
      },
      titleStyle: {
        color: color.textPrimary,
        ...typography.heading3.bold,
        marginBottom: spacing.margin.m1,
      },
      subtitleStyle: {
        color: color.textSecondary,
        textAlign: "center",
        ...typography.body.regular,
      },
    },
  };
};

export const getMessageInormationListStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["messageInformationStyles"] => {
  return deepMerge(getMessageInormationListStyleLight(color, spacing, typography), {
    skeletonStyle: {
      linearGradientColors: ["#383838", "#272727"] as [string, string],
      shimmerBackgroundColor: color.staticWhite,
      shimmerOpacity: 0.01,
      speed: 0.1,
    },
    errorStateStyle: {
      containerStyle: {
        marginTop: spacing.margin.m0,
        height: "95%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "-10%",
      },
      iconContainerStyle: {
        marginBottom: spacing.margin.m5,
      },
      titleStyle: {
        color: color.textPrimary,
        ...typography.heading3.bold,
        marginBottom: spacing.margin.m1,
      },
      subtitleStyle: {
        color: color.textSecondary,
        textAlign: "center",
        ...typography.body.regular,
      },
    }
  });
};
