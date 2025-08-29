import { ChatConfigurator, DataSource, ExtensionsDataSource } from "../../shared/framework";
import { ThumbnailGenerationExtensionDecorator } from "./ThumbnailGenerationDecorator";
import { ExtensionConstants } from "../ExtensionConstants";

export class ThumbnailGenerationExtension extends ExtensionsDataSource {

  constructor(
  ) {
    super();
  }

  //override addExtension method from ExtensionsDataSource interface
  override addExtension(): void {
    ChatConfigurator.enable((dataSource: DataSource) => {
      return new ThumbnailGenerationExtensionDecorator(
        dataSource
      );
    });
  }

  //override getExtensionId method from ExtensionsDataSource interface
  override getExtensionId(): string {
    return ExtensionConstants.thumbnailGeneration;
  }
}
