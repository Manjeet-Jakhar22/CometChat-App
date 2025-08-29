import {CometChatCallLogs, useTheme} from '@cometchat/chat-uikit-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CallStackParamList} from '../../navigation/types';

type CallNavigationProp = StackNavigationProp<CallStackParamList, 'CallLogs'>;

const Calls: React.FC = () => {
  const [shouldHide, setShouldHide] = React.useState(false);
  const navigation = useNavigation<CallNavigationProp>();

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

  const theme = useTheme();
  const onItemPress = (item: any) => {
    navigation.navigate('CallDetails', {
      call: item,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.color.background1}}>
      {!shouldHide && <CometChatCallLogs onItemPress={onItemPress}/>}
    </View>
  );
};

export default Calls;
