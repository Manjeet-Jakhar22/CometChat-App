import { CometChat } from "@cometchat/chat-sdk-react-native";
import { ColorValue } from "react-native";
import { IconName } from "../icons/Icon";
import { localize } from "../resources/CometChatLocalize";
import { getMessagePreviewInternal } from "./MessageUtils";
import { MessageCategoryConstants } from "../constants/UIKitConstants";
import { CometChatUIKit } from "../CometChatUiKit";
import { CometChatTheme } from "../../theme/type";
import { JSX } from "react";

export class CometChatConversationUtils {
  static getLastMessage(conversation: CometChat.Conversation): CometChat.BaseMessage | undefined {
    let msg = conversation?.getLastMessage && conversation?.getLastMessage();
    if (!msg) {
      return undefined;
    }
    switch (msg["category"]) {
      case "message":
        break;
      case "custom":
        break;
      case "action":
        break;
      case "call":
        break;
      default:
        break;
    }
    return msg;
  }

  static getMessagePreview = (
    lastMessage: CometChat.BaseMessage,
    theme?: CometChatTheme
  ): string | JSX.Element => {
    const uid = CometChatUIKit.loggedInUser!.getUid();
    if (lastMessage != undefined) {
      if (lastMessage.getDeletedAt() !== undefined) {
        return getMessagePreviewInternal("block-fill", localize("DELETE_MSG_TEXT"), {theme});
      }

      if (lastMessage.getCategory() === MessageCategoryConstants.interactive) {
        return getMessagePreviewInternal(
          "block-fill",
          localize("NOT_SUPPORTED") ?? "This message type is not supported",
          {theme}
        );
      }

      if (lastMessage.getCategory() == "call") {
        let color: ColorValue | undefined = theme?.color?.textSecondary;
        let text = "Video call";
        let iconName: IconName = "phone-incoming-fill";
        if (lastMessage.getType() == "audio") {
          text = "Voice call";
        }
        if (uid === lastMessage.getSender().getUid()) {
          iconName = "phone-outgoing-fill";
        } else if ((lastMessage as CometChat.Call).getAction() === "unanswered") {
          color = theme?.color?.error;
          text = "Missed " + text.toLowerCase();
        }

        return getMessagePreviewInternal(iconName, text, {iconColor: color, theme});
      }
      let msgText = "";
      if (lastMessage.getCategory() == "message") {
        switch (lastMessage.getType()) {
          case "text":
            msgText = (lastMessage as CometChat.TextMessage).getText();
            break;
          case "image":
            return getMessagePreviewInternal("photo-fill", localize('PHOTOS'), {theme});
          case "audio":
            return getMessagePreviewInternal("mic-fill", localize('MESSAGE_AUDIO'), {theme});
          case "video":
            return getMessagePreviewInternal("videocam-fill", localize("MESSAGE_VIDEO"), {theme});
          case "file":
            return getMessagePreviewInternal("description-fill", localize("MESSAGE_FILE"), {theme});
        }
      } else if (
        lastMessage.getCategory() == (CometChat.CATEGORY_CUSTOM as CometChat.MessageCategory)
      ) {
        msgText = lastMessage.getType();
      } else if (
        lastMessage.getCategory() == (CometChat.CATEGORY_ACTION as CometChat.MessageCategory)
      ) {
        if (
          (lastMessage as CometChat.Action)?.getAction() === CometChat.ACTION_TYPE.MESSSAGE_DELETED
        ) {
          return getMessagePreviewInternal("block-fill", localize("DELETE_MSG_TEXT"), {theme});
        }
        msgText = (lastMessage as CometChat.Action).getMessage();
      } else if (lastMessage.getCategory() === CometChat.CATEGORY_INTERACTIVE) {
        msgText = "";
        //todo unsupported bubble
      } else {
        msgText = (lastMessage["metadata"] as any)?.pushNotification;
      }
      return msgText;
    } else {
      return "";
    }
  };
}
