import {NavigatorScreenParams} from '@react-navigation/native';
import {CometChat} from '@cometchat/chat-sdk-react-native';

export type RootStackParamList = {
  Login: undefined;
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;
  OngoingCallScreen: {call: any};
  AppCredentials: undefined;
  SampleUser: undefined;
};

export type BottomTabParamList = {
  Chats: NavigatorScreenParams<ChatStackParamList>;
  Calls: NavigatorScreenParams<CallStackParamList>;
  Users: NavigatorScreenParams<UserStackParamList>;
  Groups: NavigatorScreenParams<GroupStackParamList>;
};

export type ChatStackParamList = {
  Conversation: undefined;
  CreateConversation: undefined;
  Messages: {
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  BannedMembers: undefined;
  UserInfo: {
    user: CometChat.User;
  };
  GroupInfo: {
    group: CometChat.Group;
  };
  ThreadView: {
    message: CometChat.BaseMessage;
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  AddMember: {
    group: CometChat.Group;
  };
  TransferOwnershipSection: {
    group: CometChat.Group;
  };
  BannedMember: {
    group: CometChat.Group;
  };
  ViewMembers: {
    group: CometChat.Group;
  };
};

export type CallStackParamList = {
  CallLogs: undefined;
  CallDetails: {
    call: any;
  };
};

export type UserStackParamList = {
  Users: undefined;
  Messages: {
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  UserInfo: {
    user: CometChat.User;
  };
  ThreadView: {
    message: CometChat.BaseMessage;
    user?: CometChat.User;
    group?: CometChat.Group;
  };
};

export type GroupStackParamList = {
  GroupsScreen: undefined;
  Messages: {
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  BannedMembers: undefined;
  GroupInfo: {
    group: CometChat.Group;
  };
  ThreadView: {
    message: CometChat.BaseMessage;
    user?: CometChat.User;
    group?: CometChat.Group;
  };
  AddMember: {
    group: CometChat.Group;
  };
  TransferOwnershipSection: {
    group: CometChat.Group;
  };
  BannedMember: {
    group: CometChat.Group;
  };
  ViewMembers: {
    group: CometChat.Group;
  };
};