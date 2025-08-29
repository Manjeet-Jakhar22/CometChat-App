import { ChatConfigurator, DataSource, ExtensionsDataSource } from "../../shared/framework";
import { ExtensionConstants } from "../ExtensionConstants";
import { MessageTranslationBubble } from "./MessageTranslationBubble";
import { MessageTranslationExtensionDecorator } from "./MessageTranslationDecorator";

export class MessageTranslationExtension extends ExtensionsDataSource {
  constructor() {
    super();
  }

  /**
   * enable
   *  @description enables the Text moderation extension which includes Data profanity and data masking
   */

  //override addExtension method from ExtensionsDataSource interface
  override addExtension(): void {
    ChatConfigurator.enable((dataSource: DataSource) => {
      return new MessageTranslationExtensionDecorator(
        dataSource
      );
    });
  }

  //override getExtensionId method from ExtensionsDataSource interface
  override getExtensionId(): string {
    return ExtensionConstants.messageTranslation;
  }
}
