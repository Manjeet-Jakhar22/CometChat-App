import React from "react";
import { Image, ImageStyle } from "react-native";

export interface CometChatStickerBubbleProps {
  /**
   * image url pass as {uri: "dummyUrl"}
   */
  url: string;
  /**
   * place holder image
   */
  name?: string;
  /**
   * style object of type ImageBubbleStyleInterface
   */
  style?: ImageStyle;
}

export const CometChatStickerBubble = (props: CometChatStickerBubbleProps) => {
  const { url, style} = props;


  return (
    <Image
      resizeMode={"cover"}
      source={{ uri: url }}
      style={style}
    />
  );
};
