import React, { JSX } from "react";
import {
  ColorValue,
  DimensionValue,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../theme";
import { ICONS } from "./icon-mapping";

export type IconName = keyof typeof ICONS;

type IconProps = {
  name?: IconName;
  color?: ColorValue;
  size?: DimensionValue;
  height?: DimensionValue;
  width?: DimensionValue;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  icon?: ImageSourcePropType | JSX.Element;
};

export const Icon = (props: IconProps) => {
  const theme = useTheme();
  const {
    name,
    color = theme.color.textSecondary,
    containerStyle = {},
    height,
    width,
    size = theme.spacing.spacing.s6,
    imageStyle = { height: theme.spacing.spacing.s6, width: theme.spacing.spacing.s6 },
    icon = null,
  } = props;
  if (React.isValidElement(icon)) {
    return <View style={[containerStyle]}>{props.icon as JSX.Element}</View>;
  }
  if (props.icon) {
    const ImageComp = () => {
      if (typeof icon === "number") {
        return <Image source={icon} style={imageStyle} />;
      } else if (typeof icon === "string") {
        return <Image source={{ uri: icon }} style={imageStyle} />;
      }
      return <Image source={icon as ImageSourcePropType} style={imageStyle} />;
    };
    return (
      <View style={[containerStyle]}>
        <ImageComp />
      </View>
    );
  }
  if ("name" in props && name) {
    const IconComponent = ICONS[name];
    if (IconComponent) {
      return (
        <View style={[containerStyle]}>
          <IconComponent
            color={color}
            height={typeof height === "number" ? height : (size as number)}
            width={typeof width === "number" ? width : (size as number)}
          />
        </View>
      );
    }
  }
  return null;
};
