import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CometChatGroups,
  CometChatUIEventHandler,
  CometChatUIEvents,
  CometChatUIKit,
  useTheme,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { styles } from "./styles";

import {
  GroupScreenAppBarOptions,
  CreateGroupBottomSheet,
  JoinGroupBottomSheet,
} from "./GroupHelper";
import { GroupStackParamList } from "../../navigation/paramLists";

type GroupNavigationProp = StackNavigationProp<
  GroupStackParamList,
  "GroupsScreen"
>;

interface GroupsProps {
  hideHeader?: boolean;
}

const Groups: React.FC<GroupsProps> = ({ hideHeader = false }) => {
  const theme = useTheme();
  const navigation = useNavigation<GroupNavigationProp>();

  // State to handle showing/hiding bottom sheets
  const [isCreateGroupSheetVisible, setCreateGroupSheetVisible] =
    useState(false);
  const [isJoinGroupSheetVisible, setJoinGroupSheetVisible] = useState(false);

  // State for the group that user wants to join
  const [groupToJoin, setGroupToJoin] = useState<CometChat.Group | null>(null);

  // Condition to hide the entire screen if needed
  const [shouldHide, setShouldHide] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShouldHide(false);
      return () => {
        // If route length == 1 => user switched tabs, so hide the screen
        if (navigation.getState().routes.length === 1) {
          setShouldHide(true);
        }
      };
    }, [navigation])
  );

  /**
   * Navigates to the Messages screen after group creation or join.
   */
  const handleNavigateToMessages = (group: CometChat.Group) => {
    navigation.navigate("Messages", { group });
  };

  /**
   * Handle group item press:
   * - If joined, open chat
   * - If public, join automatically
   * - If password, show the join modal
   */
  const handleGroupItemPress = (group: CometChat.Group) => {
    if (group.getHasJoined()) {
      handleNavigateToMessages(group);
      return;
    }

    if (group.getType() === CometChat.GROUP_TYPE.PUBLIC) {
      joinPublicGroup(group);
    } else if (group.getType() === CometChat.GROUP_TYPE.PASSWORD) {
      setGroupToJoin(group);
      setJoinGroupSheetVisible(true);
    }
    // For private group, you'd have a different flow.
  };

  const joinPublicGroup = async (group: CometChat.Group) => {
    try {
      const joinedGroup = await CometChat.joinGroup(
        group.getGuid(),
        group.getType() as CometChat.GroupType,
        ""
      );

      handleNavigateToMessages(joinedGroup);
      CometChatUIEventHandler.emitGroupEvent(
        CometChatUIEvents.ccGroupMemberJoined,
        {
          joinedUser: CometChatUIKit.loggedInUser,
          joinedGroup: joinedGroup,
        }
      );
    } catch (error) {
      console.log("Error joining public group:", error);
    }
  };

  if (shouldHide) return null;

  return (
    <SafeAreaView
      style={[
        styles.safeAreaContainer,
        { backgroundColor: theme.color.background1 },
      ]}
    >
      {/* CometChatGroups list component */}
      <CometChatGroups
        AppBarOptions={() => (
          <GroupScreenAppBarOptions
            onPress={() => setCreateGroupSheetVisible(true)}
          />
        )}
        onItemPress={handleGroupItemPress}
        hideHeader={hideHeader}
      />

      {/* Create Group Bottom Sheet */}
      <CreateGroupBottomSheet
        visible={isCreateGroupSheetVisible}
        onClose={() => setCreateGroupSheetVisible(false)}
        onGroupCreated={handleNavigateToMessages}
      />

      {/* Join Group Bottom Sheet */}
      <JoinGroupBottomSheet
        visible={isJoinGroupSheetVisible}
        groupToJoin={groupToJoin}
        onClose={() => {
          setJoinGroupSheetVisible(false);
          setGroupToJoin(null);
        }}
        onJoinSuccess={handleNavigateToMessages}
      />
    </SafeAreaView>
  );
};

export default Groups;
