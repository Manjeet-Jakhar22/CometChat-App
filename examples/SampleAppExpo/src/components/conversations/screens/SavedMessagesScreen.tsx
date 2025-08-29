import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Linking,
  Platform,
  ActionSheetIOS,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";
import {
  CometChatMessageHeader,
  CometChatAudioBubble,
  CometChatVideoBubble,
  CometChatImageBubble,
  CometChatFileBubble,
  CometChatUIKit,
  CometChatUIEventHandler,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { getTextFormatters } from "../../../custom/CometChatHTMLFormatter";
import CollabIcon from "@cometchat/chat-uikit-react-native/src/shared/icons/components/collaborative-document-icon";
import CollabImage from "../../../assets/icons/collab_doc.png";
import { useNavigation } from "@react-navigation/native";
import { CometChatCollaborativeBubble } from "@cometchat/chat-uikit-react-native/src/extensions/CollaborativeBubble/CometChatCollaborativeBubble";
import { PollsBubble } from "@cometchat/chat-uikit-react-native/src/extensions/Polls/PollsBubble";
import { makeExtentionCall } from "@cometchat/chat-uikit-react-native/src/shared/utils/CometChatMessageHelper";
import { CometChatMessageBubble } from "@cometchat/chat-uikit-react-native/src/shared/views/CometChatMessageBubble";

const SavedMessagesScreen = () => {
  const navigation = useNavigation();
  const loggedInUser = useRef(CometChatUIKit.loggedInUser!).current;
  const [savedMessages, setSavedMessages] = useState<CometChat.BaseMessage[]>([]);
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const formatter = React.useMemo(() => getTextFormatters()[0], []);
  const dummyUser = new CometChat.User("saved_messages");
  dummyUser.setName("Saved Messages");

  useEffect(() => {
    fetchSavedMessages();
  }, []);

  const fetchSavedMessages = async () => {
    try {
      const response = await CometChat.callExtension("save-message", "GET", "v1/fetch", {});
      const messages = (response as any)?.savedMessages || [];

      const parsed = messages.map((msg: any) => {
        let constructed;
        try {
          switch (msg.category) {
            case CometChat.CATEGORY_MESSAGE:
              if (msg.type === CometChat.MESSAGE_TYPE.TEXT) {
                constructed = new CometChat.TextMessage(
                  msg.receiver,
                  msg.text ?? msg.data?.text ?? "",
                  msg.receiverType
                );
              } else {
                const attachment = msg.data?.attachments?.[0];
                if (!attachment?.url) return null;

                constructed = new CometChat.MediaMessage(
                  msg.receiver,
                  attachment,
                  msg.receiverType,
                  msg.type
                );
                constructed.setData(msg.data);
                constructed.setType(msg.type);
              }
              break;

            case CometChat.CATEGORY_CUSTOM:
              constructed = new CometChat.CustomMessage(
                msg.receiver,
                msg.receiverType,
                msg.type
              );
              constructed.setCategory(CometChat.CATEGORY_CUSTOM);
              constructed.setCustomData(msg.data);
              constructed.setType(msg.type);
              break;

            default:
              constructed = new CometChat.BaseMessage(
                msg.receiver,
                msg.type,
                msg.receiverType,
                msg.category
              );
          }

          if (!constructed) return null;

          constructed.setId(msg.id);
          constructed.setSender(new CometChat.User(msg.data?.entities?.sender?.entity));
          constructed.setReceiver(
            msg.receiverType === CometChat.RECEIVER_TYPE.USER
              ? new CometChat.User(msg.data?.entities?.receiver?.entity)
              : new CometChat.Group(msg.data?.entities?.receiver?.entity)
          );
          constructed.setSentAt(msg.sentAt);
          constructed.setMetadata(msg.data?.metadata);

          return constructed;
        } catch (e) {
          console.warn("❌ Failed to parse message", e);
          return null;
        }
      }).filter(Boolean);

      setSavedMessages(parsed);
    } catch (error) {
      console.error("❌ Error fetching saved messages:", error);
    }
  };

  const pinMessage = (msg: CometChat.BaseMessage) => {
    const id = String(msg.getId());
    setPinnedIds((prev) => new Set(prev).add(id));
  };

  const unpinMessage = (msg: CometChat.BaseMessage) => {
    const id = String(msg.getId());
    setPinnedIds((prev) => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  const unsaveMessage = async (msg: CometChat.BaseMessage) => {
    const id = String(msg.getId());
    try {
      await CometChat.callExtension("save-message", "DELETE", "v1/unsave", {
        msgId: id,
      });
      CometChatUIEventHandler.emitUIEvent("ccMessageUnsaved", {});
      setSavedMessages((prev) => prev.filter((m) => String(m.getId()) !== id));
    } catch (err) {
      console.warn("❌ Server unsave failed, falling back to local removal only.", err);
      CometChatUIEventHandler.emitUIEvent("ccMessageUnsaved", {});

      setSavedMessages((prev) => prev.filter((m) => String(m.getId()) !== id));
    }
  };

  const showActionSheet = (msg: CometChat.BaseMessage) => {
    const id = String(msg.getId());
    const isPinned = pinnedIds.has(id);
    const options = [isPinned ? "Unpin" : "Pin", "Unsave", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          destructiveButtonIndex,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            isPinned ? unpinMessage(msg) : pinMessage(msg);
          } else if (buttonIndex === 1) {
            unsaveMessage(msg);
          }
        }
      );
    } else {
      Alert.alert("Message Options", "", [
        {
          text: isPinned ? "Unpin" : "Pin",
          onPress: () => (isPinned ? unpinMessage(msg) : pinMessage(msg)),
        },
        {
          text: "Unsave",
          style: "destructive",
          onPress: () => unsaveMessage(msg),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <CometChatMessageHeader
        user={dummyUser}
        onBack={() => navigation.goBack()}
        showBackButton
        hideVoiceCallButton
        hideVideoCallButton
      />
      <ScrollView style={{ flex: 1 }}>
        {savedMessages.map((message) => {
          const alignment =
            message.getSender().getUid() === loggedInUser.getUid() ? "right" : "left";
          let MessageContent: React.ReactNode;

          try {
            const type = message.getType();
            const extensions = (message as any)?.metadata?.["@injected"]?.extensions;

            if (message instanceof CometChat.CustomMessage) {
              if (type === "extension_poll" && extensions?.polls) {
                const pollData = extensions.polls;
                const rawOptions = pollData.options || {};
                const safeMetadata = { ...pollData };
                safeMetadata.results = safeMetadata.results || {};
                safeMetadata.results.options = safeMetadata.results.options || {};

                MessageContent = (
                  <PollsBubble
                    pollQuestion={pollData.question}
                    options={rawOptions}
                    pollId={pollData.id}
                    metadata={safeMetadata}
                    loggedInUser={loggedInUser}
                    choosePoll={(voteId) => {
                      makeExtentionCall("polls", "POST", "v2/vote", {
                        vote: voteId,
                        id: pollData.id,
                      });
                    }}
                    titleStyle={styles.pollTitle}
                    optionTextStyle={styles.pollOptionText}
                    voteCountTextStyle={styles.pollVoteCount}
                    selectedIconStyle={styles.pollSelectedIcon}
                    radioButtonStyle={styles.pollRadioButton}
                    voteravatarStyle={{ containerStyle: styles.pollVoterAvatarContainer }}
                    progressBarStyle={styles.pollProgressBar}
                    activeProgressBarTint={"#F58D1F"}
                  />
                );
              } else if (
                (type === "extension_document" && extensions?.document) ||
                (type === "extension_whiteboard" && extensions?.whiteboard)
              ) {
                const isWhiteboard = type === "extension_whiteboard";
                const doc = isWhiteboard ? extensions.whiteboard : extensions.document;
                const url = isWhiteboard ? doc.board_url : doc.document_url;

                MessageContent = (
                  <View style={styles.bubbleContainer}>
                    <CometChatCollaborativeBubble
                      title={doc.document_name || (isWhiteboard ? "Collaborative Whiteboard" : "Collaborative Document")}
                      subtitle={isWhiteboard ? "Open Whiteboard to draw together" : "Open document to draw together"}
                      url={url}
                      buttonText={isWhiteboard ? "Open Whiteboard" : "Open Document"}
                      onPress={(url) => Linking.openURL(url)}
                      image={<Image source={CollabImage} style={styles.bubbleImage} />}
                      icon={<CollabIcon height={24} width={24} color={"#fff"} />}
                      titleStyle={styles.titleText}
                      subtitleStyle={styles.subtitleText}
                      dividerStyle={styles.divider}
                      buttonViewStyle={styles.buttonContainer}
                      buttonTextStyle={styles.buttonText}
                    />
                  </View>
                );
              }
            } else if (message instanceof CometChat.TextMessage) {
              const formattedText = formatter.getFormattedText(message.getText());
              MessageContent = (
                <CometChatMessageBubble
                  id={message.getId().toString()}
                  ContentView={
                    <View style={{ padding: 8 }}>
                      {typeof formattedText === 'string' ? (
                        <Text>{formattedText}</Text>
                      ) : (
                        formattedText
                      )}
                    </View>
                  }
                />
              );
            } else if (message instanceof CometChat.MediaMessage) {
              const getBubbleWrapperStyle = (alignment: "left" | "right"): ViewStyle => ({
                borderRadius: 12,
                padding: 6,
                maxWidth: "80%",
              });
              const data = message.getData() as any;
              if (type === CometChat.MESSAGE_TYPE.IMAGE) {
                MessageContent = (
                  <CometChatImageBubble
                    imageUrl={{ uri: data.url }}
                    style={{ width: 200, height: 200, borderRadius: 8 }}
                    resizeMode="contain"
                  />
                );
              } else if (type === CometChat.MESSAGE_TYPE.VIDEO) {
                let thumbnailUrl: string | undefined;
                if (message instanceof CometChat.MediaMessage) {
                  const meta = message.getMetadata() as any;
                  thumbnailUrl = meta?.["@injected"]?.extensions?.["thumbnail-generation"]?.url_medium;
                }
                MessageContent = (
                  <View style={getBubbleWrapperStyle(alignment)}>
                    <CometChatVideoBubble
                      videoUrl={data.url}
                      thumbnailUrl={{ uri: thumbnailUrl }}
                      imageStyle={{
                        width: 220,
                        height: 140,
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                      playIconStyle={{
                        height: 36,
                        width: 36,
                        tintColor: "#fff",
                      }}
                    />
                  </View>
                );
              } else if (type === CometChat.MESSAGE_TYPE.AUDIO) {
                MessageContent = (
                  <View style={getBubbleWrapperStyle(alignment)}>
                    <CometChatAudioBubble
                      audioUrl={data.url}
                      playIconStyle={{ height: 24, width: 24, tintColor: "#333" }}
                      playViewContainerStyle={{ flexDirection: "row", alignItems: "center" }}
                      playIconContainerStyle={{ marginRight: 12 }}
                      playProgressTextStyle={{ fontSize: 12, color: "#555", marginTop: 4 }}
                      waveStyle={{ backgroundColor: "#ccc", height: 4 }}
                      waveContainerStyle={{ marginBottom: 4 }}
                    />
                  </View>
                );
              } else if (type === CometChat.MESSAGE_TYPE.FILE) {
                const attachment = Array.isArray(data.attachments) ? data.attachments[0] : {};
                const fileName = attachment.name
                MessageContent = (
                  <CometChatFileBubble
                    fileUrl={data.url}
                    title={fileName}
                    titleStyle={{ color: "#000", fontWeight: "600" }}
                    subtitleStyle={{ color: "#555" }}
                    downloadIconStyle={{ tintColor: "#000", height: 24, width: 24 }}
                  />
                );
              }
            }
            if (!MessageContent) {
              MessageContent = <Text style={{ padding: 8, color: "gray" }}>[Unsupported message]</Text>;
            }
          } catch (e) {
            console.warn("❌ Error rendering saved message", e);
            MessageContent = <Text style={{ padding: 8, color: "red" }}>[Render error]</Text>;
          }

          return (
            <TouchableWithoutFeedback key={message.getId()} onLongPress={() => showActionSheet(message)}>
              <View style={styles.messageRow}>
                <Image
                  source={{ uri: message.getSender().getAvatar() || `https://ui-avatars.com/api/?name=${message.getSender().getName()}` }}
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.headerRow}>
                    <Text style={styles.senderName}>{message.getSender().getName()}</Text>
                    <Text style={styles.messageTime}>{new Date(message.getSentAt() * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                  </View>
                  {MessageContent}
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SavedMessagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginTop: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
  },
  bubbleContainer: {
    backgroundColor: "#2499A3",
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    maxWidth: "80%",
  },
  bubbleImage: {
    width: "100%",
    height: 140,
    resizeMode: "contain",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  titleText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitleText: {
    color: "#e0e0e0",
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#82e2ea",
    marginVertical: 8,
  },
  buttonContainer: {
    paddingVertical: 6,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 15,
  },
  pollTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 12 },
  pollOptionText: { fontSize: 14, color: "#000" },
  pollVoteCount: { fontSize: 14, color: "#000" },
  pollSelectedIcon: {
    height: 14,
    width: 14,
    tintColor: "#FFFFFF",
  },
  pollRadioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "#F58D1F",
    alignItems: "center",
    justifyContent: "center",
  },
  pollVoterAvatarContainer: { height: 24, width: 24, borderRadius: 12, marginLeft: -6 },
  pollProgressBar: { height: 6, borderRadius: 3, backgroundColor: "#E0E0E0" },
});