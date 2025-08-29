import { ImageStyle } from "react-native";

export interface StickerConfigurationInterface {
  style?: ImageStyle;
}

export class StickerConfiguration implements StickerConfigurationInterface {
  style?: ImageStyle;

  constructor({ style = {} }: StickerConfigurationInterface) {
    this.style = style;
  }
}
