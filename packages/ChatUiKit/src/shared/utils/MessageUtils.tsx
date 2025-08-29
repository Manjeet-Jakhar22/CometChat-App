import { CometChat } from "@cometchat/chat-sdk-react-native";
import React, { JSX } from "react";
import { ColorValue, Text, View } from "react-native";
import { MessageBubbleAlignmentType } from "../base";
import {
  CometChatCustomMessageTypes,
  MessageCategoryConstants,
  MessageReceipt,
  MessageTypeConstants,
} from "../constants/UIKitConstants";
import { ChatConfigurator } from "../framework";
import { Icon, IconName } from "../icons/Icon";
import { CometChatMessageTemplate } from "../modals";
import { CometChatMessageBubble } from "../views/CometChatMessageBubble";
import { BubbleStyles, CometChatTheme } from "../../theme/type";
import { CometChatUIKit } from "../CometChatUiKit";
import { deepMerge } from "../helper/helperFunctions";
import { CometChatDate } from "../views/CometChatDate";
import { CometChatAvatar, CometChatReceipt } from "../views";

type MessageViewParamsType = {
  message: CometChat.BaseMessage;
  templates?: CometChatMessageTemplate[];
  alignment?: MessageBubbleAlignmentType;
  theme: CometChatTheme;
  isThreaded?: boolean;
  datePattern?: (message: CometChat.BaseMessage) => string;
  receiptsVisibility?: boolean;
  avatarVisibility?: boolean;
};

const getOverridenBubbleStyles = (theme: CometChatTheme) => {
  const styleCache = new Map();
  const outgoingBubbleStyles = theme.messageListStyles.outgoingMessageBubbleStyles;
  const incomingBubbleStyles = theme.messageListStyles.incomingMessageBubbleStyles;

  styleCache.set(MessageTypeConstants.text, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.textBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.textBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.image, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.imageBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.imageBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.file, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.fileBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.fileBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.audio, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.audioBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.audioBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.messageDeleted, {
    incoming: deepMerge(
      incomingBubbleStyles,
      theme.deletedBubbleStyles ?? {},
      incomingBubbleStyles.deletedBubbleStyles ?? {}
    ),
    outgoing: deepMerge(
      outgoingBubbleStyles,
      theme.deletedBubbleStyles ?? {},
      outgoingBubbleStyles.deletedBubbleStyles ?? {}
    ),
  });

  styleCache.set(MessageTypeConstants.sticker, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.stickerBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.stickerBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.document, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.collaborativeBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.collaborativeBubbleStyles ?? {}),
  });

  styleCache.set(CometChatCustomMessageTypes.meeting, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.meetCallBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.meetCallBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.whiteboard, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.collaborativeBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.collaborativeBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.video, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.videoBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.videoBubbleStyles ?? {}),
  });

  styleCache.set(MessageTypeConstants.poll, {
    incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.pollBubbleStyles ?? {}),
    outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.pollBubbleStyles ?? {}),
  });

  return styleCache;
};

const getTemplatesMap = (templates: CometChatMessageTemplate[]) => {
  let templatesMap = new Map<string, CometChatMessageTemplate>();
  templates.forEach((template) => {
    if (templatesMap.get(`${template.category}_${template.type}`)) return;
    templatesMap.set(`${template.category}_${template.type}`, template);
  });
  return templatesMap;
};

const MessageContentView = (props: {
  message: CometChat.BaseMessage;
  alignment: MessageBubbleAlignmentType;
  theme: CometChatTheme;
}): JSX.Element | null => {
  const { message, alignment, theme } = props;

  switch (message.getType()) {
    case MessageTypeConstants.audio:
      return ChatConfigurator.dataSource.getAudioMessageContentView(message, alignment, theme);
    case MessageTypeConstants.video:
      return ChatConfigurator.dataSource.getVideoMessageContentView(message, alignment, theme);
    case MessageTypeConstants.file:
      return ChatConfigurator.dataSource.getFileMessageContentView(message, alignment, theme);
    case MessageTypeConstants.text:
      return ChatConfigurator.dataSource.getTextMessageContentView(message, alignment, theme);
    case MessageTypeConstants.image:
      return ChatConfigurator.dataSource.getImageMessageContentView(message, alignment, theme);
  }
  return null;
};

const getLeadingView = (
  item: CometChat.BaseMessage,
  theme: CometChatTheme,
  avatarVisibility = true
): JSX.Element | undefined => {
  if (!avatarVisibility) return undefined;
  let _style = getBubbleStyle(item, theme);
  if (
    item.getSender()?.getUid() !== CometChatUIKit.loggedInUser?.getUid() &&
    item.getCategory() != MessageCategoryConstants.action
  ) {
    return (
      <CometChatAvatar
        image={
          item?.getSender()?.getAvatar && item?.getSender()?.getAvatar()
            ? { uri: item.getSender().getAvatar() }
            : undefined
        }
        name={
          item?.getSender()?.getName && item?.getSender()?.getName()
            ? item?.getSender()?.getName()
            : ""
        }
        style={_style.avatarStyle}
      />
    );
  }
  return undefined;
};

const getHeaderView = (
  item: CometChat.BaseMessage | any,
  theme: CometChatTheme
): JSX.Element | undefined => {
  const _style = getBubbleStyle(item, theme);
  if (
    item.getSender()?.getUid() != CometChatUIKit.loggedInUser?.getUid() &&
    ![MessageCategoryConstants.action, MessageCategoryConstants.call].includes(item.getCategory())
  ) {
    const senderName = (item.getSender()?.getName() || "").trim();
    return (
      <View style={{ flexDirection: "row" }}>
        {Boolean(senderName) && (
          <Text style={_style.senderNameTextStyles} numberOfLines={1} ellipsizeMode={"tail"}>
            {senderName}
          </Text>
        )}
      </View>
    );
  }
  return undefined;
};
const getBubbleStyle = (item: CometChat.BaseMessage, theme: CometChatTheme): BubbleStyles => {
  const loggedInUser = CometChatUIKit.loggedInUser!;
  const type = (() => {
    if (item.getDeletedAt()) {
      return MessageTypeConstants.messageDeleted;
    }
    return item.getType();
  })();

  if (item.getSender().getUid() != loggedInUser.getUid()) {
    return (
      getOverridenBubbleStyles(theme).get(type)?.incoming ??
      theme.messageListStyles.incomingMessageBubbleStyles
    );
  }

  return (
    getOverridenBubbleStyles(theme).get(type)?.outgoing ??
    theme.messageListStyles.outgoingMessageBubbleStyles
  );
};

const getSentAtTimestamp = (item: any) => {
  return item.getSentAt() ? item.getSentAt() * 1000 : Date.now();
};

const getStatusInfoView = (
  item:
    | CometChat.TextMessage
    | CometChat.MediaMessage
    | CometChat.CustomMessage
    | CometChat.InteractiveMessage
    | CometChat.BaseMessage
    | any,
  theme: CometChatTheme,
  receiptsVisibility: boolean = true,
  datePattern?: (message: CometChat.BaseMessage) => string
): JSX.Element | undefined => {
  const loggedInUser = CometChatUIKit.loggedInUser!;

  let isOutgoingMessage = item.getSender()?.getUid() == loggedInUser.getUid();
  let _style = getBubbleStyle(item, theme);

  let messageState;
  if (item.getReadAt()) messageState = "READ";
  else if (item.getDeliveredAt()) messageState = "DELIVERED";
  else if (item.getSentAt()) messageState = "SENT";
  else if (item?.getData()?.metaData?.error) messageState = "ERROR";
  else if (isOutgoingMessage) messageState = "WAIT";
  else messageState = "ERROR";

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "flex-end",
          alignSelf: "flex-end",
        },
        _style.dateReceiptContainerStyle,
      ]}
    >
      <CometChatDate
        timeStamp={(item.getDeletedAt() || item.getSentAt()) * 1000 || getSentAtTimestamp(item)}
        pattern={"timeFormat"}
        customDateString={datePattern && datePattern(item)}
        style={_style.dateStyles}
      />
      {receiptsVisibility && isOutgoingMessage ? (
        /* ToDoM Use Icon From Incoming/Outgoing bubble styles */
        <View style={{ marginLeft: 2, alignItems: "center", justifyContent: "center" }}>
          <CometChatReceipt
            receipt={messageState as MessageReceipt}
            style={{
              sentIconStyle: _style.receiptStyles.sentIconStyle,
              readIconStyle: _style.receiptStyles.readIconStyle,
              waitIconStyle: _style.receiptStyles.waitIconStyle,
              errorIconStyle: _style.receiptStyles.errorIconStyle,
              deliveredIconStyle: _style.receiptStyles.deliveredIconStyle,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export const MessageUtils = {
  getMessageView: (params: MessageViewParamsType) => {
    const {
      message,
      templates,
      alignment,
      theme,
      datePattern,
      receiptsVisibility,
      avatarVisibility,
    } = params;
    const templatesMap = getTemplatesMap(templates!);
    let hasTemplate = templatesMap.get(`${message.getCategory()}_${message.getType()}`);
    if (templates!.length > 0) {
      let customTemplate = templates!.find(
        (template) =>
          template.type == message.getType() && template.category == message.getCategory()
      );
      if (customTemplate) hasTemplate = customTemplate;
    }

    const style = getBubbleStyle(message, theme);

    return (
      <CometChatMessageBubble
        id={`${message.getId()}`}
        alignment={alignment}
        ContentView={
          hasTemplate!.ContentView!(message, alignment!) ||
          MessageContentView({ message, alignment: alignment!, theme: theme! })
        }
        LeadingView={
          message.getReceiverType() === "group"
            ? getLeadingView(message, theme, avatarVisibility)
            : undefined
        }
        HeaderView={
          message.getReceiverType() === "group" ? getHeaderView(message, theme) : undefined
        }
        BottomView={hasTemplate?.BottomView && hasTemplate?.BottomView(message, alignment!)}
        StatusInfoView={
          (hasTemplate?.StatusInfoView && hasTemplate!.StatusInfoView(message, alignment!)) ||
          getStatusInfoView(message, theme, receiptsVisibility, datePattern)
        }
        style={style}
      />
    );
  },
};

export const getMessagePreviewInternal = (
  iconName: IconName,
  text: string,
  { iconColor, theme }: { iconColor?: ColorValue; theme?: CometChatTheme }
) => {
  return (
    <>
      {iconName && (
        <Icon
          name={iconName}
          size={theme?.spacing?.spacing?.s4}
          color={iconColor || theme?.color?.textSecondary}
          containerStyle={{ marginRight: theme?.spacing?.spacing?.s0_5 }}
        />
      )}
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={{
          color: theme?.color?.textSecondary,
          ...theme?.typography?.body?.regular,
          flexShrink: 2,
        }}
      >
        {text}
      </Text>
    </>
  );
};
