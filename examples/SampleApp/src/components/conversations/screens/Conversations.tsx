import {CometChat} from '@cometchat/chat-sdk-react-native';
import React, {useCallback, useContext, useRef, useState} from 'react';
import {TouchableOpacity, View } from 'react-native';
import {
  CometChatAvatar,
  CometChatConversations,
  CometChatUIKit,
  useTheme,
} from '@cometchat/chat-uikit-react-native';
import {AuthContext} from '../../../navigation/AuthContext';
import {useFocusEffect, useNavigation, CommonActions} from '@react-navigation/native';
import {TooltipMenu} from '../../../utils/TooltipMenu';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatStackParamList} from '../../../navigation/types';
import AccountCircle from '../../../assets/icons/AccountCircle';
import AddComment from '../../../assets/icons/AddComment';
import InfoIcon from '../../../assets/icons/InfoIcon';
import Logout from '../../../assets/icons/Logout';
import { navigationRef } from '../../../navigation/NavigationService';
import { AppConstants } from '../../../utils/AppConstants';

type ChatNavigationProp = StackNavigationProp<
  ChatStackParamList,
  'Conversation'
>;

const Conversations: React.FC<{}> = ({}) => {
  const theme = useTheme();
  const {setIsLoggedIn: setLogout} = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const tooltipPositon = React.useRef({pageX: 0, pageY: 0});
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const selectedConversation = useRef<CometChat.Conversation | null>(null);
  const navigation = useNavigation<ChatNavigationProp>();
  const avatarContainerRef = useRef<View>(null);
  const loggedInUser = useRef<CometChat.User>(
    CometChatUIKit.loggedInUser,
  ).current;
  const [shouldHide, setShouldHide] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      setShouldHide(false);
      // This code runs when the screen is focused
      // Return a cleanup function that runs when the screen is blurred or unfocused
      return () => {
        //Cleanup runs when out of focus and route length 1 means tab switch and not screen change
        //getState() always returns the latest state
        if (navigation.getState().routes.length == 1) {
          setShouldHide(true);
          setTooltipVisible(false);
        }
      };
    }, []),
  );

  const openMessagesFor = (item: CometChat.Conversation) => {
    // Determine if it's a user or group conversation
    const isUser = item.getConversationType() === 'user';
    const isGroup = item.getConversationType() === 'group';

    // Navigate to Messages with appropriate params
    navigation.navigate('Messages', {
      user: isUser ? (item.getConversationWith() as CometChat.User) : undefined,
      group: isGroup
        ? (item.getConversationWith() as CometChat.Group)
        : undefined,
    });
  };

  const _conversationsConfig = {
    onItemPress: openMessagesFor,
    onError: (err: any) => {
      console.log('ERROR IN CONVO: ', err);
    },
  };

  const handleAvatarPress = () => {
    try {
      if (avatarContainerRef.current) {
        avatarContainerRef.current.measureInWindow((x, y, height) => {
          // Set tooltip position 10px below the avatar
          tooltipPositon.current = {pageX: x, pageY: y + height};
        });
        selectedConversation.current = null;
        setTooltipVisible(true);
      }
    } catch (error) {
      console.error('Error while handling avatar press:', error);
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    // Step 1: Logout from CometChat
    try {
      await CometChat.logout();
    } catch (error) {
      console.error('CometChat logout failed:', error);
      setIsLoggingOut(false);
      return; // Exit if CometChat logout fails
    }

    // If all operations succeed, navigate to the LoginScreen
    setIsLoggingOut(false);
    setLogout(false);
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SampleUser' }],
      }),
    );
  };

  const NewConversation = () => {
    return (
      <View ref={avatarContainerRef}>
        <TouchableOpacity
          onPress={() => {
            handleAvatarPress();
          }}>
          <CometChatAvatar
            style={{
              containerStyle: {
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              },
              textStyle: {
                fontSize: 22,
                lineHeight: 28,
                textAlign: 'center',
              },
            }}
            image={
              loggedInUser?.getAvatar()
                ? {uri: loggedInUser?.getAvatar()}
                : undefined
            }
            name={loggedInUser?.getName() ?? ''}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return shouldHide ? null : (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <CometChatConversations
          {..._conversationsConfig}
          AppBarOptions={NewConversation}
          selectionMode="none"
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: tooltipPositon.current.pageY,
          left: tooltipPositon.current.pageX,
          zIndex: 9999,
        }}>
        <TooltipMenu
          visible={tooltipVisible}
          onClose={() => {
            setTooltipVisible(false);
          }}
          onDismiss={() => {
            setTooltipVisible(false);
          }}
          event={{
            nativeEvent: tooltipPositon.current,
          }}
          menuItems={[
            {
              text: 'Create Conversation',
              onPress: () => {
                navigation.navigate('CreateConversation');
              },
              icon: (
                <AddComment
                  height={24}
                  width={24}
                  color={theme.color.textPrimary}></AddComment>
              ),
              textColor: theme.color.textPrimary,
              iconColor: theme.color.textPrimary,
            },
            {
              text: loggedInUser?.getName() || 'User',
              onPress: () => {
                setTooltipVisible(false);
              },
              icon: (
                <AccountCircle
                  height={24}
                  width={24}
                  color={theme.color.textPrimary}></AccountCircle>
              ),
              textColor: theme.color.textPrimary,
              iconColor: theme.color.textPrimary,
            },
            {
              text: 'Logout',
              onPress: () => {
                handleLogout();
              },
              icon: (
                <Logout
                  height={24}
                  width={24}
                  color={theme.color.error}></Logout>
              ),
              textColor: theme.color.error,
              iconColor: theme.color.error,
            },
            {
              text: AppConstants.versionNumber,
              onPress: () => {},
              icon: (
                <InfoIcon
                  height={24}
                  width={24}
                  color={theme.color.textPrimary}></InfoIcon>
              ),
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Conversations;
