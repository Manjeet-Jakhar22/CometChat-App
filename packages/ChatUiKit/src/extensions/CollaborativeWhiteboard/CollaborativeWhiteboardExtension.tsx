import { ChatConfigurator, DataSource, ExtensionsDataSource } from "../../shared/framework";
import { ExtensionConstants } from "../ExtensionConstants";
import { CollaborativeWhiteboardExtensionDecorator } from "./CollaborativeWhiteboardExtensionDecorator";

export class CollaborativeWhiteboardExtension extends ExtensionsDataSource {
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
      return new CollaborativeWhiteboardExtensionDecorator(
        dataSource
      );
    });
  }

  //override getExtensionId method from ExtensionsDataSource interface
  override getExtensionId(): string {
    return ExtensionConstants.whiteboard;
  }
}
