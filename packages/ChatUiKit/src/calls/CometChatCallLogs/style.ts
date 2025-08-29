import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { AvatarStyle } from "../../shared/views/CometChatAvatar";
import { CometChatTheme } from "../../theme/type";
import { DeepPartial } from "../../shared/helper/types";
import { deepMerge } from "../../shared/helper/helperFunctions";
import { JSX } from "react";

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
    gap: 4,
  },
  headerStyle: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  imageStyle: {
    height: 24,
    width: 24,
    alignSelf: "center",
  },
});

export type CallLogsStyle = {
  emptyStateStyle: {
    titleStyle: TextStyle;
    subTitleStyle: TextStyle;
    containerStyle: ViewStyle;
    icon?: ImageSourcePropType | JSX.Element;
  };
  errorStateStyle: {
    titleStyle: TextStyle;
    subTitleStyle: TextStyle;
    containerStyle: ViewStyle;
    icon?: ImageSourcePropType | JSX.Element;
  };
  containerStyle: ViewStyle;
  titleTextStyle: TextStyle;
  titleSeparatorStyle: ViewStyle;
  itemStyle: {
    containerStyle: ViewStyle;
    titleTextStyle: TextStyle;
    missedCallTitleTextStyle: TextStyle;
    subTitleTextStyle: TextStyle;
    avatarStyle: AvatarStyle;
    callIconStyle: ImageStyle;
    outgoingCallStatusIconStyle: ImageStyle;
    incomingCallStatusIconStyle: ImageStyle;
    missedCallStatusIconStyle: ImageStyle;
  };
  skeletonStyle: {
    linearGradientColors?: [string, string];
    shimmerBackgroundColor?: ColorValue;
    shimmerOpacity?: number;
    speed?: number;
    containerBackgroundColor?: ColorValue;
  };
};

export const getCallLogsStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<CallLogsStyle> =>
  deepMerge(
    {
      containerStyle: {},
      titleTextStyle: {
        color: color.textPrimary,
        ...typography.heading1.bold,
      },
      titleSeparatorStyle: {
        borderBottomWidth: 1,
        borderBottomColor: color.borderLight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      },
      errorStateStyle: {
        containerStyle: {},
        titleStyle: {
          color: color.textPrimary,
          textAlign: "center",
          ...typography.heading3.bold,
        },
        subTitleStyle: {
          color: color.textSecondary,
          textAlign: "center",
          ...typography.body.regular,
        },
      },
      emptyStateStyle: {
        containerStyle: {},
        titleStyle: {
          color: color.textPrimary,
          textAlign: "center",
          ...typography.heading3.bold,
        },
        subTitleStyle: {
          color: color.textSecondary,
          textAlign: "center",
          ...typography.body.regular,
        },
      },

      itemStyle: getCallLogsItemStyle(color, spacing, typography),
      skeletonStyle: {
        linearGradientColors: ["#E8E8E8", "#F5F5F5"] as [string, string],
        shimmerBackgroundColor: color.staticBlack,
        shimmerOpacity: 0.01,
        speed: 1,
        containerBackgroundColor: color.background2,
      },
    } as const,
    {}
  );

export const getCallLogsStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<CallLogsStyle> =>
  deepMerge(getCallLogsStyleLight(color, spacing, typography), {
    skeletonStyle: {
      linearGradientColors: ["#383838", "#272727"] as [string, string],
      shimmerBackgroundColor: color.staticWhite,
      shimmerOpacity: 0.01,
      speed: 1,
      containerBackgroundColor: color.background2,
    },
  });

export type CallLogsItemStyle = {
  containerStyle: ViewStyle;
  titleTextStyle: TextStyle;
  missedCallTitleTextStyle: TextStyle;
  subTitleTextStyle: TextStyle;
  avatarStyle: AvatarStyle;
  callIconStyle: ImageStyle;

  outgoingCallStatusIconStyle: ImageStyle;
  missedCallStatusIconStyle: ImageStyle;
  incomingCallStatusIconStyle: ImageStyle;
};

export const getCallLogsItemStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CallLogsItemStyle => {
  return {
    containerStyle: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
    },
    titleTextStyle: {
      color: color.textPrimary,
      ...typography.heading4.medium,
    },
    missedCallTitleTextStyle: {
      color: color.error,
      ...typography.heading4.medium,
    },
    subTitleTextStyle: {
      color: color.textSecondary,
      ...typography.body.regular,
    },
    avatarStyle: {
      containerStyle: {
        width: 48,
        height: 48,
      },
      imageStyle: {},
      textStyle: {},
    },
    callIconStyle: {
      tintColor: color.iconPrimary,
    },
    outgoingCallStatusIconStyle: {
      tintColor: color.success,
    },
    incomingCallStatusIconStyle: {
      tintColor: color.success,
    },
    missedCallStatusIconStyle: {
      tintColor: color.error,
    },
  };
};
