import { CometChat } from "@cometchat/chat-sdk-react-native";
import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from "react-native";
import { ActionItemInterface } from "../views";
import { JSX } from "react";

export type CometChatMessageOption = ActionItemInterface & {
  id: string;
  title: string;
  icon?: JSX.Element | ImageSourcePropType;
  CustomView?: (message: CometChat.BaseMessage) => JSX.Element;
  onPress?: (message: CometChat.BaseMessage) => void;
  style?: Partial<{
    containerStyle: ViewStyle;
    iconStyle: ImageStyle;
    iconContainerStyle: ViewStyle;
    titleStyle: TextStyle;
  }>;
};
