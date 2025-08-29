import {CometChatTheme} from '@cometchat/chat-uikit-react-native/src/theme/type';
import {StackNavigationProp} from '@react-navigation/stack';
import {Platform, View, Text} from 'react-native';
import {CallStackParamList, ChatStackParamList} from './types';

type ChatNav = StackNavigationProp<
  ChatStackParamList,
  'CreateConversation' | 'Messages'
>;
type CallNav = StackNavigationProp<CallStackParamList, 'CallDetails'>;

export const toggleBottomTab = (
  navigation: ChatNav | CallNav,
  theme: CometChatTheme,
) => {
  navigation.getParent()?.setOptions({
    tabBarStyle: {
      height: 0,
      opacity: 0,
    },
  });

  return () => {
    if (navigation.getState().routes.length > 1) {
      return;
    }
    const parentState = navigation.getParent()?.getState();
    const parentRouteName =
      parentState?.routes[parentState.index]?.name ?? 'Chats'; // Default to "Chats" tab

    navigation.getParent()?.setOptions({
      tabBarStyle: {
        height: Platform.OS === 'ios' ? 80 : 70,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        paddingTop: 15,
        borderTopWidth: 0,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: theme.color.background1,
        marginBottom: Platform.OS === 'ios' ? 8 : 0,
      },
      tabBarLabel: ({focused}: {focused: boolean}) =>
        focused ? (
          <View>
            <Text
              style={[
                {
                  fontSize: 12,
                  marginBottom: 5,
                },
                {color: '#6852D6'},
              ]}>
              {parentRouteName}
            </Text>
          </View>
        ) : null,
    });
  };
};
