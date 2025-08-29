import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  BackHandler,
  Platform,
} from 'react-native';
import {
  CometChatUIKit,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatMessageComposer,
  useTheme,
  CometChatUIEventHandler,
  CometChatUIEvents,
  localize,
} from '@cometchat/chat-uikit-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '../../../navigation/types';
import {Icon} from '@cometchat/chat-uikit-react-native';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import InfoIcon from '../../../assets/icons/InfoIcon';
import {toggleBottomTab} from '../../../navigation/helper';
import {CommonUtils} from '../../../utils/CommonUtils';
import Info from '../../../assets/icons/Info';
import {useActiveChat} from '../../../utils/ActiveChatContext';

type Props = StackScreenProps<ChatStackParamList, 'Messages'>;

const Messages: React.FC<Props> = ({route, navigation}) => {
  const {user, group} = route.params;
  const loggedInUser = useRef<CometChat.User>(
    CometChatUIKit.loggedInUser!,
  ).current;
  const theme = useTheme();
  const themeRef = useRef(theme);
  const navigationRef = useRef(navigation);
  const routeRef = useRef(route);
  const userListenerId = 'app_messages' + new Date().getTime();
  const openmessageListenerId = 'message_' + new Date().getTime();
  const [localUser, setLocalUser] = useState<CometChat.User | undefined>(user);
  const {setActiveChat} = useActiveChat();

  useEffect(() => {
    // if it’s a user chat
    if (user) {
      setActiveChat({type: 'user', id: user.getUid()});
    } else if (group) {
      setActiveChat({type: 'group', id: group.getGuid()});
    }

    // Cleanup on unmount => setActiveChat(null)
    return () => {
      setActiveChat(null);
    };
  }, [user, group, setActiveChat]);

  useEffect(() => {
    themeRef.current = theme;
    navigationRef.current = navigation;
    routeRef.current = route;
  }, [theme, navigation, route]);

  const toggleTab = useCallback(() => {
    return toggleBottomTab(navigationRef.current, themeRef.current);
  }, [theme, navigation, route]);

  useLayoutEffect(() => {
    const cleanup = toggleTab();
    return () => {
      cleanup();
    };
  }, [toggleTab]);

  useEffect(() => {
    const backAction = () => {
      navigation.popToTop();
      return true;
    };
    // Add event listener for hardware back press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    CometChatUIEventHandler.addUserListener(userListenerId, {
      ccUserBlocked: (item: {user: CometChat.User}) =>
        handleccUserBlocked(item),
      ccUserUnBlocked: (item: {user: CometChat.User}) =>
        handleccUserUnBlocked(item),
    });

    CometChatUIEventHandler.addUIListener(openmessageListenerId, {
      openChat: ({user}) => {
        if (user != undefined) {
          navigation.push('Messages', {
            user,
          });
        }
      },
    });

    return () => {
      CometChatUIEventHandler.removeUserListener(userListenerId);
      CometChatUIEventHandler.removeUIListener(openmessageListenerId);
    };
  }, [localUser]);

  const handleccUserBlocked = ({user}: {user: CometChat.User}) => {
    setLocalUser(CommonUtils.clone(user));
  };

  const handleccUserUnBlocked = ({user}: {user: CometChat.User}) => {
    setLocalUser(CommonUtils.clone(user));
  };

  const unblock = async (userToUnblock: CometChat.User) => {
    let uid = userToUnblock.getUid();
    try {
      const response = await CometChat.unblockUsers([uid]);
      const unBlockedUser = await CometChat.getUser(uid);
      if (response) {
        setLocalUser(unBlockedUser);

        // Optionally emit an event or let the server call do the job
        CometChatUIEventHandler.emitUserEvent(
          CometChatUIEvents.ccUserUnBlocked,
          {
            user: unBlockedUser,
          },
        );
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  // Define app bar options
  const getTrailingView = ({
    user,
    group,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
  }) => {
    if (group) {
      if (!loggedInUser) {
        return <></>;
      }
      return (
        <View style={styles.appBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GroupInfo', {
                group: group,
              });
            }}>
            <Icon
              icon={
                <Info color={theme.color.iconPrimary} height={24} width={24} />
              }
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (user && !user.getBlockedByMe()) {
      return (
        <View style={styles.appBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserInfo', {
                user: user,
              });
            }}>
            <Icon
              icon={
                <InfoIcon
                  color={theme.color.iconPrimary}
                  height={24}
                  width={24}
                />
              }
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View style={styles.flexOne}>
      <CometChatMessageHeader
        user={localUser}
        group={group}
        onBack={() => {
          navigation.popToTop();
        }}
        TrailingView={getTrailingView}
        showBackButton={true}
      />
      <View style={styles.flexOne}>
        <CometChatMessageList
          user={user}
          group={group}
          onThreadRepliesPress={(msg: CometChat.BaseMessage, view: any) => {
            navigation.navigate('ThreadView', {
              message: msg,
              user: user,
              group: group,
            });
          }}
        />
      </View>
      {localUser?.getBlockedByMe() ? (
        <View
          style={[
            styles.blockedContainer,
            {backgroundColor: theme.color.background3},
          ]}>
          <Text
            style={[
              theme.typography.button.regular,
              {
                color: theme.color.textSecondary,
                textAlign: 'center',
                paddingBottom: 10,
              },
            ]}>
            {localize('BLOCKED_USER_DESC')}
          </Text>
          <TouchableOpacity
            onPress={() => unblock(localUser)}
            style={[styles.button, {borderColor: theme.color.borderDefault}]}>
            <Text
              style={[
                theme.typography.button.medium,
                styles.buttontext,
                {
                  color: theme.color.textPrimary,
                },
              ]}>
              {localize('UNBLOCK')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CometChatMessageComposer
          user={localUser}
          group={group}
          keyboardAvoidingViewProps={{
            ...(Platform.OS === 'android'
              ? {}
              : {
                  behavior: 'padding',
                }),
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  blockedContainer: {
    alignItems: 'center',
    height: 90,
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    width: '90%',
    borderRadius: 8,
  },
  buttontext: {
    paddingVertical: 5,
    textAlign: 'center',
    alignContent: 'center',
  },
  appBarContainer: {
    flexDirection: 'row',
    marginLeft: 16,
  },
});

export default Messages;
