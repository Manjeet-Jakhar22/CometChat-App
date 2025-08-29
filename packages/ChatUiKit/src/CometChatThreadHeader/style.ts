import { Dimensions } from "react-native";
import { CometChatTheme } from "../theme/type";
import { getMessageListStylesDark, getMessageListStylesLight } from "../CometChatMessageList/style";
import { deepMerge } from "../shared/helper/helperFunctions";

export const getThreadHeaderStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["threadHeaderStyles"] => {
  return {
    containerStyle: {
      backgroundColor: color.background3,
      maxHeight: Dimensions.get("window").height * 0.25,
    },
    messageBubbleContainerStyle: {
      backgroundColor: color.background3,
      marginVertical: spacing.padding.p4,
      paddingHorizontal: spacing.padding.p4,
    },
    replyCountBarStyle: {
      paddingVertical: spacing.padding.p1,
      paddingHorizontal: spacing.padding.p5,
      backgroundColor: color.extendedPrimary100,
      borderWidth: 1,
      borderColor: color.borderDefault,
    },
    replyCountTextStyle: {
      ...typography.body.regular,
      color: color.textSecondary,
    },
    incomingMessageBubbleStyles: getMessageListStylesLight(color, spacing, typography)
      .incomingMessageBubbleStyles,
    outgoingMessageBubbleStyles: getMessageListStylesLight(color, spacing, typography)
      .outgoingMessageBubbleStyles,
  };
};

export const getThreadHeaderStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["threadHeaderStyles"] => {
  return {
    containerStyle: {
      backgroundColor: color.background3,
      maxHeight: Dimensions.get("window").height * 0.25,
    },
    messageBubbleContainerStyle: {
      backgroundColor: color.background3,
      marginVertical: spacing.padding.p4,
      paddingHorizontal: spacing.padding.p4,
    },
    replyCountBarStyle: {
      paddingVertical: spacing.padding.p1,
      paddingHorizontal: spacing.padding.p5,
      backgroundColor: color.extendedPrimary100,
      borderWidth: 1,
      borderColor: color.borderDefault,
    },
    replyCountTextStyle: {
      ...typography.body.regular,
      color: color.textSecondary,
    },
    incomingMessageBubbleStyles: getMessageListStylesDark(color, spacing, typography)
      .incomingMessageBubbleStyles,
    outgoingMessageBubbleStyles: getMessageListStylesDark(color, spacing, typography)
      .outgoingMessageBubbleStyles,
  };
};
