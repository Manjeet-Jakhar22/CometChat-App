import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native";
import {
  RouteProp,
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import {
  CometChatThreadHeader,
  CometChatMessageList,
  CometChatMessageComposer,
  localize,
} from "@cometchat/chat-uikit-react-native";
import { Icon } from "@cometchat/chat-uikit-react-native";
import { useTheme } from "@cometchat/chat-uikit-react-native";
import ArrowBack from "../../../assets/icons/ArrowBack";
import { ChatStackParamList } from "../../../navigation/paramLists";

type ThreadViewRouteProp = RouteProp<ChatStackParamList, "ThreadView">;

const ThreadView = () => {
  const { params } = useRoute<ThreadViewRouteProp>();
  const { goBack } = useNavigation();
  const theme = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        goBack();
        return true; // Prevent default behavior
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [goBack])
  );

  const { message, user, group } = params || {};

  if (!message) {
    return null;
  }

  return (
    <View style={{ backgroundColor: theme.color.background1, flex: 1 }}>
      {/* Custom Header */}
      <View style={styles.headerStyle}>
        <TouchableOpacity style={styles.iconStyle} onPress={() => goBack()}>
          <Icon
            icon={
              <ArrowBack
                color={theme.color.iconPrimary}
                height={24}
                width={24}
              />
            }
          />
        </TouchableOpacity>
        <View style={styles.textStyle}>
          <Text
            style={[
              theme.typography.heading1.bold,
              { color: theme.color.textPrimary },
            ]}
          >
            {localize("THREAD")}
          </Text>
          <Text
            style={[
              theme.typography.caption1.regular,
              { color: theme.color.textSecondary },
            ]}
          >
            {user ? user?.getName() : group?.getName()}
          </Text>
        </View>
      </View>

      {/* Thread Header */}
      <CometChatThreadHeader parentMessage={message} />

      {/* Threaded Message List */}
      <View style={{ flex: 1 }}>
        <CometChatMessageList
          user={user}
          group={group}
          parentMessageId={message.getId().toString()}
        />
      </View>

      {/* Message Composer for Thread */}
      <CometChatMessageComposer
        user={user}
        group={group}
        parentMessageId={message.getId()}
        onError={(error: any) => console.error("Composer Error:", error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: "row",
  },
  iconStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    paddingLeft: 10,
    alignItems: "flex-start",
  },
});

export default ThreadView;
