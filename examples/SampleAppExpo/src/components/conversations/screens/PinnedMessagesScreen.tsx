import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Image,
    ViewStyle
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import {
    CometChatAudioBubble,
    CometChatFileBubble,
    CometChatImageBubble,
    CometChatMessageHeader,
    CometChatUIKit,
    CometChatVideoBubble,
} from "@cometchat/chat-uikit-react-native";
import { getTextFormatters } from "../../../custom/CometChatHTMLFormatter";
import { ChatStackParamList } from "../../../navigation/paramLists";
import { PollsBubble } from "@cometchat/chat-uikit-react-native/src/extensions/Polls/PollsBubble";
import { makeExtentionCall } from "@cometchat/chat-uikit-react-native/src/shared/utils/CometChatMessageHelper";
import CollabIcon from "@cometchat/chat-uikit-react-native/src/shared/icons/components/collaborative-document-icon";
import CollabImage from "../../../assets/icons/collab_doc.png";
import DownloadIcon from "../../../assets/icons/download.png";
import { CometChatCollaborativeBubble } from "@cometchat/chat-uikit-react-native/src/extensions/CollaborativeBubble/CometChatCollaborativeBubble";
import MessageUnpin from "../../../assets/icons/MessageUnpin";
import { CometChatMessageBubble } from "@cometchat/chat-uikit-react-native/src/shared/views/CometChatMessageBubble";

const PinnedMessagesScreen: React.FC<StackScreenProps<ChatStackParamList, "PinnedMessages">> = ({
    route,
    navigation,
}) => {
    const { user, group } = route.params;
    const [pinnedMessages, setPinnedMessages] = useState<CometChat.BaseMessage[]>([]);
    const formatter = React.useMemo(() => getTextFormatters()[0], []);
    const loggedInUser = useRef(CometChatUIKit.loggedInUser!).current;
    const dummyUser = new CometChat.User("pinned_messages");
    dummyUser.setName("Pinned Messages");

    useEffect(() => {
        fetchPinnedMessages();
    }, []);

    const getCustomMessageType = (msg: any): string => {
        const ext = msg?.data?.metadata?.["@injected"]?.extensions;
        if (ext?.polls) return "extension_poll";
        if (ext?.document) return "extension_document";
        if (ext?.whiteboard) return "extension_whiteboard";
        if (ext?.meeting) return "extension_meeting";
        return "custom";
    };

    const fetchPinnedMessages = async () => {
        try {
            const receiverType = user ? CometChat.RECEIVER_TYPE.USER : CometChat.RECEIVER_TYPE.GROUP;
            const receiverId = user ? user.getUid() : group?.getGuid();
            if (!receiverId) return;

            const response = await CometChat.callExtension("pin-message", "GET", "v1/fetch", {
                receiverType,
                receiver: receiverId,
            });

            const messages = (response as any)?.pinnedMessages || [];
            const parsed = messages
                .map((msg: any) => {
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
                                } else if (
                                    msg.type === CometChat.MESSAGE_TYPE.IMAGE ||
                                    msg.type === CometChat.MESSAGE_TYPE.VIDEO ||
                                    msg.type === CometChat.MESSAGE_TYPE.AUDIO ||
                                    msg.type === CometChat.MESSAGE_TYPE.FILE
                                ) {
                                    const attachment = msg.data?.attachments?.[0];
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
                                const resolvedType = getCustomMessageType(msg);
                                constructed = new CometChat.CustomMessage(
                                    msg.receiver,
                                    msg.receiverType,
                                    resolvedType
                                );
                                constructed.setCategory(CometChat.CATEGORY_CUSTOM);
                                constructed.setCustomData(msg.data);
                                constructed.setType(resolvedType);
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
                    } catch (err) {
                        console.warn("❌ Failed to parse message:", err, msg);
                        return null;
                    }
                })
                .filter(Boolean);
            setPinnedMessages(parsed);
        } catch (error) {
            console.error("❌ Error fetching pinned messages:", error);
        }
    };

    const handleUnpin = async (message: CometChat.BaseMessage) => {
        const msgId = message.getId();
        const receiverId = message.getReceiverId();
        const receiverType = message.getReceiverType();
        try {
            await CometChat.callExtension("pin-message", "DELETE", "v1/unpin", {
                msgId: String(msgId),
                receiver: receiverId,
                receiverType,
            });
            setPinnedMessages((prev) => prev.filter((m) => m.getId() !== msgId));
        } catch (error: any) {
            console.error("Unpin failed", error);
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
                {pinnedMessages.map((message) => {
                    const alignment =
                        message.getSender().getUid() === loggedInUser.getUid() ? "right" : "left";
                    let MessageContent: React.ReactNode;

                    try {
                        const type = message.getType();
                        const extensions = (message as any)?.metadata?.["@injected"]?.extensions;

                        if (
                            message instanceof CometChat.CustomMessage &&
                            message.getCategory() === CometChat.CATEGORY_CUSTOM
                        ) {
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
                                            subtitle={(isWhiteboard ? "Open Whiteboard to draw together" : "Open document to draw together")}
                                            url={url}
                                            buttonText={(isWhiteboard ? "Open Whiteboard" : "Open Document")}
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
                        } else if (
                            message.getType() === CometChat.MESSAGE_TYPE.IMAGE ||
                            message.getType() === CometChat.MESSAGE_TYPE.VIDEO ||
                            message.getType() === CometChat.MESSAGE_TYPE.AUDIO ||
                            message.getType() === CometChat.MESSAGE_TYPE.FILE
                        ) {
                            const data = message.getData() as any;
                            const getBubbleWrapperStyle = (alignment: "left" | "right"): ViewStyle => ({
                                borderRadius: 12,
                                padding: 6,
                                maxWidth: "80%",
                            });

                            if (message.getType() === CometChat.MESSAGE_TYPE.IMAGE) {
                                MessageContent = (
                                    <CometChatImageBubble
                                        imageUrl={{ uri: data.url }}
                                        style={{ width: 200, height: 200, borderRadius: 8 }}
                                        resizeMode="contain"
                                    />
                                );
                            } else if (message.getType() === CometChat.MESSAGE_TYPE.FILE) {
                                const attachment = Array.isArray(data.attachments) ? data.attachments[0] : {};
                                const fileName = attachment.name
                                MessageContent = (
                                    <CometChatFileBubble
                                        fileUrl={data.url}
                                        title={fileName}
                                        titleStyle={{ color: "#000", fontWeight: "600" }}
                                        subtitleStyle={{ color: "#555" }}
                                        downloadIcon={DownloadIcon}
                                        downloadIconStyle={{ tintColor: "#000", height: 24, width: 24 }}
                                    />
                                );
                            } else if (
                                message.getType() === CometChat.MESSAGE_TYPE.AUDIO
                            ) {
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
                            } else if (
                                message.getType() === CometChat.MESSAGE_TYPE.VIDEO
                            ) {
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
                            }
                        }

                        if (!MessageContent) {
                            MessageContent = (
                                <Text style={{ padding: 8, color: "gray" }}>[Unsupported message]</Text>
                            );
                        }
                    } catch (e) {
                        console.error("❌ Error rendering message:", e);
                        MessageContent = (
                            <Text style={{ padding: 8, color: "red" }}>[Rendering Error]</Text>
                        );
                    }

                    return (
                        <View key={message.getId()} style={styles.messageRow}>
                            <Image
                                source={{ uri: message.getSender().getAvatar() || "https://ui-avatars.com/api/?name=" + message.getSender().getName() }}
                                style={styles.avatar}
                            />
                            <View style={{ flex: 1 }}>
                                <View style={styles.headerRow}>
                                    <Text style={styles.senderName}>{message.getSender().getName()}</Text>
                                    <Text style={styles.messageTime}>
                                        {new Date(message.getSentAt() * 1000).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Text>
                                </View>

                                {MessageContent}
                            </View>
                            <TouchableOpacity onPress={() => handleUnpin(message)} style={styles.unpinIconWrapper}>
                                <MessageUnpin color={"#fff"} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default PinnedMessagesScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
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
    unpinIconWrapper: {
        padding: 4,
        marginTop: 4,
        backgroundColor: "#FA55A4",
        borderRadius: 4,
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
    docBubble: {
        padding: 12,
        backgroundColor: "#eee",
        borderRadius: 6,
        marginTop: 4,
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
});