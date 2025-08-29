import {CometChatNotifications} from '@cometchat/chat-sdk-react-native';
import {Platform} from 'react-native';
import {AppConstants} from './AppConstants';

// Determine the push platform based on FCM and VoIP flags
const getPushPlatform = (isFcm: boolean, isVoip: boolean) => {
  if (isFcm) {
    return Platform.OS === 'android'
      ? CometChatNotifications.PushPlatforms.FCM_REACT_NATIVE_ANDROID
      : CometChatNotifications.PushPlatforms.FCM_REACT_NATIVE_IOS;
  } else {
    return isVoip
      ? CometChatNotifications.PushPlatforms.APNS_REACT_NATIVE_VOIP
      : CometChatNotifications.PushPlatforms.APNS_REACT_NATIVE_DEVICE;
  }
};

// Get the provider ID based on FCM
const getProviderId = (isFcm: boolean) => {
  return isFcm ? AppConstants.fcmProviderId : AppConstants.apnsProviderId;
};

export const registerPushToken = async (
  token: string,
  isFcm = true,
  isVoip = false,
) => {
  try {
    const platform = getPushPlatform(isFcm, isVoip);
    const providerId = getProviderId(isFcm);
    console.log('Push Platform:', platform);

    const response = await CometChatNotifications.registerPushToken(
      token,
      platform,
      providerId,
    );

    console.log('registerPushToken:success', response);
    return response;
  } catch (error) {
    console.error('registerPushToken:error', error);
    return null;
  }
};

// Unregister Push Token from CometChat
export const unregisterPushToken = async () => {
  try {
    const response = await CometChatNotifications.unregisterPushToken();
    console.log('unregisterPushToken:success', response);
    return response;
  } catch (error) {
    console.error('unregisterPushToken:error', error);
    return null;
  }
};
