import React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const UnsaveIcon = ({ height = 24, width = 24, color = "#141414" }: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 99.7 99.7" fill="none">
    <Path
      d="M73,30.1L50.4,20c-0.4-0.2-0.8-0.2-1.2,0L26.7,30.1c-0.5,0.2-0.9,0.8-0.9,1.4v18.9c0,10.2,5.5,19.5,14.4,24.4l8.8,4.8
      c0.4,0.2,1,0.2,1.4,0l8.8-4.8c8.9-4.9,14.4-14.2,14.4-24.4V31.5C73.8,30.9,73.5,30.4,73,30.1z M70.8,50.4c0,9.1-4.9,17.4-12.9,21.8
      l-8.1,4.4l-8.1-4.4c-7.9-4.4-12.9-12.7-12.9-21.8v-18l21-9.5l21,9.5L70.8,50.4z"
      fill={color}
    />
    <Path
      d="M43.9,41.8c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1l5.9,5.9l-5.9,5.9c-0.6,0.6-0.6,1.5,0,2.1
      c0.6,0.6,1.5,0.6,2.1,0l5.9-5.9l5.9,5.9c0.6,0.6,1.5,0.6,2.1,0s0.6-1.5,0-2.1L52,49.8l5.9-5.9c0.6-0.6,0.6-1.5,0-2.1
      s-1.5-0.6-2.1,0l-5.9,5.9L43.9,41.8z"
      fill={color}
    />
  </Svg>
);

export default UnsaveIcon;
