import {CometChat} from '@cometchat/chat-sdk-react-native';
import {CometChatUsers, useTheme} from '@cometchat/chat-uikit-react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {UserStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

type UserNavigationProp = StackNavigationProp<UserStackParamList, 'Users'>;

const Users: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<UserNavigationProp>();
  const [shouldHide, setShouldHide] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      setShouldHide(false);
      return () => {
        //Cleanup runs when out of focus and route length 1 means tab switch and not screen change
        //getState() always returns the latest state
        if (navigation.getState().routes.length == 1) {
          setShouldHide(true);
        }
      };
    }, []),
  );

  return shouldHide ? null : (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.background1}}>
      <CometChatUsers
        onItemPress={(user: CometChat.User) => {
          navigation.navigate('Messages', {
            user: user,
          });
        }}
        usersRequestBuilder={new CometChat.UsersRequestBuilder()
          .setLimit(30)
          .hideBlockedUsers(false)
          .setRoles([])
          .friendsOnly(false)
          .setStatus('')
          .setTags([])
          .sortBy('name')
          .setUIDs([])}
      />
    </SafeAreaView>
  );
};

export default Users;
