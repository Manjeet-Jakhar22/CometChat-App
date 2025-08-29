import { CometChat } from "@cometchat/chat-sdk-react-native";

/**
 * @class StickerKeyboardConfiguration
 * @description StickerKeyboardConfiguration class is used for defining the StickerKeyboard templates.
 * @param {Function} onPress
 * @param {Object} style
 */

class StickerKeyboardConfiguration {
  onPress: (item: CometChat.CustomMessage) => void;
  constructor({ onPress = (item: CometChat.CustomMessage) => {} }) {
    this.onPress = onPress;
  }
}

export { StickerKeyboardConfiguration };
