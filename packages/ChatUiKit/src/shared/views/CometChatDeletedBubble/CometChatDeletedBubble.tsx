import React from "react";
import { View } from "react-native";
import { useTheme } from "../../../theme";
import { Icon } from "../../icons/Icon";
import { localize } from "../../resources";
import { CometChatTextBubbleText } from "../CometChatTextBubble/CometChatTextBubble";
import { DeletedBubbleStyle } from "./styles";

/**
 * Props for the CometChatDeletedBubble component.
 */
export interface CometChatDeletedBubbleInterface {
  /**
   * Text to be displayed in the deleted message bubble.
   */
  text?: string;
  /**
   * Custom styles for the deleted bubble.
   */
  style?: Partial<DeletedBubbleStyle>;
}

/**
 * CometChatDeletedBubble is a component that displays a deleted message bubble.
 * It shows an icon along with the provided text.
 *
 * - Props for the component.
 *  The rendered deleted message bubble.
 */
export const CometChatDeletedBubble = (props: CometChatDeletedBubbleInterface) => {
  const theme = useTheme();
  const { text = localize("DELETE_MSG_TEXT"), style = {} } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: theme.spacing.spacing.s1,
        alignItems: "center",
      }}
    >
      <Icon
        name="block"
        icon={style?.icon}
        height={style?.iconStyle?.height ?? 16}
        width={style?.iconStyle?.width ?? 16}
        color={style?.iconStyle?.tintColor}
        imageStyle={style?.iconStyle}
        containerStyle={style?.iconContainerStyle}
      />
      <CometChatTextBubbleText text={text} textStyle={[style?.textStyle]} />
    </View>
  );
};