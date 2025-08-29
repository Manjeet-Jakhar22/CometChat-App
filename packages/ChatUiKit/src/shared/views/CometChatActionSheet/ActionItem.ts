import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { ActionSheetStyle } from "../../../theme/type";
import { JSX } from "react";

export interface ActionItemInterface {
  id: string;
  title?: string;
  icon?: JSX.Element | ImageSourcePropType;
  onPress?: Function;
  style?: Partial<{
    containerStyle: ViewStyle;
    iconStyle: ImageStyle;
    iconContainerStyle: ViewStyle;
    titleStyle: TextStyle;
  }>;
}
