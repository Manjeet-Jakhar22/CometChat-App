import { CometChat } from "@cometchat/chat-sdk-react-native";
import { CometChatCallButtonConfiguration } from "./CometChatCallButtons";
import { CallingPackage } from "./CallingPackage";
const CometChatCalls = CallingPackage.CometChatCalls;
export class CallingConfiguration {
  callButtonsConfiguration?: CometChatCallButtonConfiguration;
  groupCallSettingsBuilder?: (
    user?: CometChat.User,
    group?: CometChat.Group,
    isAudioOnly?: boolean
  ) => typeof CometChatCalls.CallSettingsBuilder;

  constructor(params: {
    callButtonsConfiguration?: CometChatCallButtonConfiguration;
    groupCallSettingsBuilder?: (
      user?: CometChat.User,
      group?: CometChat.Group,
      isAudioOnly?: boolean
    ) => typeof CometChatCalls.CallSettingsBuilder;
  }) {
    this.callButtonsConfiguration = params.callButtonsConfiguration;
    this.groupCallSettingsBuilder = params.groupCallSettingsBuilder;
  }
}
