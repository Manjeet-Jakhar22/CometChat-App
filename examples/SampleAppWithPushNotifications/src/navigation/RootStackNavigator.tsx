import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import OngoingCallScreen from '../components/conversations/screens/OngoingCallScreen';
import {SCREEN_CONSTANTS} from '../utils/AppConstants';
import {useTheme} from '@cometchat/chat-uikit-react-native';
import {RootStackParamList} from './types';
import {navigationRef, processPendingNavigation} from './NavigationService';
import SampleUser from '../components/login/SampleUser';
import AppCredentials from '../components/login/AppCredentials';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import notifee from '@notifee/react-native';
import {navigateToConversation} from '../utils/helper';

type Props = {
  isLoggedIn: boolean;
  hasValidAppCredentials: boolean;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = ({isLoggedIn, hasValidAppCredentials}: Props) => {
  const theme = useTheme();
  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.color.background1 as string,
    },
  };

  const isDark = useColorScheme() === 'dark';
  const backgroundColor = theme.color.background2;
  const barStyle = isDark ? 'light-content' : 'dark-content';

  async function checkInitialNotification() {
    if (Platform.OS === 'android') {
      // Retrieve the initial notification that opened the app.
      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        const {notification} = initialNotification;

        // Cancel the notification if needed.
        if (notification?.id) {
          await notifee.cancelNotification(notification.id);
        }

        // Retrieve data attached to the notification.
        const data = notification?.data || {};
        navigateToConversation(navigationRef, data);
      }
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={false}
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          processPendingNavigation();
          checkInitialNotification(); // Check for initial notification (SampleAppWithPushNotifications)
        }}
        theme={NavigationTheme}>
        <Stack.Navigator
          initialRouteName={
            isLoggedIn
              ? SCREEN_CONSTANTS.BOTTOM_TAB_NAVIGATOR
              : hasValidAppCredentials
                ? SCREEN_CONSTANTS.SAMPLER_USER
                : SCREEN_CONSTANTS.APP_CRED
          }
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen
            name={SCREEN_CONSTANTS.BOTTOM_TAB_NAVIGATOR}
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.ONGOING_CALL_SCREEN}
            component={OngoingCallScreen}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.APP_CRED}
            component={AppCredentials}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.SAMPLER_USER}
            component={SampleUser}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStackNavigator;
