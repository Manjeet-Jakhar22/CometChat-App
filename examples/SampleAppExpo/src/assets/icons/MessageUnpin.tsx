import React from "react";
import Svg, { Path, Polygon } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const MessageUnpin = ({ height = 24, width = 24, color = "#141414" }: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 100 125" fill="none">
    <Polygon
      points="60.08 51.23 60.08 20 64.29 20 64.29 15.79 34.81 15.79 34.81 20 39.02 20 39.02 31.94 34.81 27.73 34.81 24.2 31.28 24.2 30.6 23.52 30.6 11.57 68.5 11.57 68.5 24.2 64.29 24.2 64.29 49.48 72.71 57.9 72.71 57.91 72.71 65.63 68.5 61.42 68.5 59.65 60.08 51.23 60.08 51.23"
      fill={color}
    />
    <Path
      d="M15.86,14.74l-2.98,2.98,21.93,21.93v9.84l-8.42,8.42h0v8.42h21.06v18.96l2.11,6.32,2.11-6.32v-18.95h9.83l21.93,21.93,2.98-2.98L15.86,14.74Zm14.74,47.38v-2.47l8.43-8.42v-7.37l18.26,18.26H30.59Z"
      fill={color}
    />
  </Svg>
);

export default MessageUnpin;
