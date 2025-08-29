import { CometChat } from "@cometchat/chat-sdk-react-native";
import { CometChatUIEventHandler, CometChatUIKit } from "../shared";

export const listners = {
  addListener: {
    userListener: ({ userStatusListenerId, handleUserStatus }: any) =>
      CometChat.addUserListener(
        userStatusListenerId,
        new CometChat.UserListener({
          onUserOnline: (onlineUser: CometChat.User) => {
            handleUserStatus(onlineUser);
            /* when someuser/friend comes online, user will be received here */
          },
          onUserOffline: (offlineUser: CometChat.User) => {
            handleUserStatus(offlineUser);
            /* when someuser/friend went offline, user will be received here */
          },
        })
      ),
    messageListener: ({ msgTypingListenerId, msgTypingIndicator }: any) =>
      CometChatUIEventHandler.addMessageListener(msgTypingListenerId, {
        onTypingStarted: (typistDetails: CometChat.TypingIndicator) => {
          msgTypingIndicator(typistDetails, "typing");
        },
        onTypingEnded: (typistDetails: CometChat.TypingIndicator) => {
          msgTypingIndicator(typistDetails, "");
        },
      }),
    groupListener: ({ groupListenerId, handleGroupListener }: any) =>
      CometChat.addGroupListener(
        groupListenerId,
        new CometChat.GroupListener({
          onGroupMemberKicked: (
            message: any,
            kickedUser: CometChat.User,
            kickedBy: CometChat.User,
            kickedFrom: CometChat.Group
          ) => {
            handleGroupListener(kickedFrom);
          },
          onGroupMemberBanned: (
            message: any,
            bannedUser: CometChat.User,
            bannedBy: CometChat.User,
            bannedFrom: CometChat.Group
          ) => {
            handleGroupListener(bannedFrom);
          },
          onMemberAddedToGroup: (
            message: any,
            userAdded: CometChat.User,
            userAddedBy: CometChat.User,
            userAddedIn: CometChat.Group
          ) => {
            console.log("onMemberAddedToGroup", userAddedIn);
            handleGroupListener(userAddedIn);
          },
          onGroupMemberLeft: (
            message: any,
            leavingUser: CometChat.User,
            group: CometChat.Group
          ) => {
            handleGroupListener(group);
          },
          onGroupMemberJoined: (
            message: any,
            joinedUser: CometChat.User,
            joinedGroup: CometChat.Group
          ) => {
            handleGroupListener(joinedGroup);
          },
          onGroupMemberScopeChanged: (
            message: CometChat.Action,
            changedUser: CometChat.GroupMember,
            newScope: CometChat.GroupMemberScope,
            oldScope: CometChat.GroupMemberScope,
            changedGroup: CometChat.Group
          ) => {
            if (changedUser.getUid() !== CometChatUIKit.loggedInUser?.getUid()) return;
            changedGroup.setScope(newScope);
            handleGroupListener(changedGroup);
          },
        })
      ),
  },
  removeListner: {
    removeUserListener: ({ userStatusListenerId }: any) =>
      CometChat.removeUserListener(userStatusListenerId),

    removeMessageListener: ({ msgTypingListenerId }: any) =>
      CometChatUIEventHandler.removeMessageListener(msgTypingListenerId),

    removeGroupListener: ({ groupListenerId }: any) =>
      CometChat.removeGroupListener(groupListenerId),
  },
};
