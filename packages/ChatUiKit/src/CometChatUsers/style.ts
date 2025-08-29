import { ColorValue, ImageSourcePropType, ViewStyle } from "react-native";
import { CometChatListStylesInterface } from "../shared";
import { deepMerge } from "../shared/helper/helperFunctions";
import { CometChatTheme } from "../theme/type";
import { DeepPartial } from "../shared/helper/types";

export type UserStyle = CometChatListStylesInterface & {
  skeletonStyle: {
    backgroundColor?: ColorValue;
    linearGradientColors?: [string, string];
    shimmerBackgroundColor?: ColorValue;
    shimmerOpacity?: number;
    speed?: number;
    containerBackgroundColor?: ColorValue;
  };
  headerContainerStyle: ViewStyle;
};

export const getUserListStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<UserStyle> => {
  return {
    headerContainerStyle: {
      alignItems: "flex-start",
      justifyContent: "center",
      width: "100%",
      borderRadius: 0,
      paddingHorizontal: 0,
    },
    titleSeparatorStyle: {
      borderBottomWidth: 1,
      borderBottomColor: color.borderLight,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    containerStyle: {
      backgroundColor: color.background1,
      flex: 1,
    },
    itemStyle: {
      containerStyle: {
        flexDirection: "row",
        paddingHorizontal: spacing.padding.p4,
        paddingVertical: spacing.padding.p2,
        gap: spacing.spacing.s3,
      },
      titleStyle: {
        color: color.textPrimary,
        ...typography.heading4.medium,
      },
      subtitleStyle: {
        color: color.textSecondary,
        ...typography.body.regular,
      },
      statusIndicatorStyle: {},
      avatarStyle: {
        containerStyle: {},
        textStyle: {},
        imageStyle: {},
      },
      headViewContainerStyle: {},
      titleSubtitleContainerStyle: {
        alignSelf: "center",
      },
      trailingViewContainerStyle: {},
    },
    confirmSelectionStyle: {},
    selectionCancelStyle: undefined,
    loadingIconTint: color.primary,
    sectionHeaderTextStyle: {
      marginHorizontal: spacing.spacing.s5,
      color: color.primary,
      ...typography.heading4.medium,
    },
    onlineStatusColor: color.success,
    titleViewStyle: {
      paddingVertical: spacing.spacing.s3,
      paddingLeft: spacing.spacing.s3,
      margin: spacing.spacing.s0,
    },
    titleStyle: {
      color: color.textPrimary,
      ...typography.heading1.bold,
    },
    backButtonIconStyle: {
      tintColor: color.iconPrimary,
      height: spacing.spacing.s6,
      width: spacing.spacing.s6,
    },
    searchStyle: {
      textStyle: {
        color: color.textPrimary,
        ...typography.heading4.regular,
        textAlignVertical: "center",
        paddingVertical: 0,
        height: spacing.spacing.s7,
      },
      containerStyle: {
        backgroundColor: color.background3,
        paddingVertical: spacing.spacing.s3,
        marginTop: spacing.spacing.s3,
        width: "95%",
        gap: spacing.spacing.s1,
        alignContent: "space-around",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
      },
      icon: undefined,
      iconStyle: {
        tintColor: color.iconSecondary,
      },
      placehodlerTextStyle: {
        color: color.textTertiary,
      },
    },
    emptyStateStyle: {
      titleStyle: {
        color: color.textPrimary,
        ...typography.heading3.bold,
        marginBottom: spacing.margin.m1,
      },
      subTitleStyle: {
        color: color.textSecondary,
        textAlign: "center" as const,
        ...typography.body.regular,
      },
      containerStyle: {
        justifyContent: "center",
        display: "none",
        alignItems: "center",
        padding: spacing.padding.p3,
      },
    },
    errorStateStyle: {
      containerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "10%",
        flexDirection: "column",
      },
      titleStyle: {
        color: color.textPrimary,
        ...typography.heading3.bold,
        marginBottom: spacing.margin.m1,
      },
      subTitleStyle: {
        color: color.textSecondary,
        textAlign: "center",
        ...typography.body.regular,
      },
    },
    skeletonStyle: {
      backgroundColor: "transparent",
      linearGradientColors: ["#E8E8E8", "#F5F5F5"] as [string, string],
      shimmerBackgroundColor: color.staticBlack,
      shimmerOpacity: 0.01,
      speed: 1,
      containerBackgroundColor: color.background1,
    },
  };
};

export const getUserListStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<UserStyle> => {
  return deepMerge(getUserListStyleLight(color, spacing, typography), {
    skeletonStyle: {
      backgroundColor: "transparent",
      linearGradientColors: ["#383838", "#272727"] as [string, string],
      shimmerBackgroundColor: color.staticWhite,
      shimmerOpacity: 0.01,
      speed: 1,
      containerBackgroundColor: color.background1,
    },
  });
};
