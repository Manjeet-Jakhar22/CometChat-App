import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import { useTheme } from "@cometchat/chat-uikit-react-native";
import { navigationRef } from "./NavigationService";
import SampleUser from "../components/login/SampleUser";
import AppCredentials from "../components/login/AppCredentials";
import { Platform, StatusBar, useColorScheme } from "react-native";
import { SCREEN_CONSTANTS } from "../utils/AppConstants";
import Messages from "../components/conversations/screens/Messages";
import UserInfo from "../components/conversations/screens/UserInfo";
import GroupInfo from "../components/conversations/screens/GroupInfo";
import ThreadView from "../components/conversations/screens/ThreadView";
import AddMember from "../components/conversations/screens/AddMember";
import BannedMember from "../components/conversations/screens/BannedMember";
import SavedMessagesScreen from "../components/conversations/screens/SavedMessagesScreen";
import PinnedMessagesScreen from "../components/conversations/screens/PinnedMessagesScreen";
import { CallDetails } from "../components/calls/CallDetails";
import CreateConversation from "../components/conversations/screens/CreateConversation";
import TransferOwnership from "../components/conversations/screens/TransferOwnership";
import ViewMembers from "../components/conversations/screens/ViewMembers";
import {
  setBackgroundColorAsync,
  setButtonStyleAsync,
} from "expo-navigation-bar";

type Props = {
  isLoggedIn: boolean;
  hasValidAppCredentials: boolean;
};

const Stack = createStackNavigator();

const RootStackNavigator = ({ isLoggedIn, hasValidAppCredentials }: Props) => {
  const theme = useTheme();
  const NavigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.color.background1 as string,
    },
  };

  const isDark = useColorScheme() === "dark";
  const backgroundColor = theme.color.background2;
  const navBarColor = theme.color.background2 as string;
  const barStyle = isDark ? "light-content" : "dark-content";

  useEffect(() => {
    if (Platform.OS === "android") {
      (async () => {
        try {
          await setBackgroundColorAsync(navBarColor);
          await setButtonStyleAsync(isDark ? "light" : "dark");
        } catch (error) {
          console.warn("NavigationBar error:", error);
        }
      })();
    }
  }, [navBarColor, isDark]);

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={false}
      />
      <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
        <Stack.Navigator
          id={undefined}
          initialRouteName={
            isLoggedIn
              ? SCREEN_CONSTANTS.BOTTOM_TAB_NAVIGATOR
              : hasValidAppCredentials
                ? SCREEN_CONSTANTS.SAMPLER_USER
                : SCREEN_CONSTANTS.APP_CRED
          }
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name={SCREEN_CONSTANTS.BOTTOM_TAB_NAVIGATOR}
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.APP_CRED}
            component={AppCredentials}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.SAMPLER_USER}
            component={SampleUser}
          />
          <Stack.Screen name={SCREEN_CONSTANTS.MESSAGES} component={Messages} />
          <Stack.Screen
            name={SCREEN_CONSTANTS.USER_INFO}
            component={UserInfo}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.GROUP_INFO}
            component={GroupInfo}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.THREAD_VIEW}
            component={ThreadView}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.BANNED_MEMBER}
            component={BannedMember}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.SAVED_MESSAGES}
            component={SavedMessagesScreen}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.PINNED_MESSAGES}
            component={PinnedMessagesScreen}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.CALL_DETAILS}
            component={CallDetails}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.CREATE_CONVERSATION}
            component={CreateConversation}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.TRANSFER_OWNERSHIP}
            component={TransferOwnership}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.VIEW_MEMBER}
            component={ViewMembers}
          />
          <Stack.Screen
            name={SCREEN_CONSTANTS.ADD_MEMBER}
            component={AddMember}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootStackNavigator;
