import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import closeIcon from "./resources/close.png";
import { useTheme } from "../../../theme";
import { Styles } from "./style";

/**
 *
 * CometChatMessagePreview
 *
 */
const CometChatMessagePreview = (props: any) => {
  let messageText = props?.messagePreviewSubtitle ?? "";
  const theme = useTheme();

  let imageSource;
  if (props?.closeIconURL) {
    if (typeof props?.closeIconURL === "string" && props?.closeIconURL.length > 0)
      imageSource = { uri: props?.closeIconURL };
    else imageSource = closeIcon;
  }

  return (
    <View style={Styles(theme).editPreviewContainerStyle}>
      {/* <View style={Styles(theme).leftBar} /> */}
      <View style={Styles(theme).previewHeadingStyle}>
        <Text style={Styles(theme).previewTitleStyle}>{props?.messagePreviewTitle ?? ""}</Text>
        <TouchableOpacity
          style={Styles(theme).previewCloseStyle}
          onPress={props?.onCloseClick ?? (() => {})}
        >
          <Image style={Styles(theme).previewCloseIconStyle} source={imageSource} />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={1} ellipsizeMode='tail' style={Styles(theme).previewSubTitleStyle}>
        {messageText}
      </Text>
    </View>
  );
};

export { CometChatMessagePreview };
