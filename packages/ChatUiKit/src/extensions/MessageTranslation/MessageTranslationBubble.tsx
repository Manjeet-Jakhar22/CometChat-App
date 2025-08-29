import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import {
  CometChatMentionsFormatter,
  CometChatTextFormatter,
  CometChatUrlsFormatter,
  localize,
} from "../../shared";
import { CometChatTextBubble } from "../../shared/views";
import { useTheme } from "../../theme";

/**
 * Props for MessageTranslationBubble component.
 */
export interface MessageTranslationBubbleProps {
  /** The translated version of the original text. */
  translatedText?: string;
  /** The original text message. */
  text?: string;
  /** Styling for the original text. */
  textStyle?: TextStyle;
  /** Container style for the original text. */
  textContainerStyle?: ViewStyle;
  /** Styling for the translated text. */
  translatedTextStyle?: TextStyle;
  /** Container style for the translated text. */
  translatedTextContainerStyle?: ViewStyle;
  /** Style for the divider between original and translated text. */
  translatedTextDividerStyle?: ViewStyle;
  /** Alignment of the text bubble. */
  alignment?: string;
  /** An array of text formatters to process the text. */
  textFormatters?: Array<
    CometChatMentionsFormatter | CometChatUrlsFormatter | CometChatTextFormatter
  >;
}

/**
 * MessageTranslationBubble component renders a text bubble that displays both
 * the original text and its translated version.
 *
 * If a translated text is provided, it displays:
 * - The formatted original text.
 * - A divider.
 * - The formatted translated text.
 * - A label indicating the text has been translated.
 *
 * If no translated text is provided, it falls back to rendering the standard
 * CometChatTextBubble.
 *
 * @param {MessageTranslationBubbleProps} props - The props for configuring the text bubble.
 *
 * @returns {JSX.Element} A React element representing the message translation bubble.
 */
export const MessageTranslationBubble: React.FC<MessageTranslationBubbleProps> = (props) => {
  const theme = useTheme();

  // Destructure the props.
  const {
    translatedText,
    text,
    textStyle,
    textContainerStyle,
    translatedTextStyle,
    translatedTextContainerStyle,
    translatedTextDividerStyle,
    alignment,
    textFormatters,
  } = props;

  // State to hold the formatted original text.
  const [formattedText, setFormattedText] = useState<string>("");
  // State to hold the formatted translated text.
  const [formattedTranslatedText, setFormattedTranslatedText] = useState<string>("");

  // Log the divider style for debugging purposes.
  console.log("translatedTextDividerStyle: ", translatedTextDividerStyle);

  /**
   * Effect hook to apply text formatters to both the original and translated texts.
   *
   * It iterates over all provided text formatters and updates the state with the formatted texts.
   */
  useEffect(() => {
    let _formattedText: string = text || "";
    let _formattedTranslatedText: string = translatedText || "";

    // Apply formatters to the original text if any are provided.
    if (textFormatters && textFormatters.length) {
      for (let i = 0; i < textFormatters.length; i++) {
        _formattedText = textFormatters[i].getFormattedText(_formattedText);
      }
    }

    // Apply formatters to the translated text if any are provided.
    if (textFormatters && textFormatters.length) {
      for (let i = 0; i < textFormatters.length; i++) {
        _formattedTranslatedText = textFormatters[i].getFormattedText(_formattedTranslatedText);
      }
    }

    // Update state with the formatted texts.
    setFormattedText(_formattedText);
    setFormattedTranslatedText(_formattedTranslatedText);
  }, [text, translatedText, textFormatters]);

  // Render the bubble with both texts and a translation label if translatedText exists.
  if (translatedText && translatedText !== "") {
    return (
      <View>
        {/* Render the original text */}
        <Text style={textStyle}>{formattedText}</Text>

        {/* Render the divider */}
        <View style={translatedTextDividerStyle} />

        {/* Container for the translated text */}
        <View style={translatedTextContainerStyle}>
          <Text style={translatedTextStyle}>{formattedTranslatedText}</Text>
        </View>

        {/* Label indicating the text has been translated */}
        <Text
          style={[
            {
              ...theme.typography.caption2.regular,
              color: translatedTextStyle?.color ?? theme.color.iconSecondary,
            },
          ]}
        >
          {localize("TEXT_TRANSLATED")}
        </Text>
      </View>
    );
  }

  // If no translated text is provided, render the default text bubble.
  return (
    <CometChatTextBubble
      text={text!}
      textContainerStyle={textContainerStyle}
      textStyle={textStyle}
      textFormatters={textFormatters}
    />
  );
};
