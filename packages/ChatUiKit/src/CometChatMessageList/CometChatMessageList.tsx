import { CometChat } from "@cometchat/chat-sdk-react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import React, {
  forwardRef,
  JSX,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  NativeModules,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CometChatMessageInformation } from "../CometChatMessageInformation/CometChatMessageInformation";
import {
  CometChatActionSheet,
  CometChatBottomSheet,
  CometChatMentionsFormatter,
  CometChatSoundManager,
  CometChatTextFormatter,
  CometChatUiKitConstants,
  CometChatUrlsFormatter,
  localize,
  SuggestionItem,
} from "../shared";
import {
  MessageBubbleAlignmentType,
  MessageListAlignmentType,
  MessageTimeAlignmentType,
} from "../shared/base/Types";
import {
  CallTypeConstants,
  CometChatCustomMessageTypes,
  GroupsConstants,
  MessageCategoryConstants,
  MessageOptionConstants,
  MessageReceipt,
  MessageStatusConstants,
  MessageTypeConstants,
  ReceiverTypeConstants,
  ViewAlignment,
} from "../shared/constants/UIKitConstants";
import { CometChatUIEventHandler } from "../shared/events/CometChatUIEventHandler/CometChatUIEventHandler";
import { MessageEvents } from "../shared/events/messages";
import { ChatConfigurator } from "../shared/framework/ChatConfigurator";
import { deepClone, deepMerge } from "../shared/helper/helperFunctions";
import { Icon } from "../shared/icons/Icon";
import { CometChatMessageTemplate } from "../shared/modals/CometChatMessageTemplate";
import { getUnixTimestamp, messageStatus } from "../shared/utils/CometChatMessageHelper";
import { CommonUtils } from "../shared/utils/CommonUtils";
import { CometChatConfirmDialog, CometChatReceipt } from "../shared/views";
import { CometChatAvatar } from "../shared/views/CometChatAvatar";
import { CometChatBadge } from "../shared/views/CometChatBadge";
import { CometChatDate } from "../shared/views/CometChatDate";
import { CometChatEmojiKeyboard } from "../shared/views/CometChatEmojiKeyboard";
import { CometChatMessageBubble } from "../shared/views/CometChatMessageBubble";
import { CometChatQuickReactions } from "../shared/views/CometChatQuickReactions";
import { CometChatReactionList } from "../shared/views/CometChatReactionList";
import { CometChatReactions } from "../shared/views/CometChatReactions";
import { useTheme } from "../theme";
import { MessageSkeleton } from "./Skeleton";
import { ErrorEmptyView } from "../shared/views/ErrorEmptyView/ErrorEmptyView";
import { BubbleStyles, CometChatTheme } from "../theme/type";
import { ExtensionConstants } from "../extensions";
//@ts-ignore
import { getExtensionData } from "../shared/helper/functions";
import { DeepPartial } from "../shared/helper/types";
import { CometChatDateSeparator } from "../shared/views/CometChatDateSeperator";

let _defaultRequestBuilder: CometChat.MessagesRequestBuilder;

/**
 * Uses Inverted Flat List
 * Array needs to be reversed meaning the latest message will be at array[0]
 * New message will be appended to the beginning of the array
 * ScrollToBottom -> scrollToOffset({offset: 0}) (top of the list is visual bottom, remember that latest message is at array[0])
 * layoutHeight is the viewport or visible portion of the list
 * Intially when the list is loaded, offset 0 is the bottom most item of the visible area
 */

/**
 * Properties for rendering the CometChat message list component.
 */
export interface CometChatMessageListProps {
  /**
   * ID of the parent message when rendering threaded messages.
   */
  parentMessageId?: string;
  /**
   * The user object associated with the message list.
   */
  user?: CometChat.User;
  /**
   * The group object associated with the message list.
   */
  group?: CometChat.Group;
  /**
   * A component to display when there are no messages.
   */
  EmptyView?: () => JSX.Element;
  /**
   * A component to display when an error occurs.
   */
  ErrorView?: () => JSX.Element;
  /**
   * Flag to hide the error view.
   */
  hideError?: boolean;
  /**
   * A component to display while messages are loading.
   */
  LoadingView?: () => JSX.Element;
  /**
   * Flag to hide read receipts.
   */
  receiptsVisibility?: boolean;
  /**
   * Flag to disable sound for incoming messages.
   */
  disableSoundForMessages?: boolean;
  /**
   * Custom sound URL for messages.
   */
  customSoundForMessages?: string;
  /**
   * Alignment type for the message list.
   */
  alignment?: MessageListAlignmentType;
  /**
   * Flag to show or hide the user's avatar.
   */
  avatarVisibility?: boolean;
  /**
   * Function that returns a custom string representation for a message's date.
   *
   * @param message - The base message object.
   * @returns A string representing the custom date.
   */
  datePattern?: (message: CometChat.BaseMessage) => string;
  /**
   * Function that returns a custom date separator string based on a timestamp.
   *
   * @param date - The timestamp (in milliseconds).
   * @returns A string representing the date separator.
   */
  dateSeparatorPattern?: (date: number) => string;
  /**
   * An array of message templates for rendering custom message types.
   */
  templates?: Array<CometChatMessageTemplate>;
  /**
   * An array of message templates for rendering custom message types.
   */
  addTemplates?: Array<CometChatMessageTemplate>;
  /**
   * Builder for constructing a request to fetch messages.
   */
  messageRequestBuilder?: CometChat.MessagesRequestBuilder;
  /**
   * If true, the message list will scroll to the bottom when new messages arrive.
   */
  scrollToBottomOnNewMessages?: boolean;
  /**
   * Callback invoked when the thread replies view is pressed.
   *
   * @param messageObject - The message object triggering the event.
   * @param messageBubbleView - A function that returns the message bubble view component.
   */
  onThreadRepliesPress?: (
    messageObject: CometChat.BaseMessage,
    messageBubbleView: () => JSX.Element | null
  ) => void;
  /**
   * Custom header view component.
   *
   * @param props - The props object containing user, group, and identifiers.
   * @returns A JSX element representing the header.
   */
  HeaderView?: ({
    user,
    group,
    id,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
    id?: { uid?: string; guid?: string; parentMessageId?: string };
  }) => JSX.Element;
  /**
   * Custom footer view component.
   *
   * @param props - The props object containing user, group, and identifiers.
   * @returns A JSX element representing the footer.
   */
  FooterView?: ({
    user,
    group,
    id,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
    id?: { uid?: string; guid?: string; parentMessageId?: string };
  }) => JSX.Element;
  /**
   * Callback to handle errors.
   *
   * @param e - The error object from CometChat.
   */
  onError?: (e: CometChat.CometChatException) => void;
  /**
   * Callback invoked on back navigation.
   */
  onBack?: () => void;
  /**
   * Collection of text formatter classes to apply custom formatting.
   *
   * @type {Array<CometChatMentionsFormatter | CometChatUrlsFormatter | CometChatTextFormatter>}
   */
  textFormatters?: Array<
    CometChatMentionsFormatter | CometChatUrlsFormatter | CometChatTextFormatter
  >;
  /**
   * Callback invoked when a reaction is pressed.
   *
   * @param reaction - The reaction count object.
   * @param messageObject - The message object.
   */
  onReactionPress?: (
    reaction: CometChat.ReactionCount,
    messageObject: CometChat.BaseMessage
  ) => void;
  /**
   * Callback invoked when a reaction is long pressed.
   *
   * @param reaction - The reaction count object.
   * @param messageObject - The message object.
   */
  onReactionLongPress?: (
    reaction: CometChat.ReactionCount,
    messageObject: CometChat.BaseMessage
  ) => void;
  /**
   * Callback invoked when an item in the reaction list is pressed.
   *
   * @param messageReaction - The message reaction object.
   * @param messageObject - The message object.
   */
  onReactionListItemPress?: (
    messageReaction: CometChat.Reaction,
    messageObject: CometChat.BaseMessage
  ) => void;
  /**
   * Custom styles for the message list component.
   */
  style?: DeepPartial<CometChatTheme["messageListStyles"]>;
  /**
   * Builder for constructing a request to fetch reactions.
   */
  reactionsRequestBuilder?: CometChat.ReactionsRequestBuilder;
  /**
   * Callback invoked when the add reaction button is pressed.
   */
  onAddReactionPress?: () => void;
  /**
   * List of quick reactions.
   *
   * @type {[string, string?, string?, string?, string?]}
   */
  quickReactionList?: [string, string?, string?, string?, string?];
  /**
   * Callback to handle errors.
   *
   * @param messageList - Array of CometChat.BaseMessage
   */
  onLoad?: (messageList: CometChat.BaseMessage[]) => void;
  /**
   * Callback to handle errors.
   *
   * @param messageList - Array of CometChat.BaseMessage
   */
  onEmpty?: () => void;
  /**
   * Flag to hide the reply in thread option
   */
  hideReplyInThreadOption?: boolean;
  /**
   * Flag to hide the share message option
   */
  hideShareMessageOption?: boolean;
  /**
   * Flag to hide the edit message option
   */
  hideEditMessageOption?: boolean;
  /**
   * Flag to hide the translate message option
   */
  hideTranslateMessageOption?: boolean;
  /**
   * Flag to hide the delete message option
   */
  hideDeleteMessageOption?: boolean;
  /**
   * Flag to hide the react to message option
   */
  hideReactionOption?: boolean;
  /**
   * Flag to hide the message privately option
   */
  hideMessagePrivatelyOption?: boolean;
  /**
   * Flag to hide the copy message option
   */
  hideCopyMessageOption?: boolean;
  /**
   * Flag to hide the message info option
   */
  hideMessageInfoOption?: boolean;
  /**
   * Flag to hide group action messages
   */
  hideGroupActionMessages?: boolean;
  /**
   * Flag to hide the timestamp on message bubbles
   */
  hideTimestamp?: boolean;
}

/**
 * Interface defining the actions for managing a CometChat message list.
 */
export interface CometChatMessageListActionsInterface {
  /**
   * Adds a new message to the message list.
   *
   * @param messageObject - The message object to be added.
   */
  addMessage: (messageObject: object) => void;

  /**
   * Updates an existing message in the message list.
   *
   * @param messageObject - The base message object containing updated data.
   * @param withMuid - A flag indicating whether to update the message with a MUID.
   */
  updateMessage: (messageObject: CometChat.BaseMessage, withMuid: boolean) => void;

  /**
   * Removes a message from the message list.
   *
   * @param messageObject - The base message object to be removed.
   */
  removeMessage: (messageObject: CometChat.BaseMessage) => void;

  /**
   * Permanently deletes a message from the message list.
   *
   * @param messageObject - The base message object to be deleted.
   */
  deleteMessage: (messageObject: CometChat.BaseMessage) => void;

  /**
   * Scrolls the message list to the bottom.
   */
  scrollToBottom: () => void;

  /**
   * Creates an action message.
   *
   * @remarks
   * TODO: Clarify the purpose and the appropriate usage of this method.
   */
  createActionMessage: () => void;

  /**
   * Updates the receipt information of a message.
   *
   * @param message - The base message object whose receipt is to be updated.
   */
  updateMessageReceipt: (message: CometChat.BaseMessage) => void;
}

export const CometChatMessageList = memo(
  forwardRef<CometChatMessageListActionsInterface, CometChatMessageListProps>(
    (props: CometChatMessageListProps, ref) => {
      const {
        parentMessageId,
        user,
        group,
        EmptyView,
        ErrorView,
        hideError,
        LoadingView,
        receiptsVisibility = true,
        disableSoundForMessages,
        customSoundForMessages,
        alignment = "standard",
        avatarVisibility = true,
        datePattern,
        dateSeparatorPattern,
        templates = [],
        messageRequestBuilder,
        scrollToBottomOnNewMessages = false,
        onThreadRepliesPress,
        HeaderView,
        FooterView,
        onError,
        onBack,
        reactionsRequestBuilder,
        textFormatters,
        onReactionPress: onReactionPressFromProp,
        onReactionLongPress: onReactionLongPressFromProp,
        onReactionListItemPress: onReactionListItemPressProp,
        style,
        onAddReactionPress,
        quickReactionList,
        addTemplates = [],
        onLoad,
        onEmpty,
        hideReplyInThreadOption = false,
        hideShareMessageOption = false,
        hideEditMessageOption = false,
        hideTranslateMessageOption = false,
        hideDeleteMessageOption = false,
        hideReactionOption = false,
        hideMessagePrivatelyOption = false,
        hideCopyMessageOption = false,
        hideMessageInfoOption = false,
        hideGroupActionMessages = false,
        hideTimestamp = false,
      } = props;

      const callListenerId = "call_" + new Date().getTime();
      const groupListenerId = "group_" + new Date().getTime();
      const uiEventListener = "uiEvent_" + new Date().getTime();
      const callEventListener = "callEvent_" + new Date().getTime();
      const uiEventListenerShow = "uiEvent_show_" + new Date().getTime();
      const uiEventListenerHide = "uiEvent_hide_" + new Date().getTime();
      const connectionListenerId = "connectionListener_" + new Date().getTime();
      const messageEventListener = "messageEvent_" + new Date().getTime();
      const groupEventListener = "groupEvent_" + new Date().getTime();
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const deleteItem = useRef<CometChat.BaseMessage>(undefined);

      useLayoutEffect(() => {
        if (user) {
          _defaultRequestBuilder = new CometChat.MessagesRequestBuilder()
            .setLimit(30)
            .setTags([])
            .setUID(user.getUid());
        } else if (group) {
          _defaultRequestBuilder = new CometChat.MessagesRequestBuilder()
            .setLimit(30)
            .setTags([])
            .setGUID(group.getGuid());
        }

        _defaultRequestBuilder.setTypes(ChatConfigurator.dataSource.getAllMessageTypes());
        _defaultRequestBuilder.setCategories(ChatConfigurator.dataSource.getAllMessageCategories());

        //updating users request builder
        let _updatedCustomRequestBuilder = _defaultRequestBuilder;
        if (messageRequestBuilder) {
          _updatedCustomRequestBuilder = messageRequestBuilder;
          if (user)
            _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setUID(user.getUid());
          if (group)
            _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setGUID(group.getGuid());
        } else {
          _updatedCustomRequestBuilder.hideReplies(true);
          if (user)
            _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setUID(user.getUid());
          if (group)
            _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setGUID(group.getGuid());
          if (parentMessageId)
            _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setParentMessageId(
              parseInt(parentMessageId)
            );
          let types: any[] = [],
            categories: any[] = [];
          if (templates.length) {
            types = templates.map((template) => template.type);
            categories = templates.map((template) => template.category);
          } else {
            types = ChatConfigurator.dataSource.getAllMessageTypes();
            categories = ChatConfigurator.dataSource.getAllMessageCategories();
            if (addTemplates.length) {
              types.push(...addTemplates.map((template) => template.type));
              categories.push(...addTemplates.map((template) => template.category));
            }
          }

          if (hideGroupActionMessages) {
            types = types.filter((type) => type !== MessageTypeConstants.groupMember);
          }
          _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setTypes(types);
          _updatedCustomRequestBuilder = _updatedCustomRequestBuilder.setCategories(categories);
        }

        msgRequestBuilder.current = _updatedCustomRequestBuilder;
      }, [hideGroupActionMessages]);

      const theme = useTheme();

      const mergedTheme: CometChatTheme = useMemo(() => {
        const themeClone = deepClone(theme);
        themeClone.messageListStyles = deepMerge(theme.messageListStyles, style ?? {});
        return themeClone;
      }, [theme, style]);

      const overridenBubbleStyles = useMemo(() => {
        const styleCache = new Map();
        const outgoingBubbleStyles = mergedTheme.messageListStyles.outgoingMessageBubbleStyles;
        const incomingBubbleStyles = mergedTheme.messageListStyles.incomingMessageBubbleStyles;

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
            mergedTheme.deletedBubbleStyles ?? {},
            incomingBubbleStyles.deletedBubbleStyles ?? {}
          ),
          outgoing: deepMerge(
            outgoingBubbleStyles,
            mergedTheme.deletedBubbleStyles ?? {},
            outgoingBubbleStyles.deletedBubbleStyles ?? {}
          ),
        });

        styleCache.set(MessageTypeConstants.sticker, {
          incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.stickerBubbleStyles ?? {}),
          outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.stickerBubbleStyles ?? {}),
        });

        styleCache.set(MessageTypeConstants.document, {
          incoming: deepMerge(
            incomingBubbleStyles,
            incomingBubbleStyles.collaborativeBubbleStyles ?? {}
          ),
          outgoing: deepMerge(
            outgoingBubbleStyles,
            outgoingBubbleStyles.collaborativeBubbleStyles ?? {}
          ),
        });

        styleCache.set(CometChatCustomMessageTypes.meeting, {
          incoming: deepMerge(
            incomingBubbleStyles,
            incomingBubbleStyles.meetCallBubbleStyles ?? {}
          ),
          outgoing: deepMerge(
            outgoingBubbleStyles,
            outgoingBubbleStyles.meetCallBubbleStyles ?? {}
          ),
        });

        styleCache.set(MessageTypeConstants.whiteboard, {
          incoming: deepMerge(
            incomingBubbleStyles,
            incomingBubbleStyles.collaborativeBubbleStyles ?? {}
          ),
          outgoing: deepMerge(
            outgoingBubbleStyles,
            outgoingBubbleStyles.collaborativeBubbleStyles ?? {}
          ),
        });

        styleCache.set(MessageTypeConstants.video, {
          incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.videoBubbleStyles ?? {}),
          outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.videoBubbleStyles ?? {}),
        });

        styleCache.set(MessageTypeConstants.poll, {
          incoming: deepMerge(incomingBubbleStyles, incomingBubbleStyles.pollBubbleStyles ?? {}),
          outgoing: deepMerge(outgoingBubbleStyles, outgoingBubbleStyles.pollBubbleStyles ?? {}),
        });

        styleCache.set(GroupsConstants.ACTION_TYPE_GROUPMEMBER, {
          incoming: mergedTheme.messageListStyles.groupActionBubbleStyles,
          outgoing: mergedTheme.messageListStyles.groupActionBubbleStyles,
        });

        styleCache.set(ExtensionConstants.linkPreview, {
          incoming: deepMerge(
            incomingBubbleStyles,
            incomingBubbleStyles.linkPreviewBubbleStyles ?? {}
          ),
          outgoing: deepMerge(
            outgoingBubbleStyles,
            outgoingBubbleStyles.linkPreviewBubbleStyles ?? {}
          ),
        });

        return styleCache;
      }, [mergedTheme]);

      // refs
      const currentScrollPosition = useRef({
        y: null,
        scrollViewHeight: 0,
        layoutHeight: 0,
        contentHeight: 0,
      });
      const messagesLength = useRef(0);
      const prevMessagesLength = useRef(0);
      const messageListRef = useRef<FlatList | null>(null);
      const loggedInUser = useRef<CometChat.User | null | any>(null);
      const messageRequest = useRef<CometChat.MessagesRequest | null>(null);
      const messagesContentListRef = useRef<any[]>([]);
      const temporaryMessageListRef = useRef<any[]>([]);

      const msgRequestBuilder = useRef<CometChat.MessagesRequestBuilder>(undefined);
      const lastMessageDate = useRef(new Date().getTime());

      // states
      const [messagesList, setMessagesList] = useState<any[]>([]);
      const [listState, setListState] = useState("loading");
      const [loadingMessages, setLoadingMessages] = useState(false);
      /** this is required to prevent duplicate api calls. Cannot use state for this since this is being used in scrollHandler  **/
      const loadingMessagesRef = useRef(false);
      const [unreadCount, setUnreadCount] = useState(0);
      const [showMessageOptions, setShowMessageOptions] = useState<any[]>([]);
      const [ExtensionsComponent, setExtensionsComponent] = useState<JSX.Element | null>(null);
      const [CustomListHeader, setCustomListHeader] = useState<any>(null);
      const [messageInfo, setMessageInfo] = useState(false);
      const [ongoingCallView, setOngoingCallView] = useState(null);
      const [selectedMessage, setSelectedMessage] = useState<any>(null);
      const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
      const [showReactionList, setShowReactionList] = useState(false);
      const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(undefined);
      const [hideScrollToBottomButton, setHideScrollToBottomButton] = useState<boolean>(true);

      const infoObject = useRef<CometChat.BaseMessage | null>(undefined);
      const bottomSheetRef = useRef<any>(null);
      const conversationId = useRef(null);
      let lastID = useRef(0);
      let reachedFirstMessage = useRef<boolean>(false);

      const markUnreadMessageAsRead = () => {
        CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageRead, {
          message: messagesContentListRef.current[0],
        });
        CometChat.markAsRead(messagesContentListRef.current[0]);
        setUnreadCount(0);
      };

      const newMsgIndicatorPressed = useCallback(() => {
        messagesContentListRef.current = [
          ...temporaryMessageListRef.current,
          ...messagesContentListRef.current,
        ];
        onLoad && onLoad([...messagesContentListRef.current].reverse());
        setMessagesList((prev) => [...temporaryMessageListRef.current, ...prev]);
        temporaryMessageListRef.current = [];
        scrollToBottom();
        markUnreadMessageAsRead();
      }, [onLoad]);

      const getPreviousMessages = async () => {
        if (reachedFirstMessage.current) {
          return;
        }
        if (messagesList.length == 0) setListState("loading");
        else {
          setLoadingMessages(true);
          loadingMessagesRef.current = true;
        }
        // TODO: this condition is applied because somewhere from whiteboard extention group scope is set to undefined.
        if (group != undefined && group.getGuid() == undefined) {
          let fetchedGroup: any = await CometChat.getGroup(group.getGuid()).catch((e: any) => {
            console.log("Error: fetching group", e);
            onError && onError(e);
          });
          group.setScope(fetchedGroup["scope"]);
        }
        messageRequest.current
          ?.fetchPrevious()
          .then((msgs: any[]) => {
            if (messageRequest.current!.getLimit() > msgs.length) {
              reachedFirstMessage.current = true;
            }
            let previousMessagesFetched = [...msgs].reverse(); // Reverse for UI use
            if (messagesList.length === 0 && msgs?.length > 0) {
              CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccActiveChatChanged, {
                message: previousMessagesFetched[0],
                user: user,
                group: group,
                theme: mergedTheme,
                parentMessageId: parentMessageId,
              });
              if (conversationId.current == null)
                conversationId.current = previousMessagesFetched[0].getConversationId();
            } else if (messagesList.length === 0 && !props?.parentMessageId) {
              CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccActiveChatChanged, {
                message: previousMessagesFetched[0],
                user: user,
                group: group,
                theme: mergedTheme,
                parentMessageId: parentMessageId,
              });
            }

            for (let index = 0; index < previousMessagesFetched.length; index++) {
              const message: CometChat.BaseMessage = previousMessagesFetched[index];
              if (
                message &&
                !message.hasOwnProperty("readAt") &&
                loggedInUser.current?.getUid() != message?.getSender()?.getUid()
              ) {
                CometChat.markAsRead(message);
                if (index == 0)
                  CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageRead, {
                    message,
                  });
              } else break;
            }
            previousMessagesFetched = previousMessagesFetched.map(
              (item: CometChat.BaseMessage, index: any) => {
                if (item.getCategory() === MessageCategoryConstants.interactive) {
                  return item;
                } else {
                  return item;
                }
              }
            );
            if (previousMessagesFetched.length > 0) {
              messagesContentListRef.current = [
                ...messagesContentListRef.current,
                ...previousMessagesFetched,
              ];
              setMessagesList((prev) => [...prev, ...previousMessagesFetched]);
            }
            if (messagesContentListRef.current.length == 0) {
              onEmpty && onEmpty();
            } else {
              onLoad && onLoad([...messagesContentListRef.current].reverse());
              setLoadingMessages(false);
              loadingMessagesRef.current = false;
            }
            setListState("");
          })
          .catch((e: any) => {
            if (messagesContentListRef.current.length == 0) setListState("error");
            if (e?.code === "REQUEST_IN_PROGRESS") return;
            else {
              setLoadingMessages(false);
              loadingMessagesRef.current = false;
            }
            onError && onError(e);
          });
      };

      const getUpdatedPreviousMessages = () => {
        let messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(50);
        if (user) messagesRequest = messagesRequest.setUID(user.getUid());
        if (group) messagesRequest = messagesRequest.setGUID(group.getGuid());

        messagesRequest.setTypes([MessageCategoryConstants.message]);
        messagesRequest.setCategories([MessageCategoryConstants.action]);
        messagesRequest.setMessageId(lastID.current);

        messagesRequest
          .build()
          .fetchNext()
          .then((updatedMessages: string | any[]) => {
            let tmpList = [...messagesContentListRef.current];
            for (let i = 0; i < updatedMessages.length; i++) {
              let condition = (msg: any) => msg.getId() == updatedMessages[i]?.actionOn.getId();
              let msgIndex = messagesContentListRef.current.findIndex(condition);
              if (msgIndex > -1) {
                tmpList[msgIndex] = updatedMessages[i]?.actionOn;
              }
            }
            // console.log("UPDATES LIST LENGTH", tmpList.length)
            // setMessagesList(tmpList);
            getNewMessages(tmpList);
          })
          .catch((e: any) => console.log("error while fetching updated msgs", e));
      };

      const getNewMessages = (updatedList: any[]) => {
        let newRequestBuilder = msgRequestBuilder.current;
        newRequestBuilder?.setMessageId(lastID.current);

        newRequestBuilder
          ?.build()
          .fetchNext()
          .then((newMessages: any[]) => {
            let cleanUpdatedList = [...updatedList];
            let finalOutput = CommonUtils.mergeArrays(newMessages.reverse(), cleanUpdatedList, [
              "id",
              "muid",
            ]);
            let tmpList = [...finalOutput];
            tmpList = tmpList.map((item: CometChat.BaseMessage, index) => {
              if (item.getCategory() === MessageCategoryConstants.interactive) {
                return item;
              } else {
                return item;
              }
            });
            if (isAtBottom() || isNearBottom()) {
              messagesContentListRef.current = tmpList;
              setMessagesList(tmpList);
              onLoad && onLoad([...messagesContentListRef.current].reverse());
              for (let i = 0; i < newMessages.length; i++) {
                if (newMessages[i].getSender().getUid() !== loggedInUser.current.getUid()) {
                  bottomHandler(newMessages[i], true, true);
                  break;
                }
              }
            } else {
              /*****
               * If scroll is not at bottom or near bottom then add the messages to temporary list
               * lastID in onDisconnected will always be messagesList[0].getId() (state)
               * Example:
               * - unreadCount is already 2 (meaning not near bottom or at bottom)
               * - App is now in the background
               * - Someone sends 2 messages to the user
               * - User now puts the app in foreground and onConnected handler fetches the messages from lastID onwards
               * - unreadCount will now be 4
               * ****/
              const currentUnreadCount = tmpList.length - messagesContentListRef.current.length;
              temporaryMessageListRef.current = [];
              const currentUnreadMessages = tmpList.slice(0, currentUnreadCount);
              temporaryMessageListRef.current = [...currentUnreadMessages];
              setUnreadCount(temporaryMessageListRef.current.length);
            }
            if (newMessages.length === 30) {
              getNewMessages(tmpList);
            }
            newRequestBuilder?.setMessageId(undefined);
          })
          .catch((e: any) => console.log("error while fetching updated msgs", e));
      };

      const templatesMap = useMemo(() => {
        let _formatters = textFormatters || [];
        let tempTemplates: CometChatMessageTemplate[] =
          templates && templates.length
            ? templates
            : [
                ...ChatConfigurator.dataSource.getAllMessageTemplates(mergedTheme, {
                  textFormatters: _formatters,
                  hideReplyInThreadOption,
                  hideShareMessageOption,
                  hideEditMessageOption,
                  hideTranslateMessageOption,
                  hideDeleteMessageOption,
                  hideReactionOption,
                  hideMessagePrivatelyOption,
                  hideCopyMessageOption,
                  hideMessageInfoOption,
                  hideGroupActionMessages,
                }),
                ...addTemplates,
              ];
        let templatesMapTemp = new Map<string, CometChatMessageTemplate>();

        tempTemplates.forEach((template) => {
          if (hideGroupActionMessages && template.type === MessageTypeConstants.groupMember) return;
          if (templatesMapTemp.get(`${template.category}_${template.type}`)) return;
          templatesMapTemp.set(`${template.category}_${template.type}`, template);
        });

        return templatesMapTemp;
      }, [
        mergedTheme,
        templates,
        addTemplates,
        hideReplyInThreadOption,
        hideShareMessageOption,
        hideEditMessageOption,
        hideTranslateMessageOption,
        hideDeleteMessageOption,
        hideReactionOption,
        hideMessagePrivatelyOption,
        hideCopyMessageOption,
        hideMessageInfoOption,
        hideGroupActionMessages,
      ]);

      const getPlainString = (underlyingText: string, messageObject: CometChat.BaseMessage) => {
        let _plainString = underlyingText;

        let regexes: Array<RegExp> = [];
        let users: any = {};

        let edits: Array<{
          endIndex: number;
          replacement: string;
          startIndex: number;
          user: SuggestionItem;
        }> = [];

        let allFormatters = [...(textFormatters || [])];
        let mentionsTextFormatter = ChatConfigurator.getDataSource().getMentionsFormatter(
          loggedInUser.current
        );
        allFormatters.push(mentionsTextFormatter);

        allFormatters.forEach((formatter, key) => {
          regexes.push(formatter.getRegexPattern());
          let suggestionUsers = formatter.getSuggestionItems();
          if (formatter instanceof CometChatMentionsFormatter) {
            let mentionUsers =
              (messageObject?.getMentionedUsers && messageObject?.getMentionedUsers()).map(
                (item: { getUid: () => any; getName: () => string }) =>
                  new SuggestionItem({
                    id: item.getUid(),
                    name: item.getName(),
                    promptText: "@" + item.getName(),
                    trackingCharacter: "@",
                    underlyingText: `<@uid:${item.getUid()}>`,
                    hideLeadingIcon: false,
                  })
              ) || [];
            suggestionUsers = [...suggestionUsers, ...mentionUsers];
          }
          suggestionUsers?.length > 0 &&
            suggestionUsers.forEach((item: any) => (users[item.underlyingText] = item));
        });

        regexes.forEach((regex) => {
          let match;
          while ((match = regex.exec(_plainString)) !== null) {
            const user = users[match[0]];
            if (user) {
              edits.push({
                startIndex: match.index,
                endIndex: regex.lastIndex,
                replacement: user.promptText,
                user,
              });
            }
          }
        });

        // Sort edits by startIndex to apply them in order
        edits.sort((a, b) => a.startIndex - b.startIndex);

        // Get an array of the entries in the map using the spread operator
        const entries = [...edits].reverse();

        // Iterate over the array in reverse order
        entries.forEach(({ endIndex, replacement, startIndex, user }) => {
          let pre = _plainString.substring(0, startIndex);
          let post = _plainString.substring(endIndex);

          _plainString = pre + replacement + post;
        });

        return _plainString;
      };

      const playNotificationSound = useCallback((message: any) => {
        if (disableSoundForMessages) return;

        if (message?.category === MessageCategoryConstants.message) {
          if (customSoundForMessages) {
            CometChatSoundManager.play(
              loggedInUser.current?.getUid() == message["sender"]["uid"]
                ? "outgoingMessage"
                : "incomingMessage",
              customSoundForMessages
            );
          } else {
            CometChatSoundManager.play(
              // "incomingMessage"
              loggedInUser.current?.getUid() == message["sender"]["uid"]
                ? "outgoingMessage"
                : "incomingMessage"
            );
          }
        }
      }, []);

      const markMessageAsRead = (message: any) => {
        if (!message?.readAt) {
          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageRead, { message });
          CometChat.markAsRead(message).catch((error: any) => {
            console.log("Error", error);
            onError && onError(error);
            // errorHandler(error);
          });
        }
      };

      function checkMessageInSameConversation(message: CometChat.BaseMessage | any): boolean {
        return (
          (message?.getReceiverType() == ReceiverTypeConstants.user &&
            user &&
            user?.getUid() == message.getReceiver()?.["uid"]) ||
          (message?.getReceiverType() == ReceiverTypeConstants.group &&
            message.getReceiverId() &&
            group &&
            group?.getGuid() == message.getReceiverId()) ||
          false
        );
      }

      function messageToSameConversation(message: CometChat.BaseMessage): boolean {
        return (
          (message?.getReceiverType() == ReceiverTypeConstants.user &&
            user &&
            user?.getUid() == message.getReceiverId()) ||
          (message?.getReceiverType() == ReceiverTypeConstants.group &&
            message.getReceiverId() &&
            group &&
            group?.getGuid() == message.getReceiverId()) ||
          false
        );
      }
      function checkSameConversation(message: CometChat.BaseMessage): boolean {
        return (
          message.getConversationId() == conversationId.current ||
          (message.getSender()?.getUid() === user?.getUid() &&
            message.getReceiverType() == CometChatUiKitConstants.ReceiverTypeConstants.user)
        );
      }

      function isNearBottom() {
        const { layoutHeight, scrollViewHeight, y }: any = currentScrollPosition.current;

        // In an inverted list, scrolling up moves the user towards the top of the scrollable area,
        // which is actually the "bottom" of the visible chat (since it's inverted).
        let scrollPos = y; // 'y' is how far the user has scrolled from the top of the full content.

        // Calculate how far the user is from the top of the scrollable content (which is visually
        // the "bottom" in an inverted list) as a percentage of the total height.
        if (!layoutHeight) {
          return true;
        }
        let scrollPosFromTopInPercentage = (scrollPos / layoutHeight) * 100;

        // If the user has scrolled to within 30% from the top (which is the "bottom" in this case),
        // we consider them to be near the bottom of the list (since it's inverted).
        if (scrollPosFromTopInPercentage <= 30) {
          return true;
        }
        return false;
      }

      const newMessage = (newMessage: any, isReceived = true) => {
        let baseMessage = newMessage as CometChat.BaseMessage;
        if (baseMessage.getCategory() === MessageCategoryConstants.interactive) {
          //todo show unsupported bubble
        }
        if (
          checkSameConversation(baseMessage) ||
          checkMessageInSameConversation(baseMessage) ||
          messageToSameConversation(baseMessage)
        ) {
          CometChat.markAsDelivered(newMessage);
          //need to add
          if (!parentMessageId && newMessage.getParentMessageId()) {
            //increase count
            let index = messagesList.findIndex((msg) => msg.id === newMessage.parentMessageId);
            let oldMsg: CometChat.BaseMessage = CommonUtils.clone(messagesList[index]);
            oldMsg.setReplyCount(oldMsg.getReplyCount() ? oldMsg.getReplyCount() + 1 : 1);
            let tmpList = [...messagesList];
            tmpList[index] = oldMsg;
            messagesContentListRef.current = tmpList;
            onLoad && onLoad([...messagesContentListRef.current].reverse());
            setMessagesList(tmpList);
            return;
          }
          bottomHandler(newMessage, isReceived);
        }

        playNotificationSound(newMessage);
      };

      const isAtBottom = () => {
        //0 or null
        if (!currentScrollPosition.current.y) {
          return true;
        }
        return false;
      };

      const bottomHandler = (
        newMessage: CometChat.BaseMessage | any,
        isReceived = false,
        skipAddToList = false
      ) => {
        if (
          (newMessage.getSender()?.getUid() || newMessage?.["sender"]?.["uid"]) ==
          loggedInUser.current?.["uid"]
        ) {
          if (!skipAddToList) {
            addToMessageList(newMessage);
          }
          scrollToBottom();
          return;
        }
        if (!isReceived) {
          return;
        }
        if (
          (!parentMessageId && newMessage.getParentMessageId()) ||
          (parentMessageId && !newMessage.getParentMessageId()) ||
          (parentMessageId &&
            newMessage.getParentMessageId() &&
            parentMessageId != newMessage.getParentMessageId())
        ) {
          return;
        }
        if (isAtBottom() || isNearBottom() || scrollToBottomOnNewMessages) {
          if (!skipAddToList) {
            addToMessageList(newMessage);
          }
          scrollToBottom();
          markMessageAsRead(newMessage);
        } else {
          temporaryMessageListRef.current = [newMessage, ...temporaryMessageListRef.current];
          setUnreadCount(unreadCount + 1);
        }
      };

      const addToMessageList = (newMessage: CometChat.BaseMessage) => {
        messagesContentListRef.current = [newMessage, ...messagesContentListRef.current];
        onLoad && onLoad([...messagesContentListRef.current].reverse());
        setMessagesList((prev) => [newMessage, ...prev]);
      };

      const markParentMessageAsRead = (message: CometChat.BaseMessage) => {
        let condition: (value: any, index: number, obj: any[]) => unknown;
        condition = (msg) => msg.getId() == message?.["parentMessageId"];
        let msgIndex = messagesList.findIndex(condition);
        if (msgIndex > -1) {
          let tmpList = [...messagesList];
          if (message.getCategory() === MessageCategoryConstants.interactive) {
            //todo show unsupported bubble
          }
          tmpList[msgIndex]?.setUnreadReplyCount(0);
          messagesContentListRef.current = tmpList;
          onLoad && onLoad([...messagesContentListRef.current].reverse());
          setMessagesList(tmpList);
        }
      };

      const messageEdited = (editedMessage: CometChat.BaseMessage, withMuid: boolean = false) => {
        let condition: (value: any, index: number, obj: any[]) => unknown;
        if (withMuid) {
          condition = (msg) => msg["muid"] == editedMessage["muid"];
        } else condition = (msg) => msg.getId() == editedMessage.getId();
        let msgIndex = messagesContentListRef.current.findIndex(condition);
        if (msgIndex > -1) {
          let tmpList = [...messagesContentListRef.current];
          if (editedMessage.getCategory() === MessageCategoryConstants.interactive) {
            //todo show unsupported bubble
          }
          tmpList[msgIndex] = CommonUtils.clone(editedMessage);
          messagesContentListRef.current = tmpList;
          onLoad && onLoad([...messagesContentListRef.current].reverse());
          setMessagesList(tmpList);
        }
      };

      const removeMessage = (message: CometChat.BaseMessage) => {
        let msgIndex = messagesList.findIndex((msg) => msg.getId() == message.getId());
        if (msgIndex == -1) return;

        let tmpList = [...messagesList];
        tmpList.splice(msgIndex, 1);
        messagesContentListRef.current = tmpList;
        onLoad && onLoad([...messagesContentListRef.current].reverse());
        setMessagesList(tmpList);
      };

      const deleteMessage = (message: CometChat.BaseMessage) => {
        CometChat.deleteMessage(message.getId().toString())
          .then((res: any) => {
            CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageDeleted, {
              message: res,
            });
            setShowMessageOptions([]);
            setShowDeleteModal(false);
            deleteItem.current = undefined;
          })
          .catch((rej: any) => {
            deleteItem.current = undefined;
            setShowDeleteModal(false);
            console.log(rej);
            onError && onError(rej);
          });
      };

      const createActionMessage = () => {};

      const updateMessageReceipt = (receipt: any) => {
        if (
          receipt?.getReceiverType() === ReceiverTypeConstants.group &&
          ![
            receipt.RECEIPT_TYPE.DELIVERED_TO_ALL_RECEIPT,
            receipt.RECEIPT_TYPE.READ_BY_ALL_RECEIPT,
          ].includes(receipt?.getReceiptType())
        ) {
          return;
        }
        let index = messagesContentListRef.current.findIndex(
          (msg, index) =>
            msg["id"] == receipt["messageId"] || msg["messageId"] == receipt["messageId"]
        );

        if (index == -1) return;

        let tmpList: Array<CometChat.BaseMessage> = [...messagesContentListRef.current];

        for (let i = index; i < messagesContentListRef.current.length; i++) {
          if (tmpList[i]?.getReadAt && tmpList[i]?.getReadAt()) break;

          let tmpMsg = tmpList[i];
          if (!Number.isNaN(Number(tmpMsg.getId()))) {
            if (tmpMsg.getCategory() === MessageCategoryConstants.interactive) {
              //todo show unsupported bubble
            }
            if (receipt.getDeliveredAt()) {
              tmpMsg.setDeliveredAt(receipt.getDeliveredAt());
            }
            if (receipt.getReadAt()) {
              tmpMsg.setReadAt(receipt.getReadAt());
            }
          }
          tmpList[i] = CommonUtils.clone(tmpMsg);
        }

        messagesContentListRef.current = tmpList;
        onLoad && onLoad([...messagesContentListRef.current].reverse());
        setMessagesList(tmpList);
      };

      const handlePannel = (item: any) => {
        if (
          item.alignment === ViewAlignment.messageListBottom &&
          user &&
          group &&
          CommonUtils.checkIdBelongsToThisComponent(item.id, user, group, parentMessageId || "")
        ) {
          if (item.child) setCustomListHeader(() => item.child);
          else setCustomListHeader(null);
        }
      };

      useEffect(() => {
        CometChatUIEventHandler.addUIListener(uiEventListenerShow, {
          showPanel: (item) => handlePannel(item),
          // ccMentionClick: (item) => {
          //     // console.log("item", item)
          // }
        });
        CometChatUIEventHandler.addUIListener(uiEventListenerHide, {
          hidePanel: (item) => handlePannel(item),
        });
        CometChatUIEventHandler.addUIListener(uiEventListener, {
          ccToggleBottomSheet: (item) => {
            bottomSheetRef.current?.togglePanel();
          },
        });
        CometChat.getLoggedinUser()
          .then((u: any) => {
            loggedInUser.current = u;
            messageRequest.current = msgRequestBuilder.current?.build() || null;
            getPreviousMessages();
          })
          .catch((e: any) => {
            console.log("Error while getting loggedInUser");
            onError && onError(e);
            loggedInUser.current = null;
          });

        return () => {
          CometChatUIEventHandler.removeUIListener(uiEventListenerShow);
          CometChatUIEventHandler.removeUIListener(uiEventListenerHide);
          CometChatUIEventHandler.removeUIListener(uiEventListener);
          onBack && onBack();
        };
      }, []);

      useEffect(() => {
        //add listeners

        let reactionListeners = {
          onMessageReactionAdded: (reaction: CometChat.ReactionEvent) => {
            updateMessageReaction(reaction, true);
          },
          onMessageReactionRemoved: (reaction: CometChat.ReactionEvent) => {
            updateMessageReaction(reaction, false);
          },
        };

        CometChat.addGroupListener(
          groupListenerId,
          new CometChat.GroupListener({
            onGroupMemberScopeChanged: (message: any) => {
              newMessage(message);
            },
            onGroupMemberLeft: (message: any) => {
              newMessage(message);
            },
            onGroupMemberKicked: (message: any) => {
              newMessage(message);
            },
            onGroupMemberBanned: (message: any) => {
              newMessage(message);
            },
            onGroupMemberUnbanned: (message: any) => {
              newMessage(message);
            },
            onMemberAddedToGroup: (message: any) => {
              newMessage(message);
            },
            onGroupMemberJoined: (message: any) => {
              newMessage(message);
            },
          })
        );

        CometChatUIEventHandler.addMessageListener(messageEventListener, {
          ccMessageSent: ({ message, status }: any) => {
            if (status == MessageStatusConstants.inprogress) {
              newMessage(message, false);
            }

            if (status == MessageStatusConstants.success) {
              messageEdited(message, true);
            }
            if (status == MessageStatusConstants.error) {
              messageEdited(message, true);
            }
          },
          ccMessageEdited: ({ message, status }: any) => {
            if (status == messageStatus.success) {
              messageEdited(message, false);
            }
          },
          ccMessageDeleted: ({ message }: any) => {
            messageEdited(message, false);
          },
          ccMessageRead: ({ message }: any) => {
            if (!parentMessageId && message.parentMessageId) {
              // markParentMessageAsRead(message); //NOTE: uncomment this when want unread count in thread view
            }
          },
          onTextMessageReceived: (textMessage: any) => {
            newMessage(textMessage);
          },
          onMediaMessageReceived: (mediaMessage: any) => {
            newMessage(mediaMessage);
          },
          onCustomMessageReceived: (customMessage: any) => {
            newMessage(customMessage);
          },
          onMessagesDelivered: (messageReceipt: any) => {
            updateMessageReceipt(messageReceipt);
          },
          onMessagesRead: (messageReceipt: any) => {
            updateMessageReceipt(messageReceipt);
          },
          onMessageDeleted: (deletedMessage: any) => {
            messageEdited(deletedMessage);
          },
          onMessageEdited: (editedMessage: any) => {
            messageEdited(editedMessage);
          },
          onFormMessageReceived: (formMessage: any) => {
            newMessage(formMessage);
          },
          onCardMessageReceived: (cardMessage: any) => {
            newMessage(cardMessage);
          },
          onSchedulerMessageReceived: (schedulerMessage: any) => {
            newMessage(schedulerMessage);
          },
          onCustomInteractiveMessageReceived: (customInteractiveMessage: any) => {
            newMessage(customInteractiveMessage);
          },
          onInteractionGoalCompleted: (interactionReceipt: CometChat.InteractionReceipt) => {
            //todo show unsupported bubble
          },
          ...reactionListeners,
          onMessagesDeliveredToAll: (messageReceipt: CometChat.MessageReceipt) => {
            updateMessageReceipt(messageReceipt);
          },
          onMessagesReadByAll: (messageReceipt: CometChat.MessageReceipt) => {
            updateMessageReceipt(messageReceipt);
          },
        });
        CometChatUIEventHandler.addGroupListener(groupEventListener, {
          ccGroupMemberUnBanned: ({ message }: any) => {
            newMessage(message, false);
          },
          ccGroupMemberBanned: ({ message }: any) => {
            newMessage(message, false);
          },
          ccGroupMemberAdded: ({ message, usersAdded, userAddedIn }: any) => {
            usersAdded.forEach((user: any) => {
              message["message"] = `${loggedInUser.current?.getName()} added ${user.name}`;
              message["muid"] = String(getUnixTimestamp());
              message["sentAt"] = getUnixTimestamp();
              message["actionOn"] = user;
              newMessage(message, false);
            });
          },
          ccGroupMemberKicked: ({ message }: any) => {
            newMessage(message, false);
          },
          ccGroupMemberScopeChanged: ({
            action,
            updatedUser,
            scopeChangedTo,
            scopeChangedFrom,
            group,
          }: any) => {
            newMessage(action, false);
          },
          ccOwnershipChanged: ({ group, message }: any) => {
            // newMessage(message, false); removed after discussion.
          },
        });

        CometChat.addCallListener(
          callListenerId,
          new CometChat.CallListener({
            onIncomingCallReceived: (call: any) => {
              Platform.OS === 'ios' && Keyboard.dismiss();
              newMessage(call);
            },
            onOutgoingCallAccepted: (call: any) => {
              newMessage(call);
            },
            onOutgoingCallRejected: (call: any) => {
              newMessage(call);
            },
            onIncomingCallCancelled: (call: any) => {
              newMessage(call);
            },
          })
        );

        CometChatUIEventHandler.addCallListener(callEventListener, {
          ccCallInitiated: ({ call }: any) => {
            if (
              call["type"] == CallTypeConstants.audio ||
              call["type"] == CallTypeConstants.video
            ) {
              newMessage(call);
            }
          },
          ccOutgoingCall: ({ call }: any) => {
            if (
              call["type"] == CallTypeConstants.audio ||
              call["type"] == CallTypeConstants.video
            ) {
              newMessage(call);
            }
          },
          ccCallAccepted: ({ call }: any) => {
            if (
              call["type"] == CallTypeConstants.audio ||
              call["type"] == CallTypeConstants.video
            ) {
              newMessage(call);
            }
          },
          ccCallRejected: ({ call }: any) => {
            if (
              call["type"] == CallTypeConstants.audio ||
              call["type"] == CallTypeConstants.video
            ) {
              newMessage(call);
            }
          },
          ccCallEnded: ({ call }: any) => {
            if (
              call["type"] == CallTypeConstants.audio ||
              call["type"] == CallTypeConstants.video
            ) {
              newMessage(call);
            }
          },
          ccShowOngoingCall: (CometChatOngoingComponent) => {
            //show ongoing call
            setOngoingCallView(CometChatOngoingComponent?.child);
          },
        });
        CometChat.addConnectionListener(
          connectionListenerId,
          new CometChat.ConnectionListener({
            onConnected: () => {
              console.log("CONNECTED...");
              if (lastID.current) {
                getUpdatedPreviousMessages();
              }
            },
            inConnecting: () => {},
            onDisconnected: () => {
              console.log("DISCONNECTED...");
              if (!messagesList[0].id) {
                for (let i = 0; i < messagesList.length; i++) {
                  if (messagesList[i].id) {
                    lastID.current = messagesList[i].id;
                    break;
                  }
                }
              } else {
                lastID.current = messagesList[0].id;
              }
            },
          })
        );

        return () => {
          // clean up code like removing listeners
          CometChatUIEventHandler.removeMessageListener(messageEventListener);
          CometChatUIEventHandler.removeGroupListener(groupEventListener);
          CometChatUIEventHandler.removeCallListener(callEventListener);

          CometChat.removeGroupListener(groupListenerId);
          CometChat.removeCallListener(callListenerId);
          CometChat.removeConnectionListener(connectionListenerId);
        };
      }, [messagesList, unreadCount, user, group]);

      useEffect(() => {
        prevMessagesLength.current =
          messagesLength.current || messagesContentListRef.current.length;
        messagesLength.current = messagesContentListRef.current.length;
      }, [messagesContentListRef.current]);

      useEffect(() => {
        if (selectedEmoji) {
          setShowReactionList(true);
        }
      }, [selectedEmoji]);
      useImperativeHandle(ref, () => {
        return {
          addMessage: newMessage,
          updateMessage: messageEdited,
          removeMessage,
          deleteMessage,
          scrollToBottom,
          /// todo: not handeled yet
          createActionMessage,
          updateMessageReceipt,
        };
      });

      const getMessageById = (messageId: string): CometChat.BaseMessage => {
        const message = messagesList.find((message) => message.getId() === messageId);
        return message;
      };

      function isReactionOfThisList(receipt: CometChat.ReactionEvent) {
        const receiverId = receipt?.getReceiverId();
        const receiverType = receipt?.getReceiverType();
        const reactedById = receipt?.getReaction()?.getReactedBy()?.getUid();
        const parentMessageId = receipt?.getParentMessageId();
        const listParentMessageId = parentMessageId && String(parentMessageId);
        if (listParentMessageId) {
          if (parentMessageId === listParentMessageId) {
            return true;
          } else {
            return false;
          }
        } else {
          if (receipt.getParentMessageId()) {
            return false;
          }
          if (user) {
            if (
              receiverType === ReceiverTypeConstants.user &&
              (receiverId === user.getUid() || reactedById === user.getUid())
            ) {
              return true;
            }
          } else if (group) {
            if (receiverType === ReceiverTypeConstants.group && receiverId === group.getGuid()) {
              return true;
            }
          }
        }
        return false;
      }

      const updateMessageReaction = (message: CometChat.ReactionEvent, isAdded: boolean): void => {
        let _isReactionOfThisList = isReactionOfThisList(message);
        if (!_isReactionOfThisList) return;

        const messageId = message?.getReaction()?.getMessageId();
        const messageObject = getMessageById(messageId);
        if (!messageObject) return;

        let action: any;
        if (isAdded) {
          action = CometChat.REACTION_ACTION.REACTION_ADDED;
        } else {
          action = CometChat.REACTION_ACTION.REACTION_REMOVED;
        }
        const modifiedMessage = CometChat.CometChatHelper.updateMessageWithReactionInfo(
          messageObject,
          message.getReaction(),
          action
        );
        if (modifiedMessage instanceof CometChat.CometChatException) {
          onError && onError(modifiedMessage);
          return;
        }
        messageEdited(modifiedMessage, false);
      };

      const getCurrentBubbleStyle = useCallback(
        (item: CometChat.BaseMessage): BubbleStyles => {
          const type = (() => {
            if (item.getDeletedAt()) {
              return MessageTypeConstants.messageDeleted;
            }
            if (item.getType() === MessageTypeConstants.text) {
              let linkData = getExtensionData(item, ExtensionConstants.linkPreview);
              if (linkData && linkData.links.length != 0) {
                return ExtensionConstants.linkPreview;
              }
            }
            return item.getType();
          })();

          if (item.getSender().getUid() != loggedInUser.current.getUid()) {
            return (
              overridenBubbleStyles.get(type)?.incoming ??
              mergedTheme.messageListStyles.incomingMessageBubbleStyles
            );
          }

          return (
            overridenBubbleStyles.get(type)?.outgoing ??
            mergedTheme.messageListStyles.outgoingMessageBubbleStyles
          );
        },
        [mergedTheme, overridenBubbleStyles]
      );

      // functions returning view
      const getLeadingView = useCallback((item: CometChat.BaseMessage): JSX.Element | undefined => {
        let _style = getCurrentBubbleStyle(item);

        if (
          avatarVisibility &&
          (alignment === "leftAligned" ||
            (item.getSender()?.getUid() !== loggedInUser.current?.getUid() && !user)) &&
          ![MessageCategoryConstants.action, MessageCategoryConstants.call].includes(
            item.getCategory()
          )
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
      }, []);

      const getHeaderView = useCallback(
        (item: CometChat.BaseMessage | any): JSX.Element | undefined => {
          const _style = getCurrentBubbleStyle(item);
          if (
            (alignment === "leftAligned" ||
              (item.getSender()?.getUid() != loggedInUser.current?.getUid() && !user)) &&
            ![MessageCategoryConstants.action, MessageCategoryConstants.call].includes(
              item.getCategory()
            )
          ) {
            const senderName = (item.getSender()?.getName() || "").trim();
            return (
              <View style={{ flexDirection: "row" }}>
                {Boolean(senderName) && (
                  <Text
                    style={_style.senderNameTextStyles}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {senderName}
                  </Text>
                )}
              </View>
            );
          }
          return undefined;
        },
        []
      );

      const getStatusInfoView = useCallback(
        (
          item:
            | CometChat.TextMessage
            | CometChat.MediaMessage
            | CometChat.CustomMessage
            | CometChat.InteractiveMessage
            | CometChat.BaseMessage
            | any,
          bubbleAlignment: MessageBubbleAlignmentType,
          currentIndex?: number
        ): JSX.Element | undefined => {
          // Skip action category messages
          if ((item as CometChat.BaseMessage).getCategory() === MessageCategoryConstants.action)
            return undefined;

          let isOutgoingMessage = item.getSender()?.getUid() === loggedInUser.current?.getUid();
          let _style = getCurrentBubbleStyle(item);

          let messageState;
          const nextItemIsRead =
            messagesContentListRef.current[currentIndex! - 1] &&
            messagesContentListRef.current[currentIndex! - 1].getReadAt();
          const nextItemIsDelivered =
            messagesContentListRef.current[currentIndex! - 1] &&
            messagesContentListRef.current[currentIndex! - 1].getDeliveredAt();
          if (item.getReadAt() || nextItemIsRead) messageState = MessageReceipt.READ;
          else if (item.getDeliveredAt() || nextItemIsDelivered)
            messageState = MessageReceipt.DELIVERED;
          else if (item.getSentAt()) messageState = MessageReceipt.SENT;
          else if (item?.getData()?.metaData?.error) messageState = MessageReceipt.ERROR;
          else if (isOutgoingMessage) messageState = MessageReceipt.WAIT;
          else messageState = MessageReceipt.ERROR;

          // Determine if message has been edited.
          // This example assumes you have a method (or property) like getEditedAt() that returns a timestamp when edited.
          const isEdited =
            item.getEditedAt?.() &&
            (item as CometChat.BaseMessage).getType() === MessageTypeConstants.text;

          return (
            <View>
              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: bubbleAlignment === "right" ? "flex-end" : "flex-start",
                    alignSelf: "flex-end",
                    alignItems: "center",
                  },
                  _style.dateReceiptContainerStyle,
                ]}
              >
                {isEdited && (
                  <Text
                    style={[
                      _style.dateStyles.textStyle,
                      {
                        textTransform: "none",
                      },
                    ]}
                  >
                    {localize("EDITED")}
                  </Text>
                )}
                {
                  <CometChatDate
                    timeStamp={
                      !hideTimestamp
                        ? (item.getDeletedAt() || item.getSentAt()) * 1000 ||
                          getSentAtTimestamp(item)
                        : undefined
                    }
                    pattern={"timeFormat"}
                    customDateString={datePattern && datePattern(item)}
                    style={_style.dateStyles}
                  />
                }
                {receiptsVisibility && alignment !== "leftAligned" && isOutgoingMessage ? (
                  <View style={{ marginLeft: 2, alignItems: "center", justifyContent: "center" }}>
                    <CometChatReceipt
                      receipt={messageState}
                      style={{
                        deliveredIcon: _style.receiptStyles.deliveredIcon,
                        readIcon: _style.receiptStyles.readIcon,
                        sentIcon: _style.receiptStyles.sentIcon,
                        waitIcon: _style.receiptStyles.waitIcon,
                        errorIcon: _style.receiptStyles.errorIcon,
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
            </View>
          );
        },
        [mergedTheme]
      );

      const onReactionPress = useCallback(
        (reaction: CometChat.ReactionCount, messageObject: CometChat.BaseMessage) => {
          if (reaction.getReaction() == "All") {
            setSelectedMessage(messageObject);
            setSelectedEmoji(reaction.getReaction());
            return;
          }
          if (onReactionPressFromProp) {
            onReactionPressFromProp(reaction, messageObject);
            return;
          }
          reactToMessage(reaction.getReaction(), messageObject);
        },
        [onReactionPressFromProp]
      );

      const onReactionLongPress = useCallback(
        (reaction: CometChat.ReactionCount, messageObject: CometChat.BaseMessage) => {
          if (onReactionLongPressFromProp && reaction.getReaction() !== "All") {
            onReactionLongPressFromProp(reaction, messageObject);
            return;
          }
          setSelectedMessage(messageObject);
          setSelectedEmoji(reaction.getReaction());
        },
        [onReactionLongPressFromProp]
      );

      const getFooterView = useCallback(
        (messageObject: CometChat.BaseMessage, alignment: MessageBubbleAlignmentType) => {
          let hasReaction =
            messageObject?.getReactions &&
            messageObject?.getReactions() &&
            messageObject?.getReactions().length > 0;
          return hasReaction
            ? (params: { maxContentWidth?: number }) => {
                return (
                  <CometChatReactions
                    messageObject={messageObject}
                    onReactionPress={onReactionPress}
                    onReactionLongPress={onReactionLongPress}
                    alignment={alignment}
                    style={getCurrentBubbleStyle(messageObject).reactionStyles}
                    maxContentWidth={params?.maxContentWidth}
                  />
                );
              }
            : null;
        },
        [mergedTheme]
      );

      const getAlignment = useCallback(
        (item: CometChat.BaseMessage | any): MessageBubbleAlignmentType => {
          if (item && item.getCategory() == MessageCategoryConstants.action) return "center";
          if (
            alignment == "standard" &&
            (item.getSender()?.getUid() || item?.["sender"]?.["uid"]) ==
              loggedInUser.current?.getUid()
          )
            return "right";
          return "left";
        },
        []
      );

      const openMessageInfo = (message: any) => {
        infoObject.current = message;
        setMessageInfo(true);
        setShowMessageOptions([]);
      };

      const openThreadView = (...params: any[]) => {
        if (onThreadRepliesPress) {
          onThreadRepliesPress(params[0], () => (
            <MessageView message={params[0]} isThreaded={true} showOptions={false} />
          ));
        }
        setShowMessageOptions([]);
        return onThreadRepliesPress;
      };

      const editMessage = (item: any) => {
        CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageEdited, {
          message: item,
          status: messageStatus.inprogress,
        });
        setShowMessageOptions([]);
      };

      const copyMessage = (item: any) => {
        let copyMessage = getPlainString(item["text"], item);
        Clipboard.setString(copyMessage);
        setShowMessageOptions([]);
      };

      const getThreadView = useCallback(
        (item: CometChat.BaseMessage, alignment: MessageBubbleAlignmentType) => {
          let isThreaded = item.getReplyCount() > 0;

          let _style = getCurrentBubbleStyle(item);
          return !isThreaded ? undefined : (
            <TouchableOpacity
              onPress={() => openThreadView(item, null)}
              style={_style.threadedMessageStyles?.containerStyle}
            >
              <Icon
                icon={_style.threadedMessageStyles?.icon}
                size={16}
                name='subdirectory-arrow-right-fill'
              />

              <Text
                style={_style.threadedMessageStyles?.indicatorTextStyle}
              >{`${item.getReplyCount()} ${
                item.getReplyCount() > 1 ? localize("REPLIES") : localize("REPLY")
              }`}</Text>
              <CometChatBadge
                style={{
                  containerStyle: _style.threadedMessageStyles?.unreadCountStyle?.containerStyle,
                  textStyle: _style.threadedMessageStyles?.unreadCountStyle?.textStyle,
                }}
                count={item.getUnreadRepliesCount()}
              />
            </TouchableOpacity>
          );
        },
        [mergedTheme]
      );

      const privateMessage = (item: CometChat.BaseMessage) => {
        setShowMessageOptions([]);
        CometChat.getUser(item.getSender().getUid())
          .then((user: any) => {
            console.log({ user });
            CometChatUIEventHandler.emitUIEvent("openChat", { user });
          })
          .catch((e: any) => {
            onError && onError(e);
          });
      };

      const shareMedia = async (messageObject: CometChat.MediaMessage | any) => {
        let _plainString = getPlainString(messageObject?.getData()["text"] || "", messageObject);

        let textMessage = _plainString;
        let fileUrl = messageObject.getData()["url"];

        const getFileName = () => {
          if (!fileUrl) return "";
          return fileUrl.substring(fileUrl.lastIndexOf("/") + 1, fileUrl.length).replace(" ", "_");
        };

        let shareObj = {
          message: textMessage,
          type: messageObject["type"],
          mediaName: getFileName(), // get File name
          fileUrl: fileUrl || "", // get File url
          mimeType:
            messageObject["type"] === "text"
              ? ""
              : (messageObject as CometChat.MediaMessage)?.getAttachment()?.getMimeType(), // get Mime Type
        };

        NativeModules.FileManager.shareMessage(shareObj, (callback: any) => {
          console.log("shareMessage Callback", callback);
        });
      };

      const openOptionsForMessage = useCallback(
        (item: CometChat.BaseMessage | any, template: CometChatMessageTemplate) => {
          let options = template?.options
            ? loggedInUser.current
              ? template.options(loggedInUser.current, item, mergedTheme, group)
              : []
            : [];
          let optionsWithPressHandling = options.map((option) => {
            if (!option.onPress)
              switch (option.id) {
                case MessageOptionConstants.messageInformation:
                  option.onPress = openMessageInfo.bind(this, item);
                  break;
                case MessageOptionConstants.replyInThread:
                  option.onPress = openThreadView.bind(this, item);
                  break;
                case MessageOptionConstants.deleteMessage:
                  option.onPress = () => {
                    deleteItem.current = item;
                    bottomSheetRef.current?.togglePanel();
                    Platform.OS === "android" && setShowDeleteModal(true);
                  };

                  break;
                case MessageOptionConstants.editMessage:
                  option.onPress = editMessage.bind(this, item);
                  break;
                case MessageOptionConstants.copyMessage:
                  option.onPress = copyMessage.bind(this, item);
                  break;
                case MessageOptionConstants.sendMessagePrivately:
                  option.onPress = privateMessage.bind(this, item);
                  break;
                // case MessageOptionConstants.forwardMessage:
                //     option.onPress = showForwardMessage.bind(this, item);
                //     break
                case MessageOptionConstants.shareMessage:
                  option.onPress = shareMedia.bind(this, item);
                  break;
              }
            else {
              // If overriding `onPress`, make sure to pass `item` explicitly
              const customOnPress = option.onPress;
              option.onPress = () => {
                customOnPress(item);
                setShowMessageOptions([]);
              };
            }
            if (option.id === MessageOptionConstants.reactToMessage) {
              option.onPress = () => {
                if (option.CustomView) {
                  let view = option.CustomView(item);
                  setExtensionsComponent(() => view);
                }
              };
            }
            return option;
          });
          setShowMessageOptions(optionsWithPressHandling);
        },
        [mergedTheme]
      );

      const MessageView = useCallback(
        (params: {
          message: CometChat.BaseMessage;
          showOptions?: boolean;
          isThreaded?: boolean;
          currentIndex?: number;
        }) => {
          const { message, showOptions = true, isThreaded = false, currentIndex } = params;
          const hasTemplate = useMemo(() => {
            const defaultTemplate = templatesMap.get(
              `${message.getCategory()}_${message.getType()}`
            );

            if (templates?.length > 0) {
              const customTemplate = templates.find(
                (template) =>
                  template.type === message.getType() && template.category === message.getCategory()
              );
              return customTemplate ?? defaultTemplate;
            }

            return defaultTemplate;
          }, [message, templatesMap, templates]);

          let bubbleAlignment: MessageBubbleAlignmentType = useMemo(() => {
            return getAlignment(message);
          }, [getAlignment]);

          const ContentView = useMemo(() => {
            return hasTemplate?.ContentView?.(message, bubbleAlignment);
          }, [hasTemplate, message, bubbleAlignment]);

          const HeaderView = useMemo(() => {
            return hasTemplate?.HeaderView
              ? hasTemplate?.HeaderView(message, bubbleAlignment)
              : !isThreaded
                ? getHeaderView(message)
                : undefined;
          }, [message, bubbleAlignment, hasTemplate, getHeaderView]);

          const FooterView = useMemo(() => {
            return hasTemplate?.FooterView
              ? hasTemplate?.FooterView(message, bubbleAlignment)
              : isThreaded
                ? undefined
                : getFooterView(message, bubbleAlignment);
          }, [hasTemplate, isThreaded, getFooterView, message, bubbleAlignment]);

          const ThreadedView = useMemo(() => {
            return !isThreaded
              ? !message.getDeletedBy()
                ? getThreadView(message, bubbleAlignment)
                : undefined
              : undefined;
          }, [isThreaded, message, getThreadView, bubbleAlignment]);

          const LeadingView = useMemo(() => {
            return !isThreaded ? getLeadingView(message) : undefined;
          }, [isThreaded, message, getLeadingView]);

          const BottomView = useMemo(() => {
            return hasTemplate?.BottomView && hasTemplate?.BottomView(message, bubbleAlignment);
          }, [hasTemplate, message, bubbleAlignment]);

          const StatusInfoView = useMemo(() => {
            return hasTemplate?.StatusInfoView &&
              hasTemplate?.StatusInfoView(message, bubbleAlignment)
              ? hasTemplate?.StatusInfoView(message, bubbleAlignment)
              : getStatusInfoView(message, bubbleAlignment, currentIndex);
          }, [hasTemplate, message, bubbleAlignment, currentIndex, getStatusInfoView]);

          if (hasTemplate) {
            if (hasTemplate?.BubbleView) return hasTemplate?.BubbleView(message);

            const onLongPress = useCallback(() => {
              if (message.getDeletedBy() != null) return;
              setSelectedMessage(message);
              hasTemplate && openOptionsForMessage(message, hasTemplate);
            }, [hasTemplate, message, openOptionsForMessage]);

            const onPress = useCallback(() => {
              Keyboard.dismiss();
            }, []);

            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={Platform.OS === "ios" ? onPress : undefined}
                onLongPress={() => (showOptions ? onLongPress() : undefined)}
              >
                <CometChatMessageBubble
                  id={`${message.getId()}`}
                  LeadingView={LeadingView}
                  HeaderView={HeaderView}
                  FooterView={FooterView}
                  alignment={isThreaded ? "left" : bubbleAlignment}
                  ContentView={ContentView}
                  ThreadView={ThreadedView}
                  BottomView={BottomView}
                  StatusInfoView={StatusInfoView}
                  style={getCurrentBubbleStyle(message)}
                />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
        [
          mergedTheme,
          templates,
          templatesMap,
          getCurrentBubbleStyle,
          getThreadView,
          getFooterView,
          getLeadingView,
          getAlignment,
        ]
      );

      const getSentAtTimestamp = useCallback((item: any) => {
        return item.getSentAt() ? item.getSentAt() * 1000 : Date.now();
      }, []);

      const reactToMessage = (emoji: string, messageObj?: CometChat.BaseMessage) => {
        const msgObj = CommonUtils.clone(messageObj) || CommonUtils.clone(selectedMessage);

        const messageId = msgObj?.getId();
        const reactions = msgObj?.getReactions() || [];
        const emojiObject = reactions?.find((reaction: any) => {
          return reaction?.reaction == emoji;
        });
        if (emojiObject && emojiObject?.getReactedByMe()) {
          const updatedReactions: any[] = [];
          reactions.forEach((reaction: any) => {
            if (reaction?.getReaction() == emoji) {
              if (reaction?.getCount() === 1) {
                return;
              } else {
                reaction.setCount(reaction?.getCount() - 1);
                reaction.setReactedByMe(false);
                updatedReactions.push(reaction);
              }
            } else {
              updatedReactions.push(reaction);
            }
          });

          const newMessageObj = CommonUtils.clone(msgObj);
          newMessageObj.setReactions(updatedReactions);

          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageEdited, {
            message: newMessageObj,
            status: messageStatus.success,
          });
          CometChat.removeReaction(messageId, emoji)
            .then((message: any) => {})
            .catch((error: any) => {
              CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageEdited, {
                message: msgObj,
                status: messageStatus.success,
              });
              console.log(error);
            });
        } else {
          const updatedReactions: any[] = [];
          const reactionAvailable = reactions.find((reaction: any) => {
            return reaction?.getReaction() == emoji;
          });
          reactions.forEach((reaction: any) => {
            if (reaction?.getReaction() == emoji) {
              reaction.setCount(reaction?.getCount() + 1);
              reaction.setReactedByMe(true);
              updatedReactions.push(reaction);
            } else {
              updatedReactions.push(reaction);
            }
          });
          if (!reactionAvailable) {
            const react: CometChat.ReactionCount = new CometChat.ReactionCount(emoji, 1, true);
            updatedReactions.push(react);
          }

          const newMessageObj = CommonUtils.clone(msgObj);

          newMessageObj.setReactions(updatedReactions);

          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageEdited, {
            message: newMessageObj,
            status: messageStatus.success,
          });

          CometChat.addReaction(messageId, emoji)
            .then((response: any) => {})
            .catch((error: any) => {
              console.log(error);
              CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageEdited, {
                message: msgObj,
                status: messageStatus.success,
              });
            });
        }

        setShowMessageOptions([]);
      };

      const RenderMessageItem = useCallback(
        ({ item, theme }: { item: CometChat.BaseMessage; theme: CometChatTheme }) => {
          const index = useMemo(() => {
            return messagesContentListRef.current.findIndex(
              (msg) => msg.getId() === item.getId() || msg.getMuid() === item.getMuid()
            );
          }, [item]);

          const separatorView = useMemo(() => {
            const previousMessageDate = messagesContentListRef.current[index + 1]
              ? new Date(getSentAtTimestamp(messagesContentListRef.current[index + 1]))
              : null;
            const currentMessageDate = new Date(getSentAtTimestamp(item));
            const currentDate = isNaN(currentMessageDate.getDate())
              ? undefined
              : `${currentMessageDate.getDate()}-${currentMessageDate.getMonth()}-${currentMessageDate.getFullYear()}`;

            const previousDate = `${previousMessageDate?.getDate()}-${previousMessageDate?.getMonth()}-${previousMessageDate?.getFullYear()}`;
            if (currentDate !== undefined && previousDate !== currentDate) {
              return (
                <View style={{ marginBottom: 10 }}>
                  <CometChatDateSeparator
                    timeStamp={getSentAtTimestamp(item)}
                    pattern={"dayDateFormat"}
                    customDateString={
                      dateSeparatorPattern ? dateSeparatorPattern(item.getSentAt()) : undefined
                    }
                    style={theme.messageListStyles.dateSeparatorStyle}
                  />
                </View>
              );
            }
            return null;
          }, [item, dateSeparatorPattern, theme]);

          lastMessageDate.current = getSentAtTimestamp(item);

          return (
            <React.Fragment key={index}>
              {separatorView}
              <MessageView message={item} currentIndex={index} />
            </React.Fragment>
          );
        },
        [mergedTheme]
      );

      const keyExtractor = useCallback((item: any) => `${item?.getId()}_${item.getMuid()}`, []);

      const itemSeparator = useCallback(() => <View style={{ height: 8 }} />, []);

      const getEmptyStateView = useCallback(() => {
        if (EmptyView)
          return (
            <>
              <ScrollView contentContainerStyle={{}}>{EmptyView()}</ScrollView>
            </>
          );
        return (
          <ErrorEmptyView
            containerStyle={
              (mergedTheme.messageListStyles.emptyStateStyle?.containerStyle ??
                mergedTheme?.messageListStyles.containerStyle) as ViewStyle
            }
            titleStyle={mergedTheme.messageListStyles.emptyStateStyle?.textStyle as TextStyle}
          />
        );
      }, [mergedTheme]);

      const getErrorStateView = useCallback(() => {
        if (hideError) return null;
        if (ErrorView) return ErrorView();
        return (
          <ErrorEmptyView
            title={"Oops!"}
            subTitle={localize("SOMETHING_WENT_WRONG")}
            tertiaryTitle={localize("WRONG_TEXT_TRY_AGAIN")}
            Icon={
              <Icon
                name='error-state'
                size={mergedTheme.spacing.spacing.s15 * 2}
                icon={mergedTheme.messageListStyles.errorStateStyle?.icon}
                height={mergedTheme.messageListStyles.errorStateStyle?.iconStyle?.height}
                width={mergedTheme.messageListStyles.errorStateStyle?.iconStyle?.width}
                imageStyle={mergedTheme.messageListStyles.errorStateStyle?.iconStyle}
                containerStyle={mergedTheme.messageListStyles.errorStateStyle?.iconContainerStyle}
              />
            }
            containerStyle={mergedTheme.messageListStyles.errorStateStyle?.containerStyle}
            titleStyle={mergedTheme.messageListStyles.errorStateStyle?.titleStyle}
            subTitleStyle={mergedTheme.messageListStyles.errorStateStyle?.subtitleStyle}
          />
        );
      }, [mergedTheme]);

      const getLoadingStateView = useCallback(() => {
        if (LoadingView) return LoadingView();

        return (
          <View style={{ padding: 16 }}>
            <MessageSkeleton />
          </View>
        );
      }, []);

      const handleScroll = (event: any) => {
        if (loadingMessagesRef.current) {
          return;
        }
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        if (
          Math.floor(contentOffset.y) >= Math.floor(contentSize.height - layoutMeasurement.height)
        ) {
          getPreviousMessages();
          //messageListRef.current?.scrollToOffset({offset: contentOffset.y})
        }
        scrollHandler(event);
      };

      const shouldShowScrollToBottomButton = useCallback((event: any) => {
        const { contentOffset, contentSize } = event.nativeEvent;

        currentScrollPosition.current.y = contentOffset.y;
        currentScrollPosition.current.contentHeight = contentSize.height;
        setHideScrollToBottomButton(isNearBottom());
      }, []);

      const scrollHandler = (event: any) => {
        /********************************************************************************
             * layoutMeasurement.height: The height of the visible area within the ScrollView.
             * contentOffset.y: The current vertical scroll position (distance from the top of the content).
                                The y value in contentOffset indicates how far the top edge of the visible area is from the top of the scrollable content.
                                The x value (if applicable) indicates how far the left edge of the visible area is from the left of the scrollable content.
                                For example:
                                   If contentOffset.y is 0, the top of the visible area is aligned with the top of the content.
                                   If contentOffset.y is 50, the top of the visible area is 50 units (pixels) below the top of the content.
             * contentSize.height: The total height of the scrollable content.
            *********************************************************************************/
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const screenHeight = Dimensions.get("window").height;

        // Calculate the scroll position
        const scrollPosition = layoutMeasurement.height + contentOffset.y;
        const scrollEndPosition = contentSize.height - screenHeight;

        currentScrollPosition.current.y = contentOffset.y;
        currentScrollPosition.current.contentHeight = contentSize.height;

        if (currentScrollPosition.current.layoutHeight != layoutMeasurement.height) {
          currentScrollPosition.current.layoutHeight = layoutMeasurement.height;
        }
        if (currentScrollPosition.current.scrollViewHeight !== contentSize.height) {
          currentScrollPosition.current.scrollViewHeight = contentSize.height;
        }

        // if (isAtBottom() || isNearBottom()) {
        //   newMsgIndicatorPressed();
        // }
      };

      const scrollToBottom = useCallback((scrollToFirstUnread = false) => {
        messageListRef.current?.scrollToOffset({ offset: 0 });
      }, []);

      // const windowSize = useMemo(() => {
      //   return messagesList.length > 50 ? messagesList.length / 2 : 21;
      // }, [messagesList]);

      const memoizedRenderItem = useCallback(
        ({ item, index, separators }: any) => (
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
            <RenderMessageItem item={item} theme={mergedTheme} />
            {itemSeparator()}
          </View>
        ),
        [mergedTheme]
      );

      return (
        <View style={mergedTheme.messageListStyles.containerStyle}>
          {listState == "loading" && messagesList.length == 0 ? (
            getLoadingStateView()
          ) : listState == "error" ? (
            getErrorStateView()
          ) : listState == "" ? (
            messagesList.length == 0 ? (
              getEmptyStateView()
            ) : (
              <View style={{ height: "100%", width: "100%" }}>
                {HeaderView && (
                  <View style={[{ top: 0 }]}>
                    <HeaderView
                      group={group}
                      user={user}
                      id={{
                        guid: group && (group as any)["guid"],
                        uid: user && (user as any)["uid"],
                        parentMessageId: parentMessageId,
                      }}
                    />
                  </View>
                )}
                {loadingMessages && (
                  <View style={{ position: "absolute", alignSelf: "center" }}>
                    <ActivityIndicator size='small' color={mergedTheme.color.primary} />
                  </View>
                )}

                <FlatList
                  showsVerticalScrollIndicator={false}
                  ref={messageListRef}
                  onMomentumScrollEnd={handleScroll}
                  onScroll={shouldShowScrollToBottomButton}
                  inverted={true}
                  scrollEventThrottle={16}
                  keyboardShouldPersistTaps={Platform.OS === "ios" ? "handled" : "always"}
                  data={messagesList}
                  keyExtractor={keyExtractor}
                  renderItem={memoizedRenderItem}
                  /**Please do not push changes to windowSize without testing infinite scroll and UI interactions and response time**/
                  /**Test the same on release mode. Dev mode could be laggy**/
                  windowSize={33}
                />

                {CustomListHeader && <CustomListHeader />}
                {ongoingCallView}
                {FooterView && (
                  <View style={[{ bottom: 0 }]}>
                    <FooterView
                      group={group}
                      user={user}
                      id={{
                        guid: group && (group as any)["guid"],
                        uid: user && (user as any)["uid"],
                        parentMessageId: parentMessageId,
                      }}
                    />
                  </View>
                )}
              </View>
            )
          ) : null}

          {!hideScrollToBottomButton && (
            <Pressable
              onPress={newMsgIndicatorPressed}
              style={[mergedTheme.messageListStyles.scrollToBottomButtonStyle.containerStyle]}
            >
              {unreadCount > 0 && (
                <CometChatBadge
                  style={
                    mergedTheme.messageListStyles.scrollToBottomButtonStyle.unreadCountBadgeStyle
                  }
                  count={unreadCount}
                />
              )}

              <Icon
                name='keyboard-arrow-down'
                color={mergedTheme.messageListStyles.scrollToBottomButtonStyle.iconStyle.tintColor}
                height={mergedTheme.messageListStyles.scrollToBottomButtonStyle.iconStyle.height}
                width={mergedTheme.messageListStyles.scrollToBottomButtonStyle.iconStyle.width}
                icon={mergedTheme.messageListStyles.scrollToBottomButtonStyle.icon}
                imageStyle={mergedTheme.messageListStyles.scrollToBottomButtonStyle.iconStyle}
                containerStyle={
                  mergedTheme.messageListStyles.scrollToBottomButtonStyle.iconContainerStyle
                }
              ></Icon>
            </Pressable>
          )}

          <CometChatConfirmDialog
            titleText={localize("DELETE_THIS_MESSAGE")}
            icon={<Icon name='delete' size={theme.spacing.spacing.s12} color={theme.color.error} />}
            cancelButtonText={localize("CANCEL")}
            confirmButtonText={localize("DELETE")}
            messageText={localize("DELETE_MESSAGE_CONFIRM")}
            isOpen={showDeleteModal}
            // onDismiss={()=>console.log(deleteItem.current, "CometChatConfirmDialog  onDismiss")}
            onCancel={() => {
              deleteItem.current = undefined;
              setShowDeleteModal(false);
            }}
            onConfirm={() => {
              deleteMessage(deleteItem.current!);
            }}
          />

          <CometChatBottomSheet
            ref={bottomSheetRef}
            onClose={() => {
              if (ExtensionsComponent) setExtensionsComponent(null);
              setShowMessageOptions([]);
              infoObject.current = null;
              setMessageInfo(false);
            }}
            onDismiss={() => {
              // console.log(deleteItem.current, "CometChatBottomSheet  onDismiss")
              Platform.OS === "ios" && deleteItem.current && setShowDeleteModal(true);
            }}
            isOpen={showMessageOptions.length > 0 || Boolean(ExtensionsComponent) || messageInfo}
            style={{
              paddingHorizontal: 0,
              maxHeight: messageInfo
                ? Dimensions.get("window").height * 0.9
                : Dimensions.get("window").height * 0.52,

              minHeight: Dimensions.get("window").height * 0.5,
            }}
          >
            {ExtensionsComponent ? (
              ExtensionsComponent
            ) : messageInfo && infoObject.current ? (
              <CometChatMessageInformation
                message={infoObject.current}
                template={templatesMap.get(
                  `${infoObject.current?.getCategory()}_${infoObject.current?.getType()}`
                )}
                onBack={() => {
                  infoObject.current = null;
                  setMessageInfo(false);
                }}
                style={mergedTheme?.messageListStyles?.messageInformationStyles}
              />
            ) : (
              <View style={{ flex: 1 }}>
                {!hideReactionOption && (
                  <CometChatQuickReactions
                    quickReactions={quickReactionList}
                    onReactionPress={reactToMessage}
                    onAddReactionPress={
                      onAddReactionPress ??
                      (() => {
                        setShowMessageOptions([]);
                        setTimeout(() => {
                          setShowEmojiKeyboard(true);
                        }, 200);
                      })
                    }
                    style={mergedTheme.quickReactionStyle}
                  />
                )}

                <CometChatActionSheet
                  actions={showMessageOptions}
                  style={mergedTheme.messageListStyles.messageOptionsStyles}
                />
              </View>
            )}
          </CometChatBottomSheet>
          <CometChatBottomSheet
            isOpen={showEmojiKeyboard}
            onClose={() => setShowEmojiKeyboard(false)}
            style={{
              maxHeight: Dimensions.get("window").height * 0.49,
            }}
          >
            <CometChatEmojiKeyboard
              onClick={(item) => {
                setShowEmojiKeyboard(false);
                reactToMessage(item, selectedMessage);
              }}
            />
          </CometChatBottomSheet>

          <CometChatBottomSheet
            isOpen={showReactionList}
            onClose={() => {
              setShowReactionList(false);
              setSelectedEmoji(undefined);
            }}
            style={{
              maxHeight: Dimensions.get("window").height * 0.7,
              minHeight: Dimensions.get("window").height * 0.3,
            }}
          >
            <CometChatReactionList
              message={selectedMessage}
              selectedReaction={selectedEmoji}
              onPress={onReactionListItemPressProp}
              reactionsRequestBuilder={reactionsRequestBuilder}
              onListEmpty={() => {
                setShowReactionList(false);
                setSelectedEmoji(undefined);
              }}
            />
          </CometChatBottomSheet>
        </View>
      );
    }
  )
);
