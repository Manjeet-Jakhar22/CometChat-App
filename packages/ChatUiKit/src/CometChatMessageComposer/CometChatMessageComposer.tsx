import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  ColorValue,
  Dimensions,
  Image,
  ImageSourcePropType,
  ImageStyle,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Modal,
  NativeModules,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  View,
  ViewStyle,
} from "react-native";
import {
  CometChatActionSheet,
  CometChatBottomSheet,
  CometChatMentionsFormatter,
  CometChatMessageInput,
  CometChatMessagePreview,
  CometChatSuggestionList,
  CometChatTextFormatter,
  CometChatUIKit,
  CometChatUrlsFormatter,
  localize,
  SuggestionItem,
} from "../shared";
import { Style } from "./styles";
//@ts-ignore
import { CheckPropertyExists } from "../shared/helper/functions";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { ChatConfigurator, CometChatSoundManager } from "../shared";
import { commonVars } from "../shared/base/vars";
import {
  ConversationOptionConstants,
  MentionsTargetElement,
  MentionsVisibility,
  MessageTypeConstants,
  ReceiverTypeConstants,
  ViewAlignment,
} from "../shared/constants/UIKitConstants";
import { MessageEvents } from "../shared/events";
import { CometChatUIEventHandler } from "../shared/events/CometChatUIEventHandler/CometChatUIEventHandler";
import { CometChatMessageComposerAction, DeepPartial } from "../shared/helper/types";
import { Icon } from "../shared/icons/Icon";
import {
  getUnixTimestampInMilliseconds,
  messageStatus,
} from "../shared/utils/CometChatMessageHelper";
import { CommonUtils } from "../shared/utils/CommonUtils";
import { permissionUtil } from "../shared/utils/PermissionUtil";
import { CometChatMediaRecorder } from "../shared/views/CometChatMediaRecorder";
import { useTheme } from "../theme";
import { ICONS } from "./resources";
import { CometChatTheme } from "../theme/type";
import { deepMerge } from "../shared/helper/helperFunctions";
import { JSX } from "react";

const { FileManager, CommonUtil } = NativeModules;

const uiEventListenerShow = "uiEvent_show_" + new Date().getTime();
const uiEventListenerHide = "uiEvent_hide_" + new Date().getTime();

const MessagePreviewTray = (props: any) => {
  const { shouldShow = false, text = "", onClose = () => {} } = props;
  return shouldShow ? (
    <CometChatMessagePreview
      messagePreviewTitle={localize("EDIT_MESSAGE")}
      messagePreviewSubtitle={text}
      closeIconURL={ICONS.CLOSE}
      onCloseClick={onClose}
    />
  ) : null;
};

const ImageButton = (props: any) => {
  const { image, onClick, buttonStyle, imageStyle, disable } = props;
  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : undefined}
      onPress={disable ? () => {} : onClick}
      style={buttonStyle}
    >
      <Image source={image} style={[{ height: 24, width: 24 }, imageStyle]} />
    </TouchableOpacity>
  );
};

const AttachIconButton = (props: {
  onPress: TouchableWithoutFeedbackProps["onPress"];
  icon: ImageSourcePropType | JSX.Element;
  iconStyle: ImageStyle;
}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name='add-circle'
        icon={props.icon}
        color={props.iconStyle.tintColor}
        height={props.iconStyle.height}
        width={props.iconStyle.width}
        imageStyle={props.iconStyle}
      />
    </TouchableOpacity>
  );
};

const ActionSheetBoard = (props: any) => {
  const { shouldShow = false, onClose = () => {}, options = [], sheetRef, style } = props;
  return (
    <CometChatBottomSheet
      style={{ maxHeight: Dimensions.get("window").height * 0.49 }}
      ref={sheetRef}
      onClose={onClose}
      isOpen={shouldShow}
    >
      <CometChatActionSheet actions={options} style={style} />
    </CometChatBottomSheet>
  );
};

const RecordAudio = (props: any) => {
  const {
    shouldShow = false,
    onClose = () => {},
    options = [],
    cometChatBottomSheetStyle = {},
    sheetRef,
    onPause = () => {},
    onPlay = () => {},
    onSend = (recordedFile: String) => {},
    onStop = (recordedFile: String) => {},
    onStart = () => {},
    mediaRecorderStyle,
    ...otherProps
  } = props;
  return (
    <CometChatBottomSheet
      ref={sheetRef}
      onClose={onClose}
      style={cometChatBottomSheetStyle}
      isOpen={shouldShow}
    >
      <CometChatMediaRecorder
        onClose={onClose}
        onPause={onPause}
        onPlay={onPlay}
        onSend={onSend}
        onStop={onStop}
        onStart={onStart}
        style={mediaRecorderStyle}
      />
    </CometChatBottomSheet>
  );
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

/**
 * Properties for the CometChat message composer component.
 */
export interface CometChatMessageComposerInterface {
  /**
   * Message composer identifier.
   *
   * @type {string | number}
   */
  id?: string | number;

  /**
   * CometChat SDK’s user object.
   *
   * @type {CometChat.User}
   */
  user?: CometChat.User;

  /**
   * CometChat SDK’s group object.
   *
   * @type {CometChat.Group}
   */
  group?: CometChat.Group;

  /**
   * Flag to turn off sound for outgoing messages.
   *
   * @type {boolean}
   */
  disableSoundForOutgoingMessages?: boolean;

  /**
   * Custom audio sound to be played while sending messages.
   *
   * @type {*}
   */
  customSoundForOutgoingMessage?: any;

  /**
   * Flag to disable typing events.
   *
   * @type {boolean}
   */
  disableTypingEvents?: boolean;

  /**
   * Initial text to be displayed in the composer.
   *
   * @type {string}
   */
  initialComposertext?: string;

  /**
   * Renders a preview section at the top of the composer.
   *
   * @param {Object} props - The component properties.
   * @param {CometChat.User} [props.user] - The user object.
   * @param {CometChat.Group} [props.group] - The group object.
   * @returns {JSX.Element} The header view element.
   */
  HeaderView?: ({ user, group }: { user?: CometChat.User; group?: CometChat.Group }) => JSX.Element;

  /**
   * Callback triggered when the input text changes.
   *
   * @param {string} text - The updated text.
   */
  onTextChange?: (text: string) => void;

  /**
   * Returns the attachment options for the composer.
   *
   * @param {Object} props - The function properties.
   * @param {CometChat.User} [props.user] - The user object.
   * @param {CometChat.Group} [props.group] - The group object.
   * @param {Map<any, any>} props.composerId - The composer identifier as a Map.
   * @returns {CometChatMessageComposerAction[]} An array of composer actions.
   */
  attachmentOptions?: ({
    user,
    group,
    composerId,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
    composerId: Map<any, any>;
  }) => CometChatMessageComposerAction[];

  /**
   * Replaces the default Auxiliary Button.
   *
   * @param {Object} props - The function properties.
   * @param {CometChat.User} [props.user] - The user object.
   * @param {CometChat.Group} [props.group] - The group object.
   * @param {string | number} props.composerId - The composer identifier.
   * @returns {JSX.Element} A custom auxiliary button component.
   */
  AuxiliaryButtonView?: ({
    user,
    group,
    composerId,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
    composerId: string | number;
  }) => JSX.Element;

  /**
   * Replaces the default Send Button.
   *
   * @param {Object} props - The function properties.
   * @param {CometChat.User} [props.user] - The user object.
   * @param {CometChat.Group} [props.group] - The group object.
   * @param {string | number} props.composerId - The composer identifier.
   * @returns {JSX.Element} A custom send button component.
   */
  SendButtonView?: ({
    user,
    group,
    composerId,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
    composerId: string | number;
  }) => JSX.Element;

  /**
   * Message id required for threaded messages.
   *
   * @type {string | number}
   */
  parentMessageId?: string | number;

  /**
   * Custom styles for the message composer component.
   */
  style?: DeepPartial<CometChatTheme["messageComposerStyles"]>;

  /**
   * Flag to hide the voice recording button.
   *
   * @type {boolean}
   */
  hideVoiceRecordingButton?: boolean;

  /**
   * Callback triggered when the send button is pressed.
   *
   * @param {CometChat.BaseMessage} message - The base message object.
   */
  onSendButtonPress?: (message: CometChat.BaseMessage) => void;

  /**
   * Callback triggered when an error occurs.
   *
   * @param {CometChat.CometChatException} error - The error object.
   */
  onError?: (error: CometChat.CometChatException) => void;

  /**
   * Override properties for the KeyboardAvoidingView.
   */
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;

  /**
   * Collection of text formatter classes to apply custom formatting.
   *
   * @type {Array<CometChatMentionsFormatter | CometChatUrlsFormatter | CometChatTextFormatter>}
   */
  textFormatters?: Array<
    CometChatMentionsFormatter | CometChatUrlsFormatter | CometChatTextFormatter
  >;

  /**
   * Flag to disable mention functionality.
   */
  disableMentions?: boolean;

  /**
   * Controls image quality when taking pictures from the camera.
   * A value of 100 means no compression.
   *
   * @default 20
   * @type {IntRange<1, 100>}
   */
  imageQuality?: IntRange<1, 100>;

  /**
   * If true, hides the camera option from the attachment options.
   */
  hideCameraOption?: boolean;

  /**
   * If true, hides the image attachment option from the attachment options.
   */
  hideImageAttachmentOption?: boolean;

  /**
   * If true, hides the video attachment option from the attachment options.
   */
  hideVideoAttachmentOption?: boolean;

  /**
   * If true, hides the audio attachment option from the attachment options.
   */
  hideAudioAttachmentOption?: boolean;

  /**
   * If true, hides the file/document attachment option from the attachment options.
   */
  hideFileAttachmentOption?: boolean;

  /**
   * If true, hides the polls option from the attachment options.
   */
  hidePollsAttachmentOption?: boolean;

  /**
   * If true, hides the collaborative document option (e.g., shared document editing).
   */
  hideCollaborativeDocumentOption?: boolean;

  /**
   * If true, hides the collaborative whiteboard option.
   */
  hideCollaborativeWhiteboardOption?: boolean;

  /**
   * If true, hides the entire attachment button from the composer.
   */
  hideAttachmentButton?: boolean;

  /**
   * If true, hides the stickers button from the composer.
   */
  hideStickersButton?: boolean;

  /**
   * If true, hides the send button from the composer.
   */
  hideSendButton?: boolean;

  /**
   * If true, hides all auxiliary buttons (such as voice input, GIFs, or other plugin buttons).
   */
  hideAuxiliaryButtons?: boolean;
  /**
   * Returns the attachment options for the composer.
   *
   * @param {Object} props - The function properties.
   * @param {CometChat.User} [props.user] - The user object.
   * @param {CometChat.Group} [props.group] - The group object.
   * @param {Map<any, any>} props.composerId - The composer identifier as a Map.
   * @returns {CometChatMessageComposerAction[]} An array of composer actions.
   */
  addAttachmentOptions?: ({
    user,
    group,
    composerId,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
    composerId: Map<any, any>;
  }) => CometChatMessageComposerAction[];
  /**
   * Determines the alignment of auxiliary buttons (e.g., sticker button).
   * Can be either "left" or "right".
   *
   * @default "left"
   */
  auxiliaryButtonsAlignment?: "left" | "right";
}

export const CometChatMessageComposer = React.forwardRef(
  (props: CometChatMessageComposerInterface, ref) => {
    const editMessageListenerID = "editMessageListener_" + new Date().getTime();
    const UiEventListenerID = "UiEventListener_" + new Date().getTime();

    const theme = useTheme();
    const {
      id,
      user,
      group,
      disableSoundForOutgoingMessages = true,
      customSoundForOutgoingMessage,
      disableTypingEvents,
      initialComposertext,
      HeaderView,
      onTextChange,
      attachmentOptions,
      AuxiliaryButtonView,
      SendButtonView,
      parentMessageId,
      style = {},
      onSendButtonPress,
      onError,
      hideVoiceRecordingButton,
      keyboardAvoidingViewProps,
      textFormatters,
      disableMentions,
      imageQuality = 20,
      hideCameraOption = false,
      hideImageAttachmentOption = false,
      hideVideoAttachmentOption = false,
      hideAudioAttachmentOption = false,
      hideFileAttachmentOption = false,
      hidePollsAttachmentOption = false,
      hideCollaborativeDocumentOption = false,
      hideCollaborativeWhiteboardOption = false,
      hideAttachmentButton = false,
      hideStickersButton = false,
      hideSendButton = false,
      hideAuxiliaryButtons = false,
      addAttachmentOptions,
      auxiliaryButtonsAlignment = "left",
    } = props;

    const composerIdMap = new Map().set("parentMessageId", parentMessageId);

    const mergedComposerStyle: CometChatTheme["messageComposerStyles"] = useMemo(() => {
      return deepMerge(theme.messageComposerStyles, style);
    }, [theme, style]);

    const defaultAuxiliaryButtonOptions = useMemo(() => {
      if (hideAuxiliaryButtons) return [];
      return ChatConfigurator.getDataSource().getAuxiliaryOptions(user, group, composerIdMap, {
        stickerIcon: mergedComposerStyle.stickerIcon as ImageSourcePropType | JSX.Element,
        stickerIconStyle: mergedComposerStyle.stickerIconStyle as {
          active: ImageStyle;
          inactive: ImageStyle;
        },
        hideStickersButton,
      });
    }, [mergedComposerStyle, hideStickersButton, hideAuxiliaryButtons]);

    const loggedInUser = React.useRef<any>({});
    const chatWith = React.useRef<any>(null);
    const chatWithId = React.useRef<any>(null);
    const messageInputRef = React.useRef<any>(null);
    const chatRef = React.useRef<any>(chatWith);
    const inputValueRef = React.useRef<any>(null);
    const plainTextInput = React.useRef<string>(initialComposertext || "");
    let mentionMap = React.useRef<Map<string, SuggestionItem>>(new Map());
    let trackingCharacters = React.useRef<string[]>([]);
    let allFormatters = React.useRef<
      Map<string, CometChatTextFormatter | CometChatMentionsFormatter>
    >(new Map());
    let activeCharacter = React.useRef("");
    let searchStringRef = React.useRef("");

    const [selectionPosition, setSelectionPosition] = React.useState<any>({});
    const [inputMessage, setInputMessage] = React.useState<string | JSX.Element>(
      initialComposertext || ""
    );
    const [showActionSheet, setShowActionSheet] = React.useState(false);
    const [showRecordAudio, setShowRecordAudio] = React.useState(false);
    const [actionSheetItems, setActionSheetItems] = React.useState<any[]>([]);
    const [messagePreview, setMessagePreview] = React.useState<any>();
    const [CustomView, setCustomView] = React.useState(null);
    const [CustomViewHeader, setCustomViewHeader] = React.useState<React.FC | React.ReactNode>(
      null
    );
    const [CustomViewFooter, setCustomViewFooter] = React.useState<React.FC | React.ReactNode>();
    const [isVisible, setIsVisible] = React.useState(false);
    const [kbOffset, setKbOffset] = React.useState(59);
    const [showMentionList, setShowMentionList] = React.useState(false);
    const [mentionsSearchData, setMentionsSearchData] = React.useState<Array<SuggestionItem>>([]);
    const [suggestionListLoader, setSuggestionListLoader] = React.useState(false);
    const [warningMessage, setWarningMessage] = React.useState("");
    const [originalText, setOriginalText] = React.useState<string>("");
    const [hasEdited, setHasEdited] = React.useState<boolean>(false);
    const [plainText, setPlainText] = React.useState(initialComposertext ?? "");

    const bottomSheetRef = React.useRef<any>(null);

    useLayoutEffect(() => {
      if (Platform.OS === "ios") {
        if (Number.isInteger(commonVars.safeAreaInsets.top)) {
          setKbOffset(commonVars.safeAreaInsets.top ?? 0);
          return;
        }
        CommonUtil.getSafeAreaInsets().then((res: any) => {
          if (Number.isInteger(res.top)) {
            commonVars.safeAreaInsets.top = res.top;
            commonVars.safeAreaInsets.bottom = res.bottom;
            setKbOffset(res.top);
          }
        });
      }
    }, []);

    const isTyping = useRef<NodeJS.Timeout | null>(null);

    /**
     * Event callback
     */
    React.useImperativeHandle(ref, () => ({
      previewMessageForEdit: previewMessage,
    }));

    useLayoutEffect(() => {
      if (warningMessage) {
        setCustomViewHeader(
          <View
            style={
              {
                flexDirection: "row",
                alignItems: "center",
                padding: theme.spacing.padding.p2,
                borderRadius: mergedComposerStyle?.containerStyle?.borderRadius,
                backgroundColor: mergedComposerStyle?.containerStyle?.backgroundColor,
                borderColor: mergedComposerStyle?.containerStyle?.borderColor,
                borderWidth: mergedComposerStyle?.containerStyle?.borderWidth,
                marginBottom: 2,
              } as ViewStyle
            }
          >
            <Icon name='info-fill' color={theme.color.error}></Icon>
            <Text
              style={{
                marginLeft: 5,
                color: theme.color.error,
                ...theme.typography.caption1.regular,
              }}
            >
              {warningMessage}
            </Text>
          </View>
        );
        return;
      }
      setCustomViewHeader(null);
    }, [warningMessage, theme]);

    const previewMessage = ({ message, status }: any) => {
      if (status === messageStatus.inprogress) {
        let textComponents = message?.text;

        let rawText = message?.text;

        let users: any = {};
        let regexes: Array<RegExp> = [];

        allFormatters.current.forEach((formatter: CometChatTextFormatter, key) => {
          formatter.handleComposerPreview(message);
          if (!regexes.includes(formatter.getRegexPattern())) {
            regexes.push(formatter.getRegexPattern());
          }
          let suggestionUsers = formatter.getSuggestionItems();
          suggestionUsers.forEach((item) => (users[item.underlyingText] = item));
          let resp = formatter.getFormattedText(textComponents);
          if (formatter instanceof CometChatMentionsFormatter) {
            getMentionLimitView(formatter);
          }

          textComponents = resp;
        });

        let edits: any = [];

        regexes.forEach((regex) => {
          let match: any;
          while ((match = regex.exec(rawText)) !== null) {
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
        edits.sort((a: any, b: any) => a.startIndex - b.startIndex);

        plainTextInput.current = getPlainString(message?.text, edits);
        setPlainText(plainTextInput.current);
        setOriginalText(plainTextInput.current.trim());  
        setHasEdited(false);
        const hashMap = new Map();
        let offset = 0; // Tracks shift in position due to replacements

        edits.forEach((edit: any) => {
          const adjustedStartIndex = edit.startIndex + offset;
          rawText =
            rawText.substring(0, adjustedStartIndex) +
            edit.replacement +
            rawText.substring(edit.endIndex);
          offset += edit.replacement.length - (edit.endIndex - edit.startIndex);
          const rangeKey = `${adjustedStartIndex}_${adjustedStartIndex + edit.replacement.length}`;
          hashMap.set(rangeKey, edit.user);
        });

        mentionMap.current = hashMap;
        setMessagePreview({
          message: { ...message, text: textComponents },
          mode: ConversationOptionConstants.edit,
        });

        inputValueRef.current = textComponents ?? "";
        setInputMessage(textComponents ?? "");
        messageInputRef.current.focus();
      }
    };

    const cameraCallback = async (cameraImage: any) => {
      if (CheckPropertyExists(cameraImage, "error")) {
        return;
      }
      const { name, uri, type } = cameraImage;
      let file = {
        name,
        type,
        uri,
      };
      sendMediaMessage(chatWithId.current, file, MessageTypeConstants.image, chatWith.current);
    };

    const fileInputHandler = async (fileType: string) => {
      if (fileType === MessageTypeConstants.takePhoto) {
        if (!(await permissionUtil.startResourceBasedTask(["camera"]))) {
          return;
        }
        let quality = imageQuality;
        if (isNaN(imageQuality) || imageQuality < 1 || imageQuality > 100) {
          quality = 20;
        }
        if (Platform.OS === "android") {
          FileManager.openCamera(fileType, Math.round(quality), cameraCallback);
        } else {
          FileManager.openCamera(fileType, cameraCallback);
        }
      } else if (Platform.OS === "ios" && fileType === MessageTypeConstants.video) {
        NativeModules.VideoPickerModule.pickVideo((file: any) => {
          if (file.uri)
            sendMediaMessage(
              chatWithId.current,
              file,
              MessageTypeConstants.video,
              chatWith.current
            );
        });
      } else
        FileManager.openFileChooser(fileType, async (fileInfo: any) => {
          if (CheckPropertyExists(fileInfo, "error")) {
            return;
          }
          let { name, uri, type } = fileInfo;
          let file = {
            name,
            type,
            uri,
          };
          sendMediaMessage(chatWithId.current, file, fileType, chatWith.current);
        });
    };

    const playAudio = () => {
      if (customSoundForOutgoingMessage) {
        CometChatSoundManager.play(
          CometChatSoundManager.SoundOutput.outgoingMessage,
          customSoundForOutgoingMessage
        );
      } else {
        CometChatSoundManager.play(CometChatSoundManager.SoundOutput.outgoingMessage);
      }
    };

    const clearInputBox = () => {
      inputValueRef.current = "";
      setPlainText("");
      setHasEdited(false);
      setInputMessage("");
      setWarningMessage("");
    };

    const sendTextMessage = () => {
      //ignore sending new message
      if (messagePreview != null) {
        editMessage(messagePreview.message);
        return;
      }

      let finalTextInput = getRegexString(plainTextInput.current);
      // Trim the trailing spaces and store in a variable
      let trimmedTextInput = finalTextInput.trim();

      // Create the text message with the trimmed text
      let textMessage = new CometChat.TextMessage(
        chatWithId.current,
        trimmedTextInput,
        chatWith.current
      );

      textMessage.setSender(loggedInUser.current);
      textMessage.setReceiver(chatWith.current);
      // Use the trimmed text here as well
      textMessage.setText(trimmedTextInput);
      textMessage.setMuid(String(getUnixTimestampInMilliseconds()));
      parentMessageId && textMessage.setParentMessageId(parentMessageId as number);

      allFormatters.current.forEach((item) => {
        textMessage = item.handlePreMessageSend(textMessage);
      });

      setMentionsSearchData([]);
      plainTextInput.current = "";

      if (trimmedTextInput.trim().length === 0) {
        return;
      }

      clearInputBox();

      if (onSendButtonPress) {
        onSendButtonPress(textMessage);
        return;
      }

      CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageSent, {
        message: textMessage,
        status: messageStatus.inprogress,
      });

      if (!disableSoundForOutgoingMessages) playAudio();

      CometChat.sendMessage(textMessage)
        .then((message: any) => {
          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageSent, {
            message: message,
            status: messageStatus.success,
          });
        })
        .catch((error: any) => {
          onError && onError(error);
          textMessage.setMetadata({ error: true });
          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageSent, {
            message: textMessage,
            status: messageStatus.error,
          });
          clearInputBox();
        });
    };

    /** edit message */
    const editMessage = (message: any) => {
      endTyping(null, null);

      let finalTextInput = getRegexString(plainTextInput.current);

      let messageText = finalTextInput.trim();
      let textMessage = new CometChat.TextMessage(
        chatWithId.current,
        messageText,
        chatWith.current
      );
      textMessage.setId(message.id);
      parentMessageId && textMessage.setParentMessageId(parentMessageId as number);

      inputValueRef.current = "";
      clearInputBox();
      messageInputRef.current.textContent = "";

      setMessagePreview(null);

      if (onSendButtonPress) {
        onSendButtonPress(textMessage);
        return;
      }

      if (!disableSoundForOutgoingMessages) playAudio();

      CometChat.editMessage(textMessage)
        .then((editedMessage: any) => {
          inputValueRef.current = "";
          setInputMessage("");
          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageEdited, {
            message: editedMessage,
            status: messageStatus.success,
          });
        })
        .catch((error: any) => {
          onError && onError(error);
        });
    };

    /** send media message */
    const sendMediaMessage = (
      receiverId?: any,
      messageInput?: any,
      messageType?: any,
      receiverType?: any
    ) => {
      setShowActionSheet(false);
      let mediaMessage = new CometChat.MediaMessage(
        receiverId,
        messageInput,
        messageType,
        receiverType
      );

      mediaMessage.setSender(loggedInUser.current);
      mediaMessage.setReceiver(receiverType);
      mediaMessage.setType(messageType);
      mediaMessage.setMuid(String(getUnixTimestampInMilliseconds()));
      mediaMessage.setData({
        type: messageType,
        category: CometChat.CATEGORY_MESSAGE,
        name: messageInput["name"],
        file: messageInput,
        url: messageInput["uri"],
        sender: loggedInUser.current,
      });
      parentMessageId && mediaMessage.setParentMessageId(parentMessageId as number);

      let localMessage = new CometChat.MediaMessage(
        receiverId,
        messageInput,
        messageType,
        receiverType
      );

      localMessage.setSender(loggedInUser.current);
      localMessage.setReceiver(receiverType);
      localMessage.setType(messageType);
      localMessage.setMuid(String(getUnixTimestampInMilliseconds()));
      localMessage.setData({
        type: messageType,
        category: CometChat.CATEGORY_MESSAGE,
        name: messageInput["name"],
        file: messageInput,
        url: messageInput["uri"],
        sender: loggedInUser.current,
      });
      parentMessageId && localMessage.setParentMessageId(parentMessageId as number);
      localMessage.setData({
        type: messageType,
        category: CometChat.CATEGORY_MESSAGE,
        name: messageInput["name"],
        file: messageInput,
        url: messageInput["uri"],
        sender: loggedInUser.current,
        attachments: [messageInput],
      });

      CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageSent, {
        message: localMessage,
        status: messageStatus.inprogress,
      });

      if (!disableSoundForOutgoingMessages) playAudio();
      CometChat.sendMediaMessage(mediaMessage)
        .then((message: any) => {
          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageSent, {
            message: message,
            status: messageStatus.success,
          });
          setShowRecordAudio(false);
        })
        .catch((error: any) => {
          setShowRecordAudio(false);
          onError && onError(error);
          localMessage.setMetadata({ error: true });
          CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageSent, {
            message: localMessage,
            status: messageStatus.error,
          });
          console.log("media message sent error", error);
        });
    };

    const startTyping = (endTypingTimeout?: any, typingMetadata?: any) => {
      //if typing is disabled
      if (disableTypingEvents) {
        return false;
      }

      //if typing is in progress, clear the previous timeout and set new timeout
      if (isTyping.current) {
        clearTimeout(isTyping.current);
        isTyping.current = null;
      } else {
        let metadata = typingMetadata || undefined;

        let typingNotification = new CometChat.TypingIndicator(
          chatWithId.current,
          chatWith.current,
          metadata
        );
        CometChat.startTyping(typingNotification);
      }

      let typingInterval = endTypingTimeout || 500;
      isTyping.current = setTimeout(() => {
        endTyping(null, typingMetadata);
      }, typingInterval);
      return false;
    };

    const endTyping = (event: any, typingMetadata: any) => {
      if (event) {
        event.persist();
      }

      if (disableTypingEvents) {
        return false;
      }

      let metadata = typingMetadata || undefined;

      let typingNotification = new CometChat.TypingIndicator(
        chatWithId.current,
        chatWith.current,
        metadata
      );
      CometChat.endTyping(typingNotification);

      clearTimeout(isTyping.current!);
      isTyping.current = null;
      return false;
    };

    const SecondaryButtonViewElem = useMemo(() => {
      if (hideAttachmentButton || !actionSheetItems.length) return <></>;
      return (
        <AttachIconButton
          onPress={() => setShowActionSheet(true)}
          icon={mergedComposerStyle.attachmentIcon as JSX.Element | ImageSourcePropType}
          iconStyle={mergedComposerStyle.attachmentIconStyle as ImageStyle}
        />
      );
    }, [mergedComposerStyle]);

    const RecordAudioButtonView = ({
      icon,
      iconStyle,
    }: {
      icon: JSX.Element | ImageSourcePropType;
      iconStyle?: ImageStyle;
    }) => {
      return (
        <TouchableOpacity onPress={() => setShowRecordAudio(true)}>
          <Icon
            name='mic'
            height={24}
            width={24}
            icon={icon}
            color={iconStyle?.tintColor ?? theme.color.iconSecondary}
            imageStyle={iconStyle}
          />
        </TouchableOpacity>
      );
    };

    const voiceRecoringButtonElem = useMemo(() => {
      return hideVoiceRecordingButton ? undefined : (
        <RecordAudioButtonView
          icon={mergedComposerStyle.voiceRecordingIcon as ImageSourcePropType | JSX.Element}
          iconStyle={mergedComposerStyle.voiceRecordingIconStyle as ImageStyle}
        />
      );
    }, [hideVoiceRecordingButton, mergedComposerStyle]);

    const AuxiliaryButtonViewElem = useCallback(() => {
      if (AuxiliaryButtonView)
        return <AuxiliaryButtonView user={user} group={group} composerId={id!} />;
      else if (defaultAuxiliaryButtonOptions)
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.spacing.s2,
            }}
          >
            {defaultAuxiliaryButtonOptions}
          </View>
        );

      return <></>;
    }, [defaultAuxiliaryButtonOptions]);

    const SendButtonViewElem = useCallback(() => {
      if (hideSendButton) return <></>;
      if (SendButtonView) return <SendButtonView user={user} group={group} composerId={id!} />;
      const disabled = plainText.trim().length === 0 || (messagePreview && !hasEdited);
      return (
        <TouchableOpacity
          onPress={sendTextMessage}
          style={[
            {
              borderRadius: theme.spacing.radius.max,
              padding: 4,
              backgroundColor: disabled ? theme.color.background4 : theme.color.fabButtonBackground,
            },
            mergedComposerStyle.sendIconContainerStyle as ViewStyle,
          ]}
          disabled={disabled}
        >
          <Icon
            name='send-fill'
            icon={mergedComposerStyle.sendIcon as ImageSourcePropType | JSX.Element}
            color={
              (mergedComposerStyle.sendIconStyle?.tintColor ??
                theme.color.fabButtonIcon) as ColorValue
            }
            imageStyle={mergedComposerStyle.sendIconStyle as ImageStyle}
            height={24}
            width={24}
          />
        </TouchableOpacity>
      );
    }, [mergedComposerStyle, inputMessage, plainText, messagePreview, hasEdited]);

    //fetch logged in user
    useEffect(() => {
      CometChat.getLoggedinUser().then((user) => (loggedInUser.current = user));
      let _formatter = [...(textFormatters || [])];

      if (!disableMentions) {
        let mentionsFormatter = ChatConfigurator.getDataSource().getMentionsFormatter();
        mentionsFormatter.setLoggedInUser(CometChatUIKit.loggedInUser!);
        mentionsFormatter.setMentionsStyle(
          mergedComposerStyle.mentionsStyle as CometChatTheme["mentionsStyle"]
        );
        mentionsFormatter.setTargetElement(MentionsTargetElement.textinput);

        if (user) mentionsFormatter.setUser(user);
        if (group) mentionsFormatter.setGroup(group);

        _formatter.unshift(mentionsFormatter);
      }

      _formatter.forEach((formatter) => {
        formatter.setComposerId(id!);
        if (user) formatter.setUser(user);
        if (group) formatter.setGroup(group);
        let trackingCharacter = formatter.getTrackingCharacter();
        trackingCharacters.current.push(trackingCharacter);

        let newFormatter = CommonUtils.clone(formatter);
        allFormatters.current.set(trackingCharacter, newFormatter);
      });
    }, []);

    useEffect(() => {
      //update receiver user
      if (user && user.getUid()) {
        chatRef.current = {
          chatWith: ReceiverTypeConstants.user,
          chatWithId: user.getUid(),
        };
        chatWith.current = ReceiverTypeConstants.user;
        chatWithId.current = user.getUid();
      } else if (group && group.getGuid()) {
        chatRef.current = {
          chatWith: ReceiverTypeConstants.group,
          chatWithId: group.getGuid(),
        };
        chatWith.current = ReceiverTypeConstants.group;
        chatWithId.current = group.getGuid();
      }
    }, [user, group, chatRef]);

    const handleOnClick = (CustomView: any) => {
      let view = CustomView(
        user,
        group,
        {
          uid: user?.getUid(),
          guid: group?.getGuid(),
          parentMessageId: parentMessageId,
        },
        {
          onClose: () => setIsVisible(false),
        }
      );
      bottomSheetRef.current?.togglePanel();
      setShowActionSheet(false);
      setTimeout(() => {
        setCustomView(() => view);
        setIsVisible(true);
      }, 200);
    };

    useEffect(() => {
      const defaultAttachmentOptions = ChatConfigurator.dataSource.getAttachmentOptions(
        theme,
        user,
        group,
        composerIdMap,
        {
          hideCameraOption,
          hideImageAttachmentOption,
          hideVideoAttachmentOption,
          hideAudioAttachmentOption,
          hideFileAttachmentOption,
          hidePollsAttachmentOption,
          hideCollaborativeDocumentOption,
          hideCollaborativeWhiteboardOption,
        }
      );
      setActionSheetItems(() =>
        attachmentOptions && typeof attachmentOptions === "function"
          ? attachmentOptions({ user, group, composerId: composerIdMap })?.map((item) => {
              if (typeof item.CustomView === "function")
                return {
                  ...item,
                  onPress: () => handleOnClick(item.CustomView),
                };
              if (typeof item.onPress == "function")
                return {
                  ...item,
                  onPress: () => {
                    setShowActionSheet(false);
                    item.onPress?.(user, group);
                  },
                };
              return {
                ...item,
                onPress: () => fileInputHandler(item.id),
              };
            })
          : [
              ...defaultAttachmentOptions.map((item: any) => {
                if (typeof item.CustomView === "function")
                  return {
                    ...item,
                    onPress: () => handleOnClick(item.CustomView),
                  };
                if (typeof item.onPress === "function")
                  return {
                    ...item,
                    onPress: () => {
                      setShowActionSheet(false);
                      item.onPress?.(user, group);
                    },
                  };
                return {
                  ...item,
                  onPress: () => fileInputHandler(item.id),
                };
              }),
              ...(addAttachmentOptions && typeof addAttachmentOptions === "function"
                ? addAttachmentOptions({ user, group, composerId: composerIdMap })?.map((item) => {
                    if (typeof item.CustomView === "function")
                      return {
                        ...item,
                        onPress: () => handleOnClick(item.CustomView),
                      };
                    if (typeof item.onPress == "function")
                      return {
                        ...item,
                        onPress: () => {
                          setShowActionSheet(false);
                          item.onPress?.(user, group);
                        },
                      };
                    return {
                      ...item,
                      onPress: () => fileInputHandler(item.id),
                    };
                  })
                : []),
            ]
      );
    }, [
      user,
      group,
      id,
      parentMessageId,
      hideCameraOption,
      hideImageAttachmentOption,
      hideVideoAttachmentOption,
      hideAudioAttachmentOption,
      hideFileAttachmentOption,
      hidePollsAttachmentOption,
      hideCollaborativeDocumentOption,
      hideCollaborativeWhiteboardOption,
      addAttachmentOptions,
    ]);

    useEffect(() => {
      CometChatUIEventHandler.addMessageListener(editMessageListenerID, {
        ccMessageEdited: (item: any) => {
          const incomingParentId = item?.message?.getParentMessageId?.() ?? null;
          const myParentId = parentMessageId ?? null;

          if (incomingParentId === myParentId) {
            previewMessage(item);
          }
        },
      });
      CometChatUIEventHandler.addUIListener(UiEventListenerID, {
        ccToggleBottomSheet: (item) => {
          if (item?.bots) {
            // let newAiOptions = _getAIOptions(item.bots);
            // setAIOptionItems(newAiOptions);
            // setShowAIOptions(true);
            return;
          } else if (item?.botView) {
            setCustomView(() => item.child);
            return;
          }
          setIsVisible(false);
          bottomSheetRef.current?.togglePanel();
        },
        ccComposeMessage: (text) => {
          setIsVisible(false);
          bottomSheetRef.current?.togglePanel();

          inputValueRef.current = text?.text;
          setInputMessage(text?.text);
        },
        ccSuggestionData(item: { id: string | number; data: Array<SuggestionItem> }) {
          if (activeCharacter.current && id === item?.id) {
            const warningView = getMentionLimitView();
            if (warningView) {
              return;
            }
            setMentionsSearchData(item?.data);
            setSuggestionListLoader(false);
          }
        },
      });
      return () => {
        CometChatUIEventHandler.removeMessageListener(editMessageListenerID);
        CometChatUIEventHandler.removeUIListener(UiEventListenerID);
      };
    }, []);

    const handlePannel = (item: any) => {
      if (item.child) {
        if (item.alignment === ViewAlignment.composerTop) setCustomViewHeader(() => item.child);
        else if (item.alignment === ViewAlignment.composerBottom)
          setCustomViewFooter(() => item.child);
      } else {
        if (item.alignment === ViewAlignment.composerTop) setCustomViewHeader(null);
        else if (item.alignment === ViewAlignment.composerBottom) setCustomViewFooter(undefined);
      }
    };

    useEffect(() => {
      CometChatUIEventHandler.addUIListener(uiEventListenerShow, {
        showPanel: (item) => handlePannel(item),
      });
      CometChatUIEventHandler.addUIListener(uiEventListenerHide, {
        hidePanel: (item) => handlePannel(item),
      });
      return () => {
        CometChatUIEventHandler.removeUIListener(uiEventListenerShow);
        CometChatUIEventHandler.removeUIListener(uiEventListenerHide);
      };
    }, []);

    const _sendRecordedAudio = (recordedFile: String) => {
      let fileObj = {
        name: "audio-recording" + recordedFile.split("/audio-recording")[1],
        type: "audio/mp4",
        uri: recordedFile,
      };
      console.log("fileObj", fileObj);
      sendMediaMessage(chatWithId.current, fileObj, MessageTypeConstants.audio, chatWith.current);
      console.log("Send Audio");
    };

    function isCursorWithinMentionRange(mentionRanges: any, cursorPosition: number) {
      for (let [range, mention] of mentionRanges) {
        const [start, end] = range.split("_").map(Number);
        if (cursorPosition >= start && cursorPosition <= end) {
          return true; // Cursor is within the range of a mention
        }
      }
      return false; // No mention found at the cursor position
    }

    function shouldOpenList(
      selection: {
        start: number;
        end: number;
      },
      searchString: string,
      tracker: string
    ) {
      return (
        selection.start === selection.end &&
        !isCursorWithinMentionRange(mentionMap.current, selection.start - searchString.length) &&
        trackingCharacters.current.includes(tracker) &&
        (searchString === ""
          ? (plainTextInput.current[selection.start - 2]?.length === 1 &&
              plainTextInput.current[selection.start - 2]?.trim()?.length === 0) ||
            plainTextInput.current[selection.start - 2] === undefined
          : true) &&
        (plainTextInput.current[selection.start - 1]?.length === 1 &&
        plainTextInput.current[selection.start - 1]?.trim()?.length === 0
          ? searchString.length > 0
          : true)
      );
    }

    let timeoutId: NodeJS.Timeout;
    const openList = (selection: { start: number; end: number }) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        let searchString = extractTextFromCursor(plainTextInput.current, selection.start);
        let tracker = searchString
          ? plainTextInput.current[selection.start - (searchString.length + 1)]
          : plainTextInput.current[selection.start - 1];

        if (shouldOpenList(selection, searchString, tracker)) {
          activeCharacter.current = tracker;
          searchStringRef.current = searchString;
          setShowMentionList(true);

          let formatter = allFormatters.current.get(tracker);
          if (formatter instanceof CometChatMentionsFormatter) {
            let shouldShowMentionList =
              formatter.getVisibleIn() === MentionsVisibility.both ||
              (formatter.getVisibleIn() === MentionsVisibility.usersConversationOnly && user) ||
              (formatter.getVisibleIn() === MentionsVisibility.groupsConversationOnly && group);
            if (shouldShowMentionList) {
              formatter?.search(searchString);
            }
          } else {
            formatter?.search(searchString);
          }
        } else {
          activeCharacter.current = "";
          searchStringRef.current = "";
          setShowMentionList(false);
          setMentionsSearchData([]);
        }
      }, 100);
    };

    const getRegexString = (str: string) => {
      // Get an array of the entries in the map using the spread operator
      const entries = [...mentionMap.current.entries()].reverse();

      let uidInput = str;

      // Iterate over the array in reverse order
      entries.forEach(([key, value]) => {
        let [start, end] = key.split("_").map(Number);

        let pre = uidInput.substring(0, start);
        let post = uidInput.substring(end);

        uidInput = pre + value.underlyingText + post;
      });

      return uidInput;
    };

    const getPlainString = (
      str: string,
      edits: Array<{
        endIndex: number;
        replacement: string;
        startIndex: number;
        user: SuggestionItem;
      }>
    ) => {
      // Get an array of the entries in the map using the spread operator
      const entries = [...edits].reverse();

      let _plainString = str;

      // Iterate over the array in reverse order
      entries.forEach(({ endIndex, replacement, startIndex, user }) => {
        let pre = _plainString.substring(0, startIndex);
        let post = _plainString.substring(endIndex);

        _plainString = pre + replacement + post;
      });

      return _plainString;
    };

    const textChangeHandler = (txt: string) => {
      setPlainText(txt);
      if (messagePreview) {
        setHasEdited(txt.trim() !== originalText.trim());
      }
      let removing = plainTextInput.current?.length ?? 0 > txt.length;
      let adding = plainTextInput.current?.length < txt.length;
      let textDiff = txt.length - (plainTextInput.current?.length ?? 0);
      let notAtLast = selectionPosition.start + textDiff < txt.length;

      plainTextInput.current = txt;
      onTextChange && onTextChange(txt);
      startTyping();

      let decr = 0;

      let newMentionMap: any = new Map(mentionMap.current);

      mentionMap.current.forEach((value, key) => {
        let position = { start: parseInt(key.split("_")[0]), end: parseInt(key.split("_")[1]) };

        //Runs when cursor before the mention and before the last position

        if (
          notAtLast &&
          (selectionPosition.start - 1 <= position.start ||
            selectionPosition.start - textDiff <= position.start)
        ) {
          if (removing) {
            decr = selectionPosition.end - selectionPosition.start - textDiff;
            position = { start: position.start - decr, end: position.end - decr };
          } else if (adding) {
            decr = selectionPosition.end - selectionPosition.start + textDiff;
            position = { start: position.start + decr, end: position.end + decr };
          }
          if (removing || adding) {
            let newKey = `${position.start}_${position.end}`;
            position.start >= 0 && newMentionMap.set(newKey, value);
            newMentionMap.delete(key);
          }
        }

        // Code to delete mention from hashmap 👇
        let expctedMentionPos = plainTextInput.current?.substring(position.start, position.end);

        if (expctedMentionPos !== `${value.promptText}`) {
          let newKey = `${position.start}_${position.end}`;
          newMentionMap.delete(newKey);

          if (!ifIdExists(value.id, newMentionMap)) {
            let targetedFormatter = allFormatters.current.get(value.trackingCharacter!);
            if (!targetedFormatter) return;
            let existingCCUsers = [...targetedFormatter.getSuggestionItems()];
            let userPosition = existingCCUsers.findIndex(
              (item: SuggestionItem) => item.id === value.id
            );
            if (userPosition !== -1) {
              existingCCUsers.splice(userPosition, 1);
              (targetedFormatter as CometChatMentionsFormatter).setSuggestionItems(existingCCUsers);
            }
            if (targetedFormatter instanceof CometChatMentionsFormatter) {
              let showWarning = getMentionLimitView(targetedFormatter);
              if (!showWarning) {
                setWarningMessage("");
              }
            }
          }
        }
      });

      mentionMap.current = newMentionMap;

      setFormattedInputMessage();
    };

    const onMentionPress = (item: SuggestionItem) => {
      setShowMentionList(false);
      setMentionsSearchData([]);

      let notAtLast = selectionPosition.start < (plainTextInput.current?.length ?? 0);

      let textDiff =
        (plainTextInput.current?.length ?? 0) +
        (item.promptText?.length ?? 0) -
        searchStringRef.current.length -
        (plainTextInput.current?.length ?? 0);

      let incr = 0;
      let mentionPos = 0;

      let newMentionMap = new Map(mentionMap.current);

      let targetedFormatter = allFormatters.current.get(activeCharacter.current);
      if (!targetedFormatter) return;
      let existingCCUsers = [...targetedFormatter.getSuggestionItems()];
      let userAlreadyExists = existingCCUsers.find(
        (existingUser: SuggestionItem) => existingUser.id === item.id
      );
      if (!userAlreadyExists) {
        let cometchatUIUserArray: Array<SuggestionItem> = [...existingCCUsers];
        cometchatUIUserArray.push(item);
        (targetedFormatter as CometChatMentionsFormatter).setSuggestionItems(cometchatUIUserArray);
      }
      mentionMap.current.forEach((value, key) => {
        let position = { start: parseInt(key.split("_")[0]), end: parseInt(key.split("_")[1]) };

        if (!(selectionPosition.start <= position.start)) {
          mentionPos += 1;
        }

        // Code to delete mention from hashmap 👇
        if (
          position.end === selectionPosition.end ||
          (selectionPosition.start > position.start && selectionPosition.end <= position.end)
        ) {
          let newKey = `${position.start}_${position.end}`;
          newMentionMap.delete(newKey);
          mentionPos -= 1;
        }

        if (notAtLast && selectionPosition.start - 1 <= position.start) {
          incr = selectionPosition.end - selectionPosition.start + textDiff;
          let newKey = `${position.start + incr}_${position.end + incr}`;
          newMentionMap.set(newKey, value);
          newMentionMap.delete(key);
        }
      });
      mentionMap.current = newMentionMap;

      // When updating the input text, just get the latest plain text input and replace the selected text with the new mention
      const updatedPlainTextInput = `${plainTextInput.current?.substring(
        0,
        selectionPosition.start - (1 + searchStringRef.current.length)
      )}${item.promptText + " "}${plainTextInput.current?.substring(
        selectionPosition.end,
        plainTextInput.current?.length
      )}`;
      plainTextInput.current = updatedPlainTextInput;

      let key =
        selectionPosition.start -
        (1 + searchStringRef.current.length) +
        "_" +
        (selectionPosition.start -
          (searchStringRef.current.length + 1) +
          (item.promptText?.length ?? 0));

      let updatedMap = insertMentionAt(mentionMap.current, mentionPos, key, {
        ...item,
        trackingCharacter: activeCharacter.current,
      });
      mentionMap.current = updatedMap;
      setSelectionPosition({
        start:
          selectionPosition.start -
          (searchStringRef.current.length + 1) +
          (item.promptText?.length ?? 0),
        end:
          selectionPosition.start -
          (searchStringRef.current.length + 1) +
          (item.promptText?.length ?? 0),
      });
      setFormattedInputMessage();
    };

    const setFormattedInputMessage = () => {
      let textComponents: any = getRegexString(plainTextInput.current);

      allFormatters.current.forEach((formatter: CometChatTextFormatter, key) => {
        let resp = formatter.getFormattedText(textComponents);
        textComponents = resp;
      });

      inputValueRef.current = textComponents;
      setInputMessage(textComponents);
    };

    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function extractTextFromCursor(inputText: string, cursorPosition: number) {
      const leftText = inputText.substring(0, cursorPosition);

      // Escape the mentionPrefixes to safely use them in a regex pattern
      const escapedPrefixes = trackingCharacters.current.map(escapeRegExp).join("|");

      // Build a dynamic regex pattern that matches any of the mention prefixes.
      // This pattern will match a prefix followed by any combination of word characters
      // and spaces, including a trailing space.
      const mentionRegex = new RegExp(
        `(?:^|\\s)(${escapedPrefixes})([^${escapedPrefixes}\\s][^${escapedPrefixes}]*)$`
      );
      const match = leftText.match(mentionRegex);

      // If a match is found, return the first capturing group, which is the username
      return (match && substringUpToNthSpace(match[2], 4)) || "";
    }

    function substringUpToNthSpace(str: string, n: number) {
      // Split the string by spaces, slice to the (n-1) elements, and then rejoin with spaces
      return str.split(" ", n).join(" ");
    }

    const insertMentionAt = (
      mentionMap: Map<string, SuggestionItem>,
      insertAt: number,
      key: string,
      value: SuggestionItem
    ): Map<string, SuggestionItem> => {
      // Convert the hashmap to an array of [key, value] pairs
      let mentionsArray = Array.from(mentionMap);

      // Insert the new mention into the array at the calculated index
      mentionsArray.splice(insertAt, 0, [key, value]);

      return new Map(mentionsArray);
    };

    /**
     * Function to check if the id exists in the mentionMap
     */
    const ifIdExists = (id: string, hashmap: Map<string, SuggestionItem>) => {
      let exists = false;
      hashmap.forEach((value, key) => {
        if (value.id === id) {
          exists = true;
        }
      });
      return exists;
    };

    const onSuggestionListEndReached = () => {
      let targetedFormatter = allFormatters.current.get(activeCharacter.current);
      if (!targetedFormatter) return;
      let fetchingNext = targetedFormatter.fetchNext();
      fetchingNext !== null && setSuggestionListLoader(true);
    };

    const getMentionLimitView = (targettedFormatterParam?: CometChatMentionsFormatter) => {
      let targetedFormatter =
        allFormatters.current.get(activeCharacter.current) ?? targettedFormatterParam;
      if (!(targetedFormatter instanceof CometChatMentionsFormatter)) {
        return false;
      }
      let shouldWarn;
      let limit;
      if (targetedFormatter?.getLimit && targetedFormatter?.getLimit()) {
        limit = targetedFormatter?.getLimit();
        if (
          targetedFormatter.getUniqueUsersList &&
          targetedFormatter.getUniqueUsersList()?.size >= limit
        ) {
          shouldWarn = true;
        }
      }
      if (!shouldWarn) {
        setWarningMessage("");
        return false;
      }
      setWarningMessage(
        targetedFormatter?.getErrorString
          ? targetedFormatter?.getErrorString()
          : `${localize("MENTION_UPTO")} ${limit} ${
              limit === 1 ? localize("TIME") : localize("TIMES")
            } ${localize("AT_A_TIME")}.`
      );
      return true;
    };

    return (
      <>
        {/* {!isVisible && typeof CustomView === "function" && <CustomView />} TODOM */}
        <Modal
          transparent={true}
          // animationType='slide'
          visible={isVisible}
          onRequestClose={() => {
            setIsVisible(false);
          }}
        >
          {CustomView && CustomView}
        </Modal>
        <KeyboardAvoidingView
          key={id}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.select({ ios: kbOffset })}
          {...keyboardAvoidingViewProps}
        >
          <View
            style={[
              Style.container,
              {
                paddingTop: CustomViewHeader ? theme.spacing.padding.p0 : theme.spacing.padding.p2,
                paddingHorizontal: theme.spacing.padding.p2,
              },
              {
                backgroundColor: theme.messageListStyles.containerStyle.backgroundColor,
              },
              mergedComposerStyle.containerStyle as ViewStyle,
            ]}
          >
            <ActionSheetBoard
              sheetRef={bottomSheetRef}
              options={actionSheetItems}
              shouldShow={showActionSheet}
              onClose={() => setShowActionSheet(false)}
              style={mergedComposerStyle.attachmentOptionsStyles}
            />
            <RecordAudio
              sheetRef={bottomSheetRef}
              options={actionSheetItems}
              shouldShow={showRecordAudio}
              onClose={() => {
                setShowRecordAudio(false);
              }}
              cometChatBottomSheetStyle={{
                maxHeight: Dimensions.get("window").height * 0.4,
              }}
              onSend={_sendRecordedAudio}
              mediaRecorderStyle={mergedComposerStyle.mediaRecorderStyle}
            />

            {mentionsSearchData.length > 0 && (plainTextInput.current?.length ?? 0) > 0 && (
              <View
                style={[
                  theme.mentionsListStyle.containerStyle,
                  messagePreview ? { maxHeight: Dimensions.get("window").height * 0.2 } : {},
                ]}
              >
                <CometChatSuggestionList
                  data={mentionsSearchData}
                  listStyle={theme.mentionsListStyle}
                  onPress={onMentionPress}
                  onEndReached={onSuggestionListEndReached}
                  loading={suggestionListLoader}
                />
              </View>
            )}

            <View
              style={[
                { flexDirection: "column" },
                mentionsSearchData.length
                  ? { maxHeight: Dimensions.get("window").height * 0.2 }
                  : { maxHeight: Dimensions.get("window").height * 0.3 },
              ]}
            >
              {HeaderView
                ? HeaderView({ user, group })
                : CustomViewHeader &&
                  (typeof CustomViewHeader === "function" ? (
                    <CustomViewHeader /> // Invoke CustomViewHeader if it's a functional component
                  ) : (
                    CustomViewHeader // Render it directly if it's a React node
                  ))}
              <MessagePreviewTray
                onClose={() => {
                  setMessagePreview(null);
                  clearInputBox();
                  mentionMap.current = new Map();
                  plainTextInput.current = "";
                  setOriginalText("");
                }}
                text={messagePreview?.message?.text}
                shouldShow={messagePreview != null}
              />
            </View>
            <CometChatMessageInput
              messageInputRef={messageInputRef}
              text={inputMessage as string}
              placeHolderText={localize("ENTER_YOUR_MESSAGE_HERE")}
              style={mergedComposerStyle.messageInputStyles}
              onSelectionChange={({ nativeEvent: { selection } }) => {
                setSelectionPosition(selection);
                openList(selection);
              }}
              onChangeText={textChangeHandler}
              VoiceRecordingButtonView={voiceRecoringButtonElem}
              SecondaryButtonView={SecondaryButtonViewElem}
              AuxiliaryButtonView={AuxiliaryButtonViewElem()}
              PrimaryButtonView={SendButtonViewElem}
              auxiliaryButtonAlignment={auxiliaryButtonsAlignment}
            />
            {CustomViewFooter ? (
              // If CustomViewFooter is a function component (React.FC)
              typeof CustomViewFooter === "function" ? (
                <CustomViewFooter /> // Invoke the function component
              ) : (
                CustomViewFooter // Render it directly if it's a React node (JSX or element)
              )
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
);
