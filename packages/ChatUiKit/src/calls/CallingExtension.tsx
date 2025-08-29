import { CometChat } from "@cometchat/chat-sdk-react-native";
import { CometChatUIKit } from "../shared/CometChatUiKit/CometChatUIKit";
import { ChatConfigurator, ExtensionsDataSource } from "../shared/framework";
import { CallingConfiguration } from "./CallingConfiguration";
import { CallingExtensionDecorator } from "./CallingExtensionDecorator";
import { CallingPackage } from "./CallingPackage";

const CometChatCalls = CallingPackage.CometChatCalls;

export class CallingExtension extends ExtensionsDataSource {
  configuration?: CallingConfiguration;

  CallingExtension({ configuration }: { configuration?: CallingConfiguration }) {
    if (configuration) this.configuration = configuration;
  }

  constructor(configuration?: CallingConfiguration ) {
    super();
    if (configuration) this.configuration = configuration;
  }

  enable() {
    this.addExtension();
  }

  override addExtension(): void {
    ChatConfigurator.enable((dataSource) => {
      const callAppSettings = new CometChatCalls.CallAppSettingsBuilder()
        .setAppId(CometChatUIKit.uiKitSettings.appId)
        .setRegion(CometChatUIKit.uiKitSettings.region)
        .build();

      CometChatCalls.init(callAppSettings).then(
        () => {
          console.log("CometChatCalls initialization completed successfully");
        },
        (error: CometChat.CometChatException) => {
          console.log("CometChatCalls initialization failed with error:", error);
        }
      );
      return new CallingExtensionDecorator({
        dataSource,
        configuration: this.configuration,
      });
    });
  }

  override getExtensionId(): string {
    return "calling";
  }
}
