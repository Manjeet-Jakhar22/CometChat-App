import { ChatConfigurator, DataSource, ExtensionsDataSource } from "../../shared/framework";
import { ExtensionConstants } from "../ExtensionConstants";
import { LinkPreviewExtensionDecorator } from "./LinkPreviewExtensionDecorator";

export class LinkPreviewExtension extends ExtensionsDataSource {

  constructor() {
    super();
  }

  //override addExtension method from ExtensionsDataSource interface
  override addExtension(): void {
    ChatConfigurator.enable((dataSource: DataSource) => {
      return new LinkPreviewExtensionDecorator(dataSource);
    });
  }

  //override getExtensionId method from ExtensionsDataSource interface
  override getExtensionId(): string {
    return ExtensionConstants.linkPreview;
  }
}
