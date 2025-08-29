import { ChatConfigurator, DataSource, ExtensionsDataSource } from "../../shared/framework";
import { ExtensionConstants } from "../ExtensionConstants";
import { PollsConfigurationInterface } from "./PollsConfigurations";
import { PollsExtensionDecorator } from "./PollsDecorator";

export class PollsExtension extends ExtensionsDataSource {
  PollsConfigurationInterface?: PollsConfigurationInterface;

  constructor(PollsConfigurationConfiguration?: PollsConfigurationInterface) {
    super();
    if (PollsConfigurationConfiguration != null) {
      this.PollsConfigurationInterface = PollsConfigurationConfiguration;
    }
  }

  /**
   * enable
   *  @description enables the Text moderation extension which includes Data profanity and data masking
   */

  //override addExtension method from ExtensionsDataSource interface
  override addExtension(): void {
    ChatConfigurator.enable((dataSource: DataSource) => {
      return new PollsExtensionDecorator(dataSource, this.PollsConfigurationInterface);
    });
  }

  //override getExtensionId method from ExtensionsDataSource interface
  override getExtensionId(): string {
    return ExtensionConstants.polls;
  }
}
