import { CometChat } from "@cometchat/chat-sdk-react-native";
import { OutgoingCallConfiguration } from "../CometChatOutgoingCall";
import { CallingPackage } from "../CallingPackage";
const CometChatCalls = CallingPackage.CometChatCalls;

export interface CometChatCallButtonConfigurationInterface {
  callSettingsBuilder?: (
    user?: CometChat.User,
    group?: CometChat.Group,
    isAudioOnly?: boolean
  ) => typeof CometChatCalls.CallSettingsBuilder;
  outgoingCallConfiguration?: OutgoingCallConfiguration;
}

export class CometChatCallButtonConfiguration implements CometChatCallButtonConfigurationInterface {
  callSettingsBuilder?: (
    user?: CometChat.User,
    group?: CometChat.Group,
    isAudioOnly?: boolean
  ) => typeof CometChatCalls.CallSettingsBuilder;

  constructor({ callSettingsBuilder }: CometChatCallButtonConfigurationInterface) {
    this.callSettingsBuilder = callSettingsBuilder;
  }
}
