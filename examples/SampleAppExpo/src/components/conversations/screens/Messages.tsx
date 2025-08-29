import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  BackHandler,
  Platform,
  Image,
} from "react-native";
import {
  CometChatUIKit,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
  useTheme,
  CometChatUIEventHandler,
  CometChatUIEvents,
  localize,
  ChatConfigurator,
  CometChatUiKitConstants,
  CometChatMessageTemplate,
} from "@cometchat/chat-uikit-react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import InfoIcon from "../../../assets/icons/InfoIcon";
import MessagePin from "../../../assets/icons/MessagePin";
import MessageUnpin from "../../../assets/icons/MessageUnpin";
import { CommonUtils } from "../../../utils/CommonUtils";
import { ChatStackParamList } from "../../../navigation/paramLists";
import FormattingToolbar from "../../../custom/ComposerFormattingToolbar";
import { Icon } from "@cometchat/chat-uikit-react-native";
import { ScrollView } from "react-native-gesture-handler";
import UnsaveIcon from "../../../assets/icons/UnsaveIcon";
import ReminderSvg from "../../../assets/icons/Reminder";
import CalendarComponent from "../../../custom/ReminderCalendarTemplate";
import { getTextFormatters } from "../../../custom/CometChatHTMLFormatter";
import { CometChatDeletedBubble } from "@cometchat/chat-uikit-react-native/src/shared/views/CometChatDeletedBubble";

type Props = StackScreenProps<ChatStackParamList, "Messages">;

const Messages: React.FC<Props> = ({ route, navigation }) => {
  const { user, group: initialGroup } = route.params;
  const [group, setGroup] = useState(initialGroup); 
  const handleGroupUpdate = (updatedGroup: CometChat.Group) => {
    setGroup(updatedGroup);
  };
  const loggedInUser = useRef(CometChatUIKit.loggedInUser!).current;
  const theme = useTheme();
  const userListenerId = "app_messages" + new Date().getTime();
  const openmessageListenerId = "message_" + new Date().getTime();
  const [localUser, setLocalUser] = useState(user);
  const [showPinned, setShowPinned] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<CometChat.BaseMessage[]>([]);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [pinnedRefreshCount, setPinnedRefreshCount] = useState(0);
  const [savedRefreshCount, setSavedRefreshCount] = useState(0);
  const composerRef = useRef<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [reminderMessage, setReminderMessage] = useState<CometChat.BaseMessage | null>(null);
  const [successReminderMessage, setSuccessReminderMessage] = useState<string | null>(null);
  const [formattingToolbarKey, setFormattingToolbarKey] = useState(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (user?.getUid?.() === "cc_reminder_bot") {
        navigation.popToTop();
      }
      return true;
    });
    return () => backHandler.remove();
  }, [navigation, user]);

  useEffect(() => {
    CometChatUIEventHandler.addUserListener(userListenerId, {
      ccUserBlocked: ({ user }) => setLocalUser(CommonUtils.clone(user)),
      ccUserUnBlocked: ({ user }) => setLocalUser(CommonUtils.clone(user)),
    });
    CometChatUIEventHandler.addUIListener(openmessageListenerId, {
      openChat: ({ user }) => {
        if (user?.getUid() !== "cc_reminder_bot") {
          navigation.navigate("Messages", { user });
        }
      },
    });

    return () => {
      CometChatUIEventHandler.removeUserListener(userListenerId);
      CometChatUIEventHandler.removeUIListener(openmessageListenerId);
    };
  }, [localUser]);

  const UNPIN_LISTENER_ID = "unpin_event_listener";

  useEffect(() => {
    CometChatUIEventHandler.addUIListener(UNPIN_LISTENER_ID, {
      ccMessageUnpinned: () => {
        setPinnedRefreshCount((prev) => prev + 1);
      },
    } as any);

    return () => {
      CometChatUIEventHandler.removeUIListener(UNPIN_LISTENER_ID);
    };
  }, []);

  const SAVED_LISTENER_ID = "saved_event_listener";

  useEffect(() => {
    CometChatUIEventHandler.addUIListener(SAVED_LISTENER_ID, {
      ccMessageUnsaved: () => {
        setSavedRefreshCount((prev) => prev + 1);
      },
    } as any);

    return () => {
      CometChatUIEventHandler.removeUIListener(SAVED_LISTENER_ID);
    };
  }, []);

  useEffect(() => {
    fetchPinnedMessages();
  }, [user, group, pinnedRefreshCount]);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.onUnpinTriggered) {
        setPinnedRefreshCount((prev) => prev + 1);
        navigation.setParams({ onUnpinTriggered: false });
      }
    }, [route.params?.onUnpinTriggered])
  );

  useEffect(() => {
    fetchSavedMessages();
  }, [user, group, savedRefreshCount]);

  const fetchPinnedMessages = async () => {
    try {
      const receiverType = user ? CometChat.RECEIVER_TYPE.USER : CometChat.RECEIVER_TYPE.GROUP;
      const receiverId = user ? user.getUid() : group?.getGuid();

      if (!receiverId) return;

      const response = await CometChat.callExtension(
        "pin-message",
        "GET",
        "v1/fetch",
        {
          receiverType,
          receiver: receiverId,
        }
      );

      const typedResponse = response as { pinnedMessages?: any[] };
      const messages = typedResponse.pinnedMessages || [];

      const parsedMessages = messages.map((msg: any) => {
        let constructedMessage;

        switch (msg.category) {
          case CometChat.CATEGORY_MESSAGE:
            if (msg.type === CometChat.MESSAGE_TYPE.TEXT) {
              constructedMessage = new CometChat.TextMessage(
                msg.receiver,
                msg.text ?? msg.data?.text ?? "",
                msg.receiverType
              );
            } else {
              constructedMessage = new CometChat.MediaMessage(
                msg.receiver,
                msg.data?.attachments?.[0] || {},
                msg.receiverType,
                msg.type
              );
            }
            break;

          case CometChat.CATEGORY_CUSTOM:
            constructedMessage = new CometChat.CustomMessage(
              msg.receiver,
              msg.receiverType,
              msg.type
            );
            constructedMessage.setCustomData?.(msg.data);
            break;

          default:
            constructedMessage = new CometChat.BaseMessage(
              msg.receiver,
              msg.type,
              msg.receiverType,
              msg.category
            );
        }

        constructedMessage.setId?.(msg.id);
        constructedMessage.setMuid?.(msg.muid);
        constructedMessage.setSender?.(
          new CometChat.User(msg.data?.entities?.sender?.entity)
        );
        constructedMessage.setReceiver?.(
          msg.receiverType === CometChat.RECEIVER_TYPE.USER
            ? new CometChat.User(msg.data?.entities?.receiver?.entity)
            : new CometChat.Group(msg.data?.entities?.receiver?.entity)
        );
        constructedMessage.setSentAt?.(msg.sentAt);
        constructedMessage.setDeliveredAt?.(msg.deliveredAt || msg.sentAt);
        constructedMessage.setReadAt?.(msg.readAt || 0);

        return constructedMessage;
      });

      setPinnedMessages(parsedMessages);
      setPinnedIds(new Set([...parsedMessages.map((m) => String(m.getId()))]));
    } catch (error: any) {
      console.error("Error fetching pinned messages:", JSON.stringify(error));
    }
  };

  const fetchSavedMessages = async () => {
    try {
      const response = await CometChat.callExtension(
        "save-message",
        "GET",
        "v1/fetch",
        {}
      );
      const saved = (response as { savedMessages?: any[] }).savedMessages || [];
      const savedIdsSet = new Set(saved.map((msg) => String(msg.id)));
      setSavedIds(savedIdsSet);
    } catch (e) {
      console.error("Error fetching saved messages", e);
    }
  };

  const unblock = async (userToUnblock: CometChat.User) => {
    try {
      const uid = userToUnblock.getUid();
      await CometChat.unblockUsers([uid]);
      const unBlockedUser = await CometChat.getUser(uid);
      setLocalUser(unBlockedUser);
      CometChatUIEventHandler.emitUserEvent(CometChatUIEvents.ccUserUnBlocked, { user: unBlockedUser });
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const getTrailingView = () => (
    <View style={styles.appBarContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("PinnedMessages", { user, group, onUnpinTriggered: false, });
        }}
        style={{ marginRight: 12 }}
      >
        <Icon icon={<MessagePin height={24} width={24} />} />
      </TouchableOpacity>
      {group ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("GroupInfo", { group, onGroupUpdate: handleGroupUpdate })}
        >
          <Icon icon={<InfoIcon height={24} width={24} />} />
        </TouchableOpacity>
      ) : user && !user.getBlockedByMe() ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("UserInfo", { user })}
        >
          <Icon icon={<InfoIcon height={24} width={24} />} />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  const pinMessage = async (message: CometChat.BaseMessage) => {
    const id = message.getId?.();
    const receiverType = message.getReceiverType();
    const receiver = message.getReceiverId?.();

    try {
      const res = await CometChat.callExtension("pin-message", "POST", "v1/pin", {
        msgId: String(id),
        receiverType,
        receiver,
      });
      await fetchPinnedMessages();
    } catch (error: any) {
      console.error("Error pinning message:", JSON.stringify(error));
    }
  };
  const unpinMessage = async (message: CometChat.BaseMessage) => {
    const id = String(message.getId?.());
    const receiverType = message.getReceiverType();
    const receiver = message.getReceiverId?.();

    try {
      const res = await CometChat.callExtension("pin-message", "DELETE", "v1/unpin", {
        msgId: id,
        receiverType,
        receiver,
      });

      setPinnedIds((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });

      setPinnedMessages((prevMessages) =>
        prevMessages.filter((msg) => String(msg.getId()) !== id)
      );
    } catch (error: any) {
      if (error?.code === "ERR_MESSAGE_NOT_PINNED") {
        setPinnedIds((prev) => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
        setPinnedMessages((prevMessages) =>
          prevMessages.filter((msg) => String(msg.getId()) !== id)
        );
      } else {
        console.error(" Error unpinning message:", JSON.stringify(error));
      }
    }
  };

  const saveMessage = async (message: CometChat.BaseMessage) => {
    try {
      await CometChat.callExtension("save-message", "POST", "v1/save", {
        msgId: String(message.getId()),
      });
      await fetchSavedMessages();
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const unsaveMessage = async (message: CometChat.BaseMessage) => {
    try {
      await CometChat.callExtension("save-message", "DELETE", "v1/unsave", {
        msgId: String(message.getId()),
      });
      await fetchSavedMessages();
    } catch (error) {
      console.error("Error unsaving message:", error);
    }
  };

  const htmlFormatterInstance = getTextFormatters()[0];

  const templates = useMemo(() => {
    const baseTemplates = ChatConfigurator.getDataSource().getAllMessageTemplates(theme);

    const enhancedTemplates = baseTemplates.map((template) => {
      const clonedTemplate = { ...template };

      if (
        clonedTemplate.type === CometChat.MESSAGE_TYPE.TEXT &&
        clonedTemplate.category === CometChat.CATEGORY_MESSAGE
      ) {
        clonedTemplate.ContentView = (message: CometChat.TextMessage) => {
          if (message.getDeletedAt && message.getDeletedAt() > 0) {
            return <CometChatDeletedBubble />;
          }
          const rawText = message.getText();
          const formatted = htmlFormatterInstance.getFormattedText(rawText);
          return typeof formatted === "string" ? <Text>{formatted}</Text> : formatted;
        };
      }

      const defaultOptions = template.options;
      clonedTemplate.options = (loggedInUser, message, group) => {
        const originalOptions = defaultOptions
          ? defaultOptions(loggedInUser, message, group)
          : [];

        const isPinned = pinnedIds.has(String(message.getId()));
        const isSaved = savedIds.has(String(message.getId()));

        const pinUnpinOption = isPinned
          ? {
            id: "unpin_message",
            title: "Unpin",
            icon: <MessageUnpin height={24} width={24} />,
            onPress: () => unpinMessage(message),
          }
          : {
            id: "pin_message",
            title: "Pin",
            icon: <MessagePin height={24} width={24} />,
            onPress: () => pinMessage(message),
          };

        const saveUnsaveOption = isSaved
          ? {
            id: "unsave_message",
            title: "Unsave",
            icon: <UnsaveIcon width={24} height={24} />,
            onPress: () => unsaveMessage(message),
          }
          : {
            id: "save_message",
            title: "Save",
            icon: <Icon name="bookmark" size={24} />,
            onPress: () => saveMessage(message),
          };

        const setReminderOption = {
          id: "set_reminder",
          title: "Set Reminder",
          icon: <ReminderSvg />,
          onPress: () => {
            setReminderMessage(message);
            setShowCalendar(true);
          },
        };

        return [...originalOptions, pinUnpinOption, saveUnsaveOption, setReminderOption];
      };

      return clonedTemplate;
    });

    const reminderTemplate = new CometChatMessageTemplate({
      type: "extension_reminders",
      category: CometChatUiKitConstants.MessageCategoryConstants.custom,
      ContentView: (message: CometChat.BaseMessage) => {
        const rawCustomData = (message as CometChat.CustomMessage)?.getCustomData?.() as
          | {
            customData?: {
              about?: {
                text?: string;
              };
            };
            about?: {
              text?: string;
              data?: {
                text?: string;
              };
            };
          }
          | undefined;

        const reminderText =
          rawCustomData?.customData?.about?.text ??
          rawCustomData?.about?.text ??
          rawCustomData?.about?.data?.text ??
          "Reminder";

        return (
          <Text>
            You asked me to remind you about {" "}
            <Text style={{ fontWeight: "bold" }}>{reminderText}</Text>
          </Text>
        );
      },
    });

    enhancedTemplates.push(reminderTemplate);

    return enhancedTemplates;
  }, [theme, savedIds, pinnedIds, loggedInUser]);

  const [htmlFormatter] = useState(getTextFormatters() || []);
  const FormattedText = ({ text }: { text: string }) => {
    const formatter = useMemo(() => getTextFormatters()[0], []);
    const result = formatter.getFormattedText(text);
    return typeof result === "string" ? <Text>{result}</Text> : result;
  };
  
  return (
    <View style={styles.flexOne}>
      <CometChatMessageHeader
        key={group?.getName()}
        user={localUser}
        group={group}
        onBack={() => navigation.popToTop()}
        TrailingView={getTrailingView}
        showBackButton
      />
      <View style={styles.flexOne}>
        {showPinned ? (
          <ScrollView style={{ padding: 10 }}>
            {pinnedMessages.length === 0 ? (
              <Text>No pinned messages</Text>
            ) : (
              pinnedMessages.map((msg, idx) => {
                const senderName = msg.getSender()?.getName?.() || "Unknown";
                let content: React.ReactNode = "[Unsupported message type]";

                if (msg instanceof CometChat.TextMessage) {
                  const rawText = msg.getText();
                  content = <FormattedText text={rawText} />;
                } else if (msg instanceof CometChat.MediaMessage) {
                  const attachment = msg.getAttachment();
                  const mediaUrl = (attachment as any)?.url;
                  if (mediaUrl) {
                    content = (
                      <Image
                        source={{ uri: mediaUrl }}
                        style={{ width: 200, height: 200, borderRadius: 6 }}
                      />
                    );
                  } else {
                    content = "[Image not available]";
                  }
                } else if (msg instanceof CometChat.CustomMessage) {
                  if (msg.getType() === "extension_reminders") {
                    const customData = msg.getCustomData?.() as {
                      about?: { data?: { text?: string } };
                    };
                    const reminderText = customData?.about?.data?.text || "[Reminder]";
                    content = (
                      <Text>
                        🔔 Reminder: <Text style={{ fontWeight: "bold" }}>{reminderText}</Text>
                      </Text>
                    );
                  } else {
                    content = `[Custom Message: ${msg.getType()}]`;
                  }
                }

                return (
                  <View
                    key={idx}
                    style={{
                      marginBottom: 10,
                      padding: 10,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                      {senderName}
                    </Text>
                    {typeof content === "string" ? <Text>{content}</Text> : content}
                  </View>
                );
              })
            )}
          </ScrollView>
        ) : (
          <CometChatMessageList
            key={`${[...pinnedIds, ...savedIds].join(",")}`}
            user={user}
            group={group}
            onThreadRepliesPress={(msg) => navigation.navigate("ThreadView", { message: msg, user, group })}
            textFormatters={htmlFormatter}
            templates={templates}
          />
        )}
      </View>
      {localUser?.getBlockedByMe() ? (
        <View style={[styles.blockedContainer, { backgroundColor: theme.color.background3 }]}>
          <Text style={[theme.typography.button.regular, styles.blockedText]}>{localize("BLOCKED_USER_DESC")}</Text>
          <TouchableOpacity onPress={() => unblock(localUser)} style={[styles.button, { borderColor: theme.color.borderDefault }]}>
            <Text style={[theme.typography.button.medium, styles.buttontext, { color: theme.color.textPrimary }]}> {localize("UNBLOCK")} </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CometChatMessageComposer
          ref={composerRef}
          user={localUser}
          group={group}
          keyboardAvoidingViewProps={{ ...(Platform.OS === "android" ? {} : { behavior: "padding" }) }}
          HeaderView={({ user, group }) => (
            <FormattingToolbar key={formattingToolbarKey} />
          )}
        />
      )}
      {showCalendar && (
        <CalendarComponent
          value={new Date()}
          onDateSelect={(date) => {
            if (date && reminderMessage) {
              setShowCalendar(false);

              const timeInMS = date.getTime();
              const selectedMessageId = reminderMessage.getId();

              CometChat.callExtension("reminders", "POST", "v1/reminder", {
                about: selectedMessageId,
                isCustom: false,
                timeInMS,
              })
                .then(async (responseRaw) => {
                  const response = responseRaw as {
                    reminderId: string;
                    about: any;
                    timeInMS: number;
                    isCustom: boolean;
                  };
                  setSuccessReminderMessage("✅ Reminder set successfully!");
                  setTimeout(() => setSuccessReminderMessage(null), 3000);
                })
                .catch((error) => {
                  console.error("❌ Failed to set reminder:", error);
                  setSuccessReminderMessage("Reminder not set, please select time again");
                  setTimeout(() => setSuccessReminderMessage(null), 3000);
                });

              setReminderMessage(null);
            } else {
              console.log("No date or message selected");
              setReminderMessage(null);
            }
          }}

          onClose={() => {
            setShowCalendar(false);
            setReminderMessage(null);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  blockedContainer: {
    alignItems: "center",
    height: 90,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 2,
    width: "90%",
    borderRadius: 8,
  },
  buttontext: {
    paddingVertical: 5,
    textAlign: "center",
    alignContent: "center",
  },
  blockedText: {
    color: "#888",
    textAlign: "center",
    paddingBottom: 10,
  },
  appBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
});

export default Messages;
