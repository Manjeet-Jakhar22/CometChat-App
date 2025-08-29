import { ChatConfigurator, DataSource, ExtensionsDataSource } from "../../shared/framework";
import { ExtensionConstants } from "../ExtensionConstants";
import { CollaborativeDocumentExtensionDecorator } from "./CollaborativeDocumentExtensionDecorator";

export class CollaborativeDocumentExtension extends ExtensionsDataSource {
  constructor() {
    super();
  }

  /**
   * enable
   *  @description enables the Document  extension which includes Data profanity and data masking
   */

  override addExtension(): void {
    ChatConfigurator.enable((dataSource: DataSource) => {
      return new CollaborativeDocumentExtensionDecorator(dataSource);
    });
  }

  override getExtensionId(): string {
    return ExtensionConstants.document;
  }
}
