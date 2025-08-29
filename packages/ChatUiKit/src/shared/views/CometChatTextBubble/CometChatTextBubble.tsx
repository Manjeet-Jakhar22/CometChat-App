import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Platform,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import {
  CometChatMentionsFormatter,
  CometChatTextFormatter,
  CometChatUrlsFormatter,
} from "../../formatters";
import { localize } from "../../resources";

export interface CometChatTextBubbleInterface {
  /**
   * Text to be shown
   */
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  /**
   * Text container style
   */
  textContainerStyle?: StyleProp<ViewStyle>;
  textFormatters?: Array<
    CometChatMentionsFormatter | CometChatUrlsFormatter | CometChatTextFormatter
  >;
}

export const CometChatTextBubble = (props: CometChatTextBubbleInterface) => {
  const { textContainerStyle } = props;
  return (
    <View style={textContainerStyle}>
      <CometChatTextBubbleText {...props} />
    </View>
  );
};

export const CometChatTextBubbleText = (
  props: Omit<CometChatTextBubbleInterface, "textContainerStyle">
) => {
  const { text = "", textFormatters, textStyle } = props;
  const [formattedText, setFormattedText] = useState<string>("");
  // This flag will be set if the text exceeds 4 lines in collapsed mode.
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  // States to store measured heights for iOS fallback.
  const [fullHeight, setFullHeight] = useState<number>(0);
  const [collapsedHeight, setCollapsedHeight] = useState<number>(0);

  // Format text if any formatters are provided.
  useLayoutEffect(() => {
    let finalText = text;
    if (textFormatters && textFormatters.length) {
      for (let i = 0; i < textFormatters.length; i++) {
        finalText = textFormatters[i].getFormattedText(finalText);
      }
    }
    setFormattedText(finalText);
    // Reset the truncated flag when text changes.
    setIsTruncated(false);
  }, [text, textFormatters]);

  // For Android, onTextLayout reliably provides the number of lines.
  const handleTextLayout = (event: any) => {
    const { lines } = event.nativeEvent;
    if (lines.length > 4) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  };

  // onLayout callback for the collapsed text (iOS)
  const handleCollapsedLayout = (event: any) => {
    setCollapsedHeight(event.nativeEvent.layout.height);
  };

  // onLayout callback for the hidden full text (iOS)
  const handleFullTextLayout = (event: any) => {
    setFullHeight(event.nativeEvent.layout.height);
  };

  // For iOS, when not expanded, compare the hidden full height with the collapsed text height.
  useEffect(() => {
    if (Platform.OS === "ios" && !expanded && fullHeight && collapsedHeight) {
      setIsTruncated(fullHeight > collapsedHeight);
    }
    // Do not update isTruncated when expanded is true so that the toggle remains.
  }, [fullHeight, collapsedHeight, expanded]);

  return (
    <View>
      <Text
        key={expanded ? "expanded" : "collapsed"} // Force re-render when expanded toggles
        style={textStyle}
        // Android uses onTextLayout for measuring lines.
        onTextLayout={Platform.OS !== "ios" ? handleTextLayout : undefined}
        // iOS: only measure collapsed height when not expanded.
        onLayout={Platform.OS === "ios" && !expanded ? handleCollapsedLayout : undefined}
        numberOfLines={expanded ? undefined : 4}
        ellipsizeMode="tail"
      >
        {formattedText}
      </Text>

      {/* Hidden full text for iOS measurement */}
      {Platform.OS === "ios" && (
        <Text
          style={[textStyle, { position: "absolute", opacity: 0, zIndex: -1 }]}
          onLayout={handleFullTextLayout}
        >
          {formattedText}
        </Text>
      )}

      {/* Only show the toggle if the text was truncated in collapsed mode */}
      {isTruncated && (
        <View style={{ alignItems: "flex-end", marginTop: 8 }}>
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={textStyle}>
              {expanded ? localize("SHOW_LESS") : localize("READ_MORE")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CometChatTextBubble;
