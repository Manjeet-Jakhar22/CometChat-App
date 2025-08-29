import React from 'react';
import {View} from 'react-native';
import {
  CometChatGroupMembers,
  useTheme,
} from '@cometchat/chat-uikit-react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {ChatStackParamList} from '../../../navigation/types';

const ViewMembers: React.FC = () => {
  const route = useRoute<RouteProp<ChatStackParamList, 'ViewMembers'>>();
  const navigation = useNavigation();
  const {group} = route.params;
  const theme = useTheme();

  return (
    <View style={[{flex: 1, backgroundColor: theme.color.background1}]}>
      <CometChatGroupMembers
        group={group}
        onBack={() => {
          navigation.goBack();
        }}
        selectionMode="none"
        showBackButton={true}
      />
    </View>
  );
};

export default ViewMembers;
