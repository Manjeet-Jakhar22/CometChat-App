import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ThreadView from '../../components/conversations/screens/ThreadView';
import UserInfo from '../../components/conversations/screens/UserInfo';
import {UserStackParamList} from '../types';
import Messages from '../../components/conversations/screens/Messages';
import {useTheme} from '@cometchat/chat-uikit-react-native';
import { View } from 'react-native';
import Users from '../../components/users/Users';
import { SCREEN_CONSTANTS } from '../../utils/AppConstants';

const UserStack = createStackNavigator<UserStackParamList>();

const UserStackNavigator = () => {
  const theme = useTheme();
  return (
    <UserStack.Navigator
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
      initialRouteName={SCREEN_CONSTANTS.USERS}>
      <UserStack.Screen name={SCREEN_CONSTANTS.USERS} component={Users} />
      <UserStack.Screen name={SCREEN_CONSTANTS.MESSAGES} component={Messages} />
      <UserStack.Screen name={SCREEN_CONSTANTS.THREAD_VIEW} component={ThreadView} />
      <UserStack.Screen name={SCREEN_CONSTANTS.USER_INFO} component={UserInfo} />
    </UserStack.Navigator>
  );
};

export default UserStackNavigator;
