import { deepMerge } from "../../shared/helper/helperFunctions";
import { CometChatTheme } from "../../theme/type";

export const getStickerStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["stickerBubbleStyles"] => {
  return {
    containerStyle: {
      height: 180,
      width: 180,
      backgroundColor: color.background2,
      padding: spacing.padding.p0,
      paddingBottom: spacing.padding.p0,
      borderRadius: spacing.radius.r3,
    },
    dateReceiptContainerStyle: {
      backgroundColor: color.receiveBubbleTimestamp,
      paddingHorizontal: spacing.padding.p1,
      borderRadius: spacing.radius.max,
      position: "absolute",
      bottom: 0,
    },
    dateStyles: {
      containerStyle: {
        paddingTop: spacing.padding.p0,
        paddingBottom: spacing.padding.p0,
        paddingHorizontal: spacing.padding.p1,
      },
      textStyle: {
        color: color.sendBubbleTimestamp,
      },
    },
    imageStyle: {
      minHeight: 150,
      minWidth: 150,
      alignSelf: "center",
    },
  };
};

export const getStickerStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): CometChatTheme["stickerBubbleStyles"] => {
  return deepMerge(getStickerStyleLight(color, spacing, typography)!, {
    dateReceiptContainerStyle: {
      backgroundColor: color.background1,
    },
  });
};
