import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ThreadView from '../../components/conversations/screens/ThreadView';
import UserInfo from '../../components/conversations/screens/UserInfo';
import GroupInfoSection from '../../components/conversations/screens/GroupInfo';
import Conversations from '../../components/conversations/screens/Conversations';
import {ChatStackParamList} from '../types';
import Messages from '../../components/conversations/screens/Messages';
import TransferOwnershipSection from '../../components/conversations/screens/TransferOwnership';
import ViewMembers from '../../components/conversations/screens/ViewMembers';
import {useTheme} from '@cometchat/chat-uikit-react-native';
import {View} from 'react-native';
import CreateConversation from '../../components/conversations/screens/CreateConversation';
import BannedMember from '../../components/conversations/screens/BannedMember';
import AddMember from '../../components/conversations/screens/AddMember';
import {SCREEN_CONSTANTS} from '../../utils/AppConstants';

const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {
  const theme = useTheme();

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: {backgroundColor: theme.color.background1},
        cardStyleInterpolator: ({current: {progress}}) => ({
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        }),
        cardOverlay: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: theme.color.background1,
            }}
          />
        ),
      }}
      initialRouteName={SCREEN_CONSTANTS.CONVERSATION}>
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.CONVERSATION}
        component={Conversations}
        options={{
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.CREATE_CONVERSATION}
        component={CreateConversation}
      />
      <ChatStack.Screen name={SCREEN_CONSTANTS.MESSAGES} component={Messages} />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.THREAD_VIEW}
        component={ThreadView}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.USER_INFO}
        component={UserInfo}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.GROUP_INFO}
        component={GroupInfoSection}
        options={{animation:'none'}}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.ADD_MEMBER}
        component={AddMember}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.TRANSFER_OWNERSHIP}
        component={TransferOwnershipSection}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.BANNED_MEMBER}
        component={BannedMember}
      />
      <ChatStack.Screen
        name={SCREEN_CONSTANTS.VIEW_MEMBER}
        component={ViewMembers}
      />
    </ChatStack.Navigator>
  );
};

export default ChatStackNavigator;
