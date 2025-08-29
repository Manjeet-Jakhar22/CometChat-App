import React, {JSX, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  EmitterSubscription,
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  NativeEventEmitter,
  NativeModules,
  Platform,
  Pressable,
  View,
  ViewStyle,
} from "react-native";
import { CometChatVideoPlayer } from "../CometChatVideoPlayer";
import { defaultThumbnail } from "./resources";
import { Icon } from "../../icons/Icon";
import { CommonUtils } from "../../utils/CommonUtils";

const { FileManager } = NativeModules;
const eventEmitter = new NativeEventEmitter(FileManager);
let statusListener: EmitterSubscription;
/**
 * Props for the CometChatVideoBubble component.
 */
export interface CometChatVideoBubbleInterface {
  /**
   * URL for the video.
   */
  videoUrl: string;
  /**
   * Thumbnail URL for the video bubble.
   */
  thumbnailUrl?: ImageSourcePropType;
  /**
   * Placeholder image to display while the video is loading.
   */
  placeholderImage?: ImageSourcePropType;
  /**
   * Custom play icon, which can be a JSX element or an image source.
   */
  playIcon?: JSX.Element | ImageSourcePropType;
  /**
   * Callback function executed when the play button is clicked.
   * The function receives the video URL as a parameter.
   *
   * @param videoUrl - The URL of the video.
   */
  onPress?: Function;
  /**
   * Custom style for the video thumbnail image.
   */
  imageStyle?: ImageStyle;
  /**
   * Custom style for the play icon.
   */
  playIconStyle?: ImageStyle;
  /**
   * Custom style for the container of the play icon.
   */
  playIconContainerStyle?: ViewStyle;
}
/**
 * CometChatVideoBubble is a component that displays a video bubble with a thumbnail image
 * and a play icon. It handles video playback when the play icon is clicked.
 *
 * @param props - Props for the component.
 * @returns The rendered video bubble.
 */

export const CometChatVideoBubble = (props: CometChatVideoBubbleInterface) => {
  const {
    videoUrl,
    thumbnailUrl,
    placeholderImage,
    playIcon,
    playIconStyle,
    onPress,
    playIconContainerStyle,
    imageStyle,
  } = props;

  const [isOpening, setOpening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState(false);
  const [imageSource, setImageSource] = useState<ImageSourcePropType>();

  // Prefetch thumbnail logic on mount
  useEffect(() => {
    if (thumbnailUrl && typeof thumbnailUrl === "object" && "uri" in thumbnailUrl) {
      CommonUtils.prefetchThumbnail(thumbnailUrl.uri!).then((success) => {
        if (success) {
          setImageSource(thumbnailUrl);
        } else {
          setImageSource(placeholderImage ?? defaultThumbnail);
        }
      });
    } else {
      setImageSource(placeholderImage ?? defaultThumbnail);
    }
  }, [thumbnailUrl, placeholderImage]);

  const playVideo = () => {
    if (isOpening) {
      return;
    }

    if (onPress) {
      onPress(videoUrl);
      return;
    }

    if (!videoUrl) return;
    setIsLoading(true);
    setIsVideoPlayerVisible(true);
  };

  useEffect(() => {
    statusListener = eventEmitter.addListener("status", (data) => {
      if (data["url"] == videoUrl && data["state"] == "downloading") {
        setOpening(true);
      }
      if (data["url"] == videoUrl && data["state"] == "opening") {
        setOpening(false);
      }
    });

    return () => {
      statusListener.remove();
    };
  }, []);

  const pressTime = useRef<number | null>(0);

  // const handleTouchStart = () => {
  //   pressTime.current = Date.now();
  // };

  // const handleTouchEnd = () => {
  //   if (pressTime.current === null && Platform.OS === "ios") return;
  //   const endTime = Date.now();
  //   const pressDuration = endTime - pressTime.current!;
  //   if (pressDuration < 500) {
  //     playVideo();
  //   }
  // };

  // const onTouchMove = () => {
  //   if (Platform.OS === "ios") {
  //     pressTime.current = null;
  //   }
  // };

  return (
    <>
      <CometChatVideoPlayer
        videoUri={videoUrl}
        isVisible={isVideoPlayerVisible}
        onClose={() => {
          setIsLoading(false);
          setIsVideoPlayerVisible(false);
        }}
        onLoad={() => setIsLoading(false)}
      />
      <ImageBackground source={imageSource} resizeMode={"cover"} style={imageStyle}>
        <Pressable
          onPress={() => playVideo()}
          style={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}
        >
          <View>
            {isLoading ? (
              <ActivityIndicator
                size={typeof playIconStyle?.height === "number" ? playIconStyle.height : "large"}
                color={playIconStyle?.tintColor}
              />
            ) : (
              <Icon
                name='play-arrow-fill'
                height={playIconStyle?.height}
                width={playIconStyle?.width}
                icon={playIcon}
                imageStyle={playIconStyle}
                color={playIconStyle?.tintColor}
              ></Icon>
            )}
          </View>
        </Pressable>
      </ImageBackground>
    </>
  );
};