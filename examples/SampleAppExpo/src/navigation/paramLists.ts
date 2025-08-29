/* =========================================================================
 * Navigation Param Lists
 * ========================================================================= */

import { NavigatorScreenParams } from "@react-navigation/native";
import { CometChat } from "@cometchat/chat-sdk-react-native";

/* --------------------------------------------------------------------------
 * Bottom-tab navigator (the main app shell)
 * -------------------------------------------------------------------------- */
export type BottomTabParamList = {
  Chats: NavigatorScreenParams<ChatStackParamList>;
  Calls: NavigatorScreenParams<CallStackParamList>;
  Users: NavigatorScreenParams<UserStackParamList>;
  Groups: NavigatorScreenParams<GroupStackParamList>;
};

/* --------------------------------------------------------------------------
 * Root stack navigator (app entry & high-level screens)
 * -------------------------------------------------------------------------- */
export type RootStackParamList = {
  /* Authentication / setup */
  AppCredentials: undefined;
  SampleUser: undefined;

  /* Main tab container */
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;

  /* Call Details screens */
  CallDetails: { call: CometChat.Call };
};

/* --------------------------------------------------------------------------
 * Chats stack
 * -------------------------------------------------------------------------- */
export type ChatStackParamList = {
  Conversation: undefined;
  CreateConversation: undefined;
  Messages: {
    user?: CometChat.User;
    group?: CometChat.Group;
    onUnpinTriggered?: boolean;
  };
  UserInfo: { user: CometChat.User };
  GroupInfo: { 
    group: CometChat.Group;
    onGroupUpdate?: (updatedGroup: CometChat.Group) => void;
  };
  ThreadView: {
    message: CometChat.BaseMessage;
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  AddMember: { group: CometChat.Group };
  TransferOwnershipSection: { group: CometChat.Group };
  BannedMember: { group: CometChat.Group };
  ViewMembers: { group: CometChat.Group };
  BannedMembers: undefined;
  SavedMessages: undefined;
  PinnedMessages: { user?: CometChat.User; group?: CometChat.Group; onUnpinTriggered?: boolean; };
};

/* --------------------------------------------------------------------------
 * Calls stack
 * -------------------------------------------------------------------------- */
export type CallStackParamList = {
  CallLogs: undefined;
  CallDetails: { call: any };
};

/* --------------------------------------------------------------------------
 * Users stack
 * -------------------------------------------------------------------------- */
export type UserStackParamList = {
  Users: undefined;
  Messages: {
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  UserInfo: { user: CometChat.User };
  ThreadView: {
    message: CometChat.BaseMessage;
    user?: CometChat.User;
    group?: CometChat.Group;
  };
};

/* --------------------------------------------------------------------------
 * Groups stack
 * -------------------------------------------------------------------------- */
export type GroupStackParamList = {
  GroupsScreen: undefined;
  Messages: {
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  GroupInfo: { group: CometChat.Group };
  ThreadView: {
    message: CometChat.BaseMessage;
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  AddMember: { group: CometChat.Group };
  TransferOwnershipSection: { group: CometChat.Group };
  BannedMember: { group: CometChat.Group };
  ViewMembers: { group: CometChat.Group };
  BannedMembers: undefined;
};
