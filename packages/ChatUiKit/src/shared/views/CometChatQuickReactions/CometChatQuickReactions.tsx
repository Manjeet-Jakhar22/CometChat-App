import React from "react";
import { ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { useTheme } from "../../../theme";
import { Icon } from "../../icons/Icon";

/**
 * Props for the CometChatQuickReactions component.
 */
export interface CometChatQuickReactionsProps {
  /**
   * An array of quick reaction emojis.
   * Accepts a tuple with up to five strings.
   */
  quickReactions?: [string, string?, string?, string?, string?];
  /**
   * Custom style for the quick reactions component.
   */
  style?: CometChatTheme["quickReactionStyle"];
  /**
   * Callback invoked when a reaction emoji is pressed.
   *
   * @param {string} emoji - The emoji that was pressed.
   */
  onReactionPress?: (emoji: string) => void;
  /**
   * Callback invoked when the add reaction button is pressed.
   */
  onAddReactionPress?: () => void;
  /**
   * URL for the add reaction icon.
   */
  addReactionUrl?: ImageSourcePropType;
}

/**
 * CometChatQuickReactions displays a list of quick reaction emojis along with an option to add a new reaction.
 *
 * @param {CometChatQuickReactionsProps} props - Props for the component.
 * @returns {JSX.Element} The rendered quick reactions component.
 */
export const CometChatQuickReactions = (props: CometChatQuickReactionsProps) => {
  const { quickReactions, style, onReactionPress, onAddReactionPress, addReactionUrl } = props;
  const theme = useTheme();

  /**
   * Returns the array of emojis to be displayed.
   *
   * @returns {string[]} An array of emoji strings.
   */
  function getEmojis(): string[] {
    let defaultEmojis = Array.isArray(quickReactions) ? quickReactions.filter((e): e is string => typeof e === 'string') : ["👍", "❤️", "😂", "😢", "🙏"];
    return defaultEmojis;
  }

  return (
    <View style={[theme.quickReactionStyle.containerStyle, style?.containerStyle]}>
      {getEmojis().map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[theme.quickReactionStyle.emojiContainerStyle, style?.emojiContainerStyle]}
          onPress={() => onReactionPress && onReactionPress(item)}
        >
          <Text
            style={[
              { fontSize: 25, color: theme.color.textPrimary },
              { ...theme.typography.heading1.regular },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => onAddReactionPress && onAddReactionPress()}
        style={[theme.quickReactionStyle.emojiContainerStyle, style?.emojiContainerStyle]}
      >
        <Icon name="add-reaction" color={theme.color.iconSecondary} />
      </TouchableOpacity>
    </View>
  );
};