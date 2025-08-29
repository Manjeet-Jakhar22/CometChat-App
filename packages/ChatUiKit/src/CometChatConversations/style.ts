import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { deepMerge } from "../shared/helper/helperFunctions";
import { AvatarStyle, getAvatarStyle } from "../shared/views/CometChatAvatar";
import { BadgeStyle } from "../shared/views/CometChatBadge";
import { DateStyle } from "../shared/views/CometChatDate";
import { ReceiptStyles } from "../shared/views/CometChatReceipt";
import { StatusIndicatorStyles } from "../shared/views/CometChatStatusIndicator";
import { CometChatTheme } from "../theme/type";
import { DeepPartial } from "../shared/helper/types";
import { CometChatListStylesInterface } from "../shared";
import { ConfirmDialogStyle } from "../shared/views/CometChatConfirmDialog/style";
import { JSX } from "react";

export const Style = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  errorEmptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
    flexDirection: "column",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export type ConversationStyle = Omit<CometChatListStylesInterface, "searchStyle" | "sectionHeaderTextStyle"> & {
  containerStyle: ViewStyle;
  statusIndicatorStyles?: StatusIndicatorStyles;
  typingIndicatorStyle: TextStyle;
  titleStyle: TextStyle;
  selectionIconStyle: ImageStyle;
  emptyStateStyle: {
    titleStyle: TextStyle;
    subTitleStyle: TextStyle;
    containerStyle: ViewStyle;
    icon: ImageSourcePropType | JSX.Element;
  };
  errorStateStyle: {
    titleStyle: TextStyle;
    subTitleStyle: TextStyle;
    containerStyle: ViewStyle;
    icon: ImageSourcePropType | JSX.Element;
  };
  backButtonIcon?: ImageSourcePropType | JSX.Element;
  backButtonIconStyle: ImageStyle;
  itemStyle: {
    avatarStyle: AvatarStyle;
    containerStyle: ViewStyle;
    titleStyle: TextStyle;
    subtitleStyle: TextStyle;
    statusIndicatorStyle: Partial<StatusIndicatorStyles>;
    badgeStyle: Partial<BadgeStyle>;
    receiptStyles: Partial<ReceiptStyles>;
    dateStyle: Partial<DateStyle>;
  };
  skeletonStyle: {
    linearGradientColors: [string, string];
    shimmerBackgroundColor: ColorValue;
    shimmerOpacity: number;
    speed: number;
    containerBackgroundColor: ColorValue;
  };
  mentionsStyles: CometChatTheme["mentionsStyle"];
  headerContainerStyle?: ViewStyle;
  confirmDialogStyle: DeepPartial<ConfirmDialogStyle>
};

export const getConversationStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<ConversationStyle> => {
  return deepMerge(
    {
      containerStyle: {
        backgroundColor: color.background2,
        flex: 1,
      },
      titleStyle: { color: color.textPrimary, ...typography.heading1.bold },
      typingIndicatorStyle: {
        color: color.textHighlight,
        ...typography.body.regular,
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
      emptyStateStyle: {
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
      backButtonIconStyle: {
        tintColor: color.iconPrimary,
        height: spacing.spacing.s6,
        width: spacing.spacing.s6,
      },
      headerContainerStyle: {
        borderBottomColor: color.borderDefault,
        borderBottomWidth: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        borderRadius: 0,
      },
    } as const,
    {
      itemStyle: {
        containerStyle: {
          flexDirection: "row",
          paddingHorizontal: spacing.padding.p2,
          paddingVertical: spacing.padding.p3,
        },
        titleStyle: {
          color: color.textPrimary,
          ...typography.heading4.medium,
        },
        subtitleStyle: {
          color: color.textSecondary,
          ...typography.body.regular,
        },
        avatarStyle: getAvatarStyle(color, spacing, typography),
        trailingViewContainerStyle: {
          gap: spacing.padding.p1,
        },
        titleSubtitleContainerStyle: {},
        badgeStyle: {
          containerStyle: {
            backgroundColor: color.primary,
            borderRadius: spacing.radius.max,
            minWidth: spacing.spacing.s5,
            maxWidth: spacing.spacing.s12,
            height: spacing.spacing.s5,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: spacing.spacing.s1,
            paddingVertical: spacing.spacing.s0_5,
            alignSelf: "flex-end",
          },
        },
      },
      skeletonStyle: {
        linearGradientColors: ["#E8E8E8", "#F5F5F5"] as [string, string],
        shimmerBackgroundColor: color.staticBlack,
        shimmerOpacity: 0.01,
        speed: 1,
        containerBackgroundColor: color.background2,
      },
      statusIndicatorStyles: {},
      dateStyle: {},
      receiptStyles: {},
      mentionsStyles: {
        textStyle: {
          ...typography.body.bold,
          color: color.receiveBubbleTextHighlight,
        },
        selfTextStyle: {
          ...typography.body.bold,
          color: color.warning,
        },
      },
      backButtonIconContainerStyle: {
        paddingRight: spacing.spacing.s1,
      },
    } as const
  );
};

export const getConversationStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<ConversationStyle> => {
  return deepMerge(getConversationStyleLight(color, spacing, typography), {
    skeletonStyle: {
      linearGradientColors: ["#383838", "#272727"] as [string, string],
      shimmerBackgroundColor: color.staticWhite,
      shimmerOpacity: 0.01,
      speed: 1,
      containerBackgroundColor: color.background2,
    },
    mentionsStyles: {
      textStyle: {
        ...typography.body.bold,
        color: color.receiveBubbleTextHighlight,
      },
      selfTextStyle: {
        ...typography.body.bold,
        color: color.warning,
      },
    },
  });
};
