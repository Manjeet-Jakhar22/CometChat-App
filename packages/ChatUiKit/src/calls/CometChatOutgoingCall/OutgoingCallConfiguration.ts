import { CometChat } from "@cometchat/chat-sdk-react-native";
import { CallingPackage } from "../CallingPackage";
import { OutgoingCallStyle } from ".";
import { DeepPartial } from "../../shared/helper/types";
import { JSX } from "react";

const CometChatCalls = CallingPackage.CometChatCalls;
export class OutgoingCallConfiguration {
  disableSoundForCalls?: boolean;
  customSoundForCalls?: string;
  callSettingsBuilder?: typeof CometChatCalls.CallSettingsBuilder; // TODO: maybe not required
  onEndCallButtonPressed?: (call: CometChat.Call) => void;
  style?: DeepPartial<OutgoingCallStyle>;
  TitleView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
  SubtitleView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
  AvatarView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
  EndCallView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;

  constructor(params: {
    disableSoundForCalls?: boolean;
    customSoundForCalls?: string;
    callSettingsBuilder?: typeof CometChatCalls.CallSettingsBuilder;
    onEndCallButtonPressed?: (call: CometChat.Call) => void;
    style?: DeepPartial<OutgoingCallStyle>;
    TitleView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
    SubtitleView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
    AvatarView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
    EndCallView?: (call: CometChat.Call | CometChat.CustomMessage) => JSX.Element;
  }) {
    this.disableSoundForCalls = params.disableSoundForCalls;
    this.customSoundForCalls = params.customSoundForCalls;
    this.callSettingsBuilder = params.callSettingsBuilder;
  }
}
