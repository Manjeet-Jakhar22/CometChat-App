import { Dimensions } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { deepMerge } from "../../helper/helperFunctions";
import { DeepPartial } from "../../helper/types";

export const getMentionsListStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<CometChatTheme["mentionsListStyle"]> => {
  return {
    containerStyle: {
      borderRadius: spacing.radius.r4,
      paddingVertical: spacing.padding.p2,
      backgroundColor: color.background1,
      borderWidth: 1,
      borderColor: color.borderDark,
      maxHeight: Dimensions.get("window").height * 0.3,
      justifyContent: "flex-end",
      marginBottom: spacing.margin.m1,
      paddingHorizontal: 5,
    },
    listItemStyle: {
      containerStyle: {
        backgroundColor: color.background1,
        paddingVertical: spacing.padding.p2,
        paddingHorizontal: spacing.padding.p4,
        flexDirection: "row",
        gap: 12,
      },
      titleStyle: {
        ...typography.heading4.medium,
        color: color.textPrimary,
      },
      avatarStyle: {
        containerStyle: {
          height: 40,
          width: 40,
        },
        textStyle: {},
        imageStyle: {
          height: "100%",
          width: "100%",
          borderRadius: spacing.radius.max,
        },
      },
    },
    skeletonStyle: {
      linearGradientColors: ["#E8E8E8", "#F5F5F5"] as [string, string],
      shimmerBackgroundColor: color.staticBlack,
      shimmerOpacity: 0.01,
      speed: 0.7,
    },
  };
};

export const getMentionsListStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<CometChatTheme["mentionsListStyle"]> => {
  return deepMerge(getMentionsListStyleLight(color, spacing, typography), {
    skeletonStyle: {
      linearGradientColors: ["#383838", "#272727"] as [string, string],
      shimmerBackgroundColor: color.staticWhite,
      shimmerOpacity: 0.01,
      speed: 0.7,
    },
  });
};
