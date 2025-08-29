import { CometChat } from "@cometchat/chat-sdk-react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import {
  CometChatAvatar,
  CometChatConversations,
  CometChatUIKit,
  useTheme,
} from "@cometchat/chat-uikit-react-native";
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { TooltipMenu } from "../../../utils/TooltipMenu";
import { StackNavigationProp } from "@react-navigation/stack";
import AccountCircle from "../../../assets/icons/AccountCircle";
import InfoIcon from "../../../assets/icons/InfoIcon";
import BookmarkIcon from "../../../assets/icons/SavedIcon";
import ReminderIcon from "../../../assets/icons/ReminderIcon";
import Logout from "../../../assets/icons/Logout";
import { AppConstants } from "../../../utils/AppConstants";
import { navigationRef } from "../../../navigation/NavigationService";
import { ChatStackParamList } from "../../../navigation/paramLists";
import { getTextFormatters } from "../../../custom/CometChatHTMLFormatter";

type ChatNavigationProp = StackNavigationProp<
  ChatStackParamList,
  "Conversation"
>;

const Conversations: React.FC<{}> = () => {
  const theme = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const tooltipPositon = useRef({ pageX: 0, pageY: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const selectedConversation = useRef<CometChat.Conversation | null>(null);
  const navigation = useNavigation<ChatNavigationProp>();
  const avatarContainerRef = useRef<View>(null);
  const loggedInUser = useRef(CometChatUIKit.loggedInUser).current;
  const [shouldHide, setShouldHide] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setShouldHide(false);
      return () => {
        if (navigation.getState().routes.length === 1) {
          setShouldHide(true);
          setTooltipVisible(false);
        }
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      setRefreshFlag((prev) => prev + 1);
    }, [])
  );

  const openMessagesFor = (item: CometChat.Conversation) => {
    const isUser = item.getConversationType() === "user";
    const isGroup = item.getConversationType() === "group";
    navigation.navigate("Messages", {
      user: isUser ? (item.getConversationWith() as CometChat.User) : undefined,
      group: isGroup ? (item.getConversationWith() as CometChat.Group) : undefined,
    });
  };

  const _conversationsConfig = {
    onItemPress: openMessagesFor,
    onError: (err: any) => console.log("ERROR IN CONVO: ", err),
  };

  const handleAvatarPress = () => {
    if (avatarContainerRef.current) {
      avatarContainerRef.current.measureInWindow((x, y, height) => {
        tooltipPositon.current = { pageX: x, pageY: y + height };
        setTooltipVisible(true);
      });
      selectedConversation.current = null;
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await CometChat.logout();
    } catch (error) {
      console.error("CometChat logout failed:", error);
      setIsLoggingOut(false);
      return;
    }
    setIsLoggingOut(false);
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "SampleUser" }],
      })
    );
  };

  const getFilteredBuilder = (): CometChat.ConversationsRequestBuilder => {
    const builder = new CometChat.ConversationsRequestBuilder().setLimit(30);

    // Hook into the build method so we can override fetchNext later
    const originalBuild = builder.build.bind(builder);
    builder.build = () => {
      const request = originalBuild();

      const originalFetchNext = request.fetchNext.bind(request);
      request.fetchNext = async () => {
        const conversations = await originalFetchNext();
        return conversations.filter((conv: CometChat.Conversation) => {
          if (conv.getConversationType() === CometChat.RECEIVER_TYPE.USER) {
            const user = conv.getConversationWith() as CometChat.User;
            return user.getUid() !== "cc_reminder_bot";
          }
          return true;
        });
      };

      return request;
    };

    return builder;
  };

  if (shouldHide) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.color.textPrimary }}>
          Chats
        </Text>
        <View ref={avatarContainerRef}>
          <TouchableOpacity onPress={handleAvatarPress}>
            <CometChatAvatar
              style={{
                containerStyle: { height: 40, width: 40, justifyContent: "center", alignItems: "center" },
                textStyle: { fontSize: 22, lineHeight: 28, textAlign: "center" },
              }}
              image={loggedInUser?.getAvatar() ? { uri: loggedInUser?.getAvatar() } : undefined}
              name={loggedInUser?.getName() ?? ""}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 8,
          backgroundColor: "#359BAC",
        }}
      >
        {[
          { key: "saved", label: "Saved Messages", icon: BookmarkIcon },
          { key: "reminders", label: "Reminders", icon: ReminderIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <TouchableOpacity
              key={tab.key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 24,
                paddingHorizontal: 16,
                paddingVertical: 8,
                gap: 8,
              }}
              onPress={async () => {
                if (tab.key === "reminders") {
                  try {
                    const reminderBot = await CometChat.getUser("cc_reminder_bot");
                    navigation.navigate("Messages", { user: reminderBot });
                  } catch (error) {
                    console.error("Reminder bot user not found:", error);
                  }
                } else if (tab.key === "saved") {
                  navigation.navigate("SavedMessages");
                }
              }}
            >
              <Icon width={18} height={18} color="#fff" />
              <Text
                style={{
                  fontWeight: "normal",
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}

      </View>

      {/* Conversations List */}
      <View style={{ flex: 1 }}>
        <CometChatConversations
          key={refreshFlag}
          {..._conversationsConfig}
          selectionMode="none"
          hideHeader={true}
          conversationsRequestBuilder={getFilteredBuilder()}
          textFormatters={getTextFormatters()}
        />
      </View>

      {/* Tooltip Menu */}
      <View
        style={{
          position: "absolute",
          top: tooltipPositon.current.pageY,
          left: tooltipPositon.current.pageX,
          zIndex: 9999,
        }}
      >
        <TooltipMenu
          visible={tooltipVisible}
          onClose={() => setTooltipVisible(false)}
          onDismiss={() => setTooltipVisible(false)}
          event={{ nativeEvent: tooltipPositon.current }}
          menuItems={[
            {
              text: loggedInUser?.getName() || "User",
              onPress: () => setTooltipVisible(false),
              icon: <AccountCircle height={24} width={24} color={theme.color.textPrimary} />,
              textColor: theme.color.textPrimary,
              iconColor: theme.color.textPrimary,
            },
            {
              text: "Logout",
              onPress: handleLogout,
              icon: <Logout height={24} width={24} color={theme.color.error} />,
              textColor: theme.color.error,
              iconColor: theme.color.error,
            },
            {
              text: AppConstants.versionNumber,
              onPress: () => { },
              icon: <InfoIcon height={24} width={24} color={theme.color.textPrimary} />,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Conversations;
