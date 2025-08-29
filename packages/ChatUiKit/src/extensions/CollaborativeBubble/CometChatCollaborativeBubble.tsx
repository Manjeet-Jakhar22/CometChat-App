import React, { JSX, useCallback } from "react";
import { NativeModules, Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "../../theme";

const WebView = NativeModules["WebViewManager"];

interface CollaborativeBubbleProps {
  /** Text displayed in bubble title */
  title: string;
  /** Icon displayed in trailing position */
  icon?: JSX.Element;
  /** Subtitle string displayed after title */
  subtitle?: string;
  /** Button text */
  buttonText?: string;
  /** URL to open collaborative document */
  url: string;
  /** Style for title */
  titleStyle?: TextStyle;
  /** Style for subtitle */
  subtitleStyle?: TextStyle;
  /** Callback function when pressed */
  onPress?: (url: string) => void;
  /** Image element */
  image?: JSX.Element;
  /** Style for divider */
  dividerStyle?: ViewStyle;
  /** Style for button container */
  buttonViewStyle?: ViewStyle;
  /** Style for button text */
  buttonTextStyle?: TextStyle;
}

export const CometChatCollaborativeBubble = (props: CollaborativeBubbleProps) => {
  const theme = useTheme();

  // Opens the URL via onPress callback if provided; otherwise uses WebView.
  const openLink = () => {
    if (props.url !== "") {
      if (props.onPress) {
        props.onPress(props.url);
      } else {
        console.log("opening URL,", props.url);
        WebView.openUrl(props.url);
      }
    }
  };

  // Returns the button text if available.
  const getButtonText = useCallback(() => {
    return props.buttonText && props.buttonText.trim().length > 0 ? props.buttonText : "";
  }, [props.buttonText]);

  return (
    <View>
      {props.image}
      <View
        style={{
          flexDirection: "row",
          paddingVertical: theme.spacing.padding.p2,
          gap: theme.spacing.spacing.s1,
        }}
      >
        {props.icon}
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={props.titleStyle}>
            {props.title}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={props.subtitleStyle}>
            {props.subtitle}
          </Text>
        </View>
      </View>
      <View style={props.dividerStyle} />
      <Pressable style={props.buttonViewStyle}>
        <Text onPress={openLink} style={props.buttonTextStyle}>
          {getButtonText()}
        </Text>
      </Pressable>
    </View>
  );
};
