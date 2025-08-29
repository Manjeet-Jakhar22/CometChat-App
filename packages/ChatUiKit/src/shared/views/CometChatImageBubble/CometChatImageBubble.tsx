import React from "react";
import {
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { CometChatImageLoader } from "./CometChatImageLoader";

/**
 * Props for the CometChatImageBubble component.
 */
export interface CometChatImageBubbleInterface {
  /**
   * Image URL to be displayed.
   * Pass as an object with a `uri` property, e.g., `{ uri: "dummyUrl" }`.
   */
  imageUrl: ImageSourcePropType;
  /**
   * Thumbnail image URL.
   *
   * @type {ImageSourcePropType}
   */
  thumbnailUrl?: ImageSourcePropType;
  /**
   * Placeholder image to display while the main image is loading.
   */
  placeHolderImage?: ImageSourcePropType;
  /**
   * Callback function to execute when the image is pressed.
   */
  onPress?: Function;
  /**
   * Custom style for the image.
   */
  style?: ImageStyle;
  /**
   * Resize mode for the image.
   *
   * @default "cover"
   */
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
}

/**
 * CometChatImageBubble is a component that displays an image with support for thumbnails,
 * placeholders, and custom styling. It uses the CometChatImageLoader component internally.
 *
 * Props for the image bubble component.
 * The rendered image bubble.
 */
export const CometChatImageBubble = (props: CometChatImageBubbleInterface) => {
  const { thumbnailUrl, imageUrl, placeHolderImage, style, resizeMode } = props;

  return (
    <>
      <CometChatImageLoader
        imageUrl={imageUrl}
        thumbnailUrl={thumbnailUrl}
        activityIndicatorSize={48}
        activityIndicatorViewStyle={{
          height: style?.height,
          width: style?.width,
          backgroundColor: style?.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: style?.borderRadius,
        }}
        placeHolderImage={placeHolderImage}
        style={style}
        imageResizeMode={resizeMode || "cover"}
      />
    </>
  );
};