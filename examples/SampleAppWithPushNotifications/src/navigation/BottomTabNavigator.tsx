import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import {useTheme, Icon} from '@cometchat/chat-uikit-react-native';

import ChatStackNavigator from './stacks/ChatStackNavigator';
import CallsStackNavigator from './stacks/CallsStackNavigator';
import GroupStackNavigator from './stacks/GroupStackNavigator';
import UserStackNavigator from './stacks/UserStackNavigator';
import {BottomTabParamList} from './types';
import {SCREEN_CONSTANTS} from '../utils/AppConstants';

import ChatFill from '../assets/icons/Chatfill';
import Chat from '../assets/icons/Chat';
import PersonFill from '../assets/icons/PersonFill';
import Person from '../assets/icons/Person';
import GroupFill from '../assets/icons/GroupFill';
import CallFill from '../assets/icons/CallFill';
import Call from '../assets/icons/Call';
import Group from '../assets/icons/Group';

// Create the tab navigator.
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Define a type for icon components that accept color, height, and width props.
type IconComponentType = React.ComponentType<{
  color?: string;
  height?: number;
  width?: number;
}>;

// Update the icons mapping to use the imported image components.
const icons: Record<
  string,
  {active: IconComponentType; inactive: IconComponentType}
> = {
  Chats: {active: ChatFill, inactive: Chat},
  Users: {active: PersonFill, inactive: Person},
  Calls: {active: CallFill, inactive: Call},
  Groups: {active: GroupFill, inactive: Group},
};

const CustomTabBarButton = ({children, onPress}: BottomTabBarButtonProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.tabButton}>{children}</View>
  </TouchableWithoutFeedback>
);

const BottomTabNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        animation: 'none',
        tabBarIcon: ({focused}) => {
          const iconSet = icons[route.name];
          if (!iconSet) return null;

          const IconComponent = focused ? iconSet.active : iconSet.inactive;
          const iconColor = focused
            ? theme.color.primary
            : theme.color.iconSecondary;

          return (
            <Icon
              icon={
                <IconComponent
                  color={iconColor as string}
                  height={24}
                  width={24}
                />
              }
            />
          );
        },
        tabBarShowLabel: true,
        tabBarLabel: ({focused}) =>
          focused ? (
            <View>
              <Text style={[styles.tabLabel, {color: theme.color.primary}]}>
                {route.name}
              </Text>
            </View>
          ) : null,
        tabBarButton: props => <CustomTabBarButton {...props} />,
        tabBarBackground: () => (
          <View style={{backgroundColor: theme.color.background1, flex: 1}} />
        ),
      })}>
      <Tab.Screen
        name={SCREEN_CONSTANTS.CHATS}
        component={ChatStackNavigator}
      />
      <Tab.Screen
        name={SCREEN_CONSTANTS.CALLS}
        component={CallsStackNavigator}
      />
      <Tab.Screen
        name={SCREEN_CONSTANTS.USERS}
        component={UserStackNavigator}
      />
      <Tab.Screen
        name={SCREEN_CONSTANTS.GROUPS}
        component={GroupStackNavigator}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 80 : 70,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 15,
    borderTopWidth: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
  },
  tabLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabNavigator;
