import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ThreadView from '../../components/conversations/screens/ThreadView';
import {GroupStackParamList} from '../types';
import Messages from '../../components/conversations/screens/Messages';
import TransferOwnershipSection from '../../components/conversations/screens/TransferOwnership';
import ViewMembers from '../../components/conversations/screens/ViewMembers';
import Groups from '../../components/groups/Groups';
import {View} from 'react-native';
import {useTheme} from '@cometchat/chat-uikit-react-native';
import AddMember from '../../components/conversations/screens/AddMember';
import BannedMember from '../../components/conversations/screens/BannedMember';
import GroupInfo from '../../components/conversations/screens/GroupInfo';
import { SCREEN_CONSTANTS } from '../../utils/AppConstants';

const GroupStack = createStackNavigator<GroupStackParamList>();

const GroupStackNavigator = () => {
  const theme = useTheme();
  return (
    <GroupStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
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
      initialRouteName={SCREEN_CONSTANTS.GROUPS_SCREEN}>
      <GroupStack.Screen
        name={SCREEN_CONSTANTS.GROUPS_SCREEN}
        component={Groups}
        options={{
          cardOverlayEnabled: true,
        }}
      />
      <GroupStack.Screen name={SCREEN_CONSTANTS.MESSAGES} component={Messages} />
      <GroupStack.Screen name={SCREEN_CONSTANTS.THREAD_VIEW} component={ThreadView} />
      <GroupStack.Screen name={SCREEN_CONSTANTS.GROUP_INFO} component={GroupInfo} />
      <GroupStack.Screen name={SCREEN_CONSTANTS.ADD_MEMBER} component={AddMember} />
      <GroupStack.Screen
        name={SCREEN_CONSTANTS.TRANSFER_OWNERSHIP}
        component={TransferOwnershipSection}
      />
      <GroupStack.Screen name={SCREEN_CONSTANTS.BANNED_MEMBER} component={BannedMember} />
      <GroupStack.Screen name={SCREEN_CONSTANTS.VIEW_MEMBER} component={ViewMembers} />
    </GroupStack.Navigator>
  );
};

export default GroupStackNavigator;
