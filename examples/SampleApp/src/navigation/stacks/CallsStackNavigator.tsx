import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Calls from '../../components/calls/Calls';
import { useTheme } from '@cometchat/chat-uikit-react-native';
import { View } from 'react-native';
import { CallDetails } from '../../components/calls/CallDetails';
import { CallStackParamList } from '../types';
import { SCREEN_CONSTANTS } from '../../utils/AppConstants';

const CallsStack = createStackNavigator<CallStackParamList>();

const CallsStackNavigator = () => {
  const theme = useTheme();
  return (
    <CallsStack.Navigator
      initialRouteName={SCREEN_CONSTANTS.CALL_LOGS}
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
      }}>
      <CallsStack.Screen name={SCREEN_CONSTANTS.CALL_LOGS} component={Calls} />
      <CallsStack.Screen name={SCREEN_CONSTANTS.CALL_DETAILS} component={CallDetails} />
    </CallsStack.Navigator>
  );
};

export default CallsStackNavigator;
