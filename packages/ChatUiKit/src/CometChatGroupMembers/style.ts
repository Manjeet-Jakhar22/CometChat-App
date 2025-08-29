import { ColorValue, ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { CometChatListStylesInterface } from "../shared";
import { deepMerge } from "../shared/helper/helperFunctions";
import { CometChatTheme } from "../theme/type";
import { DeepPartial } from "../shared/helper/types";
import { JSX } from "react";

export type GroupMemberStyle = DeepPartial<CometChatListStylesInterface> & {
  skeletonStyle: {
    backgroundColor: ColorValue;
    linearGradientColors: [string, string];
    shimmerBackgroundColor: ColorValue;
    shimmerOpacity: number;
    speed: number;
  };
  headerContainerStyle: ViewStyle;
  ownerBadgeStyle?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  adminBadgeStyle?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  moderatorBadgeStyle?: {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
  };
  removeModalStyle?: {
    containerStyle?: ViewStyle;
    icon?: ImageSourcePropType | JSX.Element;
    iconStyle?: ImageStyle;
    iconContainerStyle?: ViewStyle;
    cancelStyle?: {
      containerStyle: ViewStyle;
      textStyle: TextStyle;
    };
    confirmStyle?: {
      containerStyle: ViewStyle;
      textStyle: TextStyle;
    };
    titleTextStyle?: TextStyle;
    subTitleTextStyle?: TextStyle;
    alertContainer: ViewStyle;
  };
  banModalStyle?: {
    containerStyle?: ViewStyle;
    icon?: ImageSourcePropType | JSX.Element;
    iconStyle?: ImageStyle;
    iconContainerStyle?: ViewStyle;
    cancelStyle?: {
      containerStyle?: ViewStyle;
      textStyle?: TextStyle;
    };
    confirmStyle?: {
      containerStyle?: ViewStyle;
      textStyle?: TextStyle;
    };
    titleTextStyle?: TextStyle;
    subTitleTextStyle?: TextStyle;

    alertContainer?: ViewStyle;
  };
  changeScope?: {
    container?: ViewStyle;
    icon?: ImageSourcePropType | JSX.Element;
    iconStyle?: ImageStyle;
    iconContainerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subTitleStyle?: TextStyle;
    cancelStyle?: {
      containerStyle?: ViewStyle;
      textStyle?: TextStyle;
    };
    confirmStyle?: {
      containerStyle: ViewStyle;
      textStyle: TextStyle;
    };
    actionBox?: ViewStyle;
    actionListStyle?: ViewStyle;
    buttonContainer?: ViewStyle;
  };
};

export const getGroupMemberStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): GroupMemberStyle => {
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
      trailingViewContainerStyle: {
        alignSelf: "center",
      },
    },
    ownerBadgeStyle: {
      containerStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 28,
        backgroundColor: color.primaryButtonBackground,
        borderColor: color.borderHighlight,
        borderWidth: 1,
      },
      textStyle: {
        ...typography.caption1.regular,
        color: color.staticWhite,
      },
    },
    adminBadgeStyle: {
      containerStyle: {
        backgroundColor: color.extendedPrimary100,
        borderWidth: 1,
        borderColor: color.borderHighlight,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 28,
      },
      textStyle: {
        ...typography.caption1.medium,
        color: color.textHighlight,
      },
    },
    moderatorBadgeStyle: {
      containerStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 28,
        backgroundColor: color.extendedPrimary100,
      },
      textStyle: {
        ...typography.caption1.medium,
        color: color.textHighlight,
      },
    },
    removeModalStyle: {
      containerStyle: {
        backgroundColor: color.background1,
        position: "absolute",
        top: "35%",
        left: "4%",
        right: "4%",
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        zIndex: 1000,
      },
      iconContainerStyle: {
        backgroundColor: color.background2,
        width: spacing.spacing.s18,
        height: spacing.spacing.s18,
        borderRadius: spacing.spacing.s18 / 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      iconStyle: {
        tintColor: color.error,
        height: 45,
        width: 45,
      },
      titleTextStyle: {
        ...typography.heading2.bold,
        color: color.textPrimary,
        marginBottom: 10,
        alignSelf: "center",
        marginTop: 20,
      },
      subTitleTextStyle: {
        ...typography.heading4.regular,
        color: color.textSecondary,
        textAlign: "center",
        marginBottom: 10,
      },
      cancelStyle: {
        containerStyle: {
          flex: 1,
          paddingVertical: 10,
          borderRadius: 5,
          marginHorizontal: 5,
          borderWidth: 1,
          alignItems: "center",
          borderColor: color.borderDefault,
        },
        textStyle: {
          ...typography.heading4.bold,
          color: color.secondaryButtonText,
        },
      },
      confirmStyle: {
        containerStyle: {
          flex: 1,
          marginHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: "center",
          backgroundColor: color.error,
        },
        textStyle: {
          ...typography.heading4.bold,
          color: color.primaryButtonText,
        },
      },
      alertContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: "center",
        borderColor: color.borderDefault,
      },
    },
    banModalStyle: {
      containerStyle: {
        backgroundColor: color.background1,
        position: "absolute",
        top: "35%",
        left: "4%",
        right: "4%",
        borderRadius: 16,
        padding: 20,
        elevation: 5,
        zIndex: 1000,
      },
      iconContainerStyle: {
        backgroundColor: color.background2,
        width: spacing.spacing.s18,
        height: spacing.spacing.s18,
        borderRadius: spacing.spacing.s18 / 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      iconStyle: {
        tintColor: color.error,
        height: 45,
        width: 45,
      },
      titleTextStyle: {
        ...typography.heading2.bold,
        color: color.textPrimary,
        marginBottom: 10,
        alignSelf: "center",
        marginTop: 20,
      },
      subTitleTextStyle: {
        ...typography.heading4.regular,
        color: color.textSecondary,
        textAlign: "center",
        marginBottom: 10,
      },
      cancelStyle: {
        containerStyle: {
          flex: 1,
          paddingVertical: 10,
          borderRadius: 5,
          marginHorizontal: 5,
          borderWidth: 1,
          alignItems: "center",
          borderColor: color.borderDefault,
        },
        textStyle: {
          ...typography.heading4.bold,
          color: color.secondaryButtonText,
        },
      },
      confirmStyle: {
        containerStyle: {
          flex: 1,
          marginHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: "center",
          backgroundColor: color.error,
        },
        textStyle: {
          ...typography.heading4.bold,
          color: color.primaryButtonText,
        },
      },
      alertContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        flex: 1,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: "center",
        borderColor: color.borderDefault,
      },
    },
    changeScope: {
      container: { paddingHorizontal: 15, marginBottom: 15 },
      iconContainerStyle: {
        backgroundColor: color.background2,
        width: spacing.spacing.s18,
        height: spacing.spacing.s18,
        borderRadius: spacing.spacing.s18 / 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      },
      iconStyle: {
        tintColor: color.primary,
        height: 45,
        width: 45,
        alignSelf: "center",
      },
      titleStyle: {
        ...typography.heading2.bold,
        alignSelf: "center",
        paddingTop: 20,
        color: color.textPrimary,
      },
      subTitleStyle: {
        ...typography.heading4.regular,
        alignSelf: "center",
        paddingTop: 10,
        color: color.textSecondary,
        textAlign: "center",
        marginBottom: 10,
      },
      actionBox: {
        borderWidth: 1,
        borderColor: color.borderLight,
        padding: 10,
        borderRadius: 8,
      },
      confirmStyle: {
        containerStyle: {
          marginLeft: 2,
          flex: 1,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: "center",
          borderColor: color.borderLight,
          backgroundColor: color.primary,
        },
        textStyle: {
          ...typography.heading4.regular,
          color: color.staticWhite,
        },
      },
      actionListStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
      },
      cancelStyle: {
        containerStyle: {
          marginRight: 2,
          flex: 1,
          paddingVertical: 10,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: "center",
          borderColor: color.borderLight,
          backgroundColor: color.background1,
        },
        textStyle: {
          ...typography.heading4.regular,
          color: color.primary,
        },
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginBottom: 10,
      },
    },
    confirmSelectionStyle: {},
    selectionCancelStyle: {},
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
      iconStyle: {
        tintColor: color.neutral300,
        height: 150,
        width: 150,
      },
    },
    errorStateStyle: {
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
        alignItems: "center",
        padding: spacing.padding.p3,
      },
      iconStyle: {
        tintColor: color.neutral300,
        height: 150,
        width: 150,
      },
    },
    skeletonStyle: {
      backgroundColor: color.background3,
      linearGradientColors: ["#E8E8E8", "#F5F5F5"] as [string, string],
      shimmerBackgroundColor: color.staticBlack,
      shimmerOpacity: 0.01,
      speed: 1,
    },
  };
};

export const getGroupMemberStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): GroupMemberStyle => {
  return deepMerge(getGroupMemberStyleLight(color, spacing, typography), {
    skeletonStyle: {
      backgroundColor: color.background3,
      linearGradientColors: ["#383838", "#272727"] as [string, string],
      shimmerBackgroundColor: color.staticWhite,
      shimmerOpacity: 0.01,
      speed: 1,
    },
  });
};
