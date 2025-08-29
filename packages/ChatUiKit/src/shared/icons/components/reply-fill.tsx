import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Mask
      id='prefix__a'
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill='#D9D9D9' d='M0 0h24v24H0z' />
    </Mask>
    <G mask='url(#prefix__a)'>
      <Path
        fill={color}
        d='m6.373 11.75 3.323 3.323a.7.7 0 0 1 .22.522.74.74 0 0 1-.235.532.78.78 0 0 1-.527.225.7.7 0 0 1-.527-.225l-4.494-4.494A.87.87 0 0 1 3.86 11q0-.361.272-.633l4.494-4.494a.72.72 0 0 1 .514-.213.75.75 0 0 1 .54.213.74.74 0 0 1 .232.535q0 .302-.232.534L6.373 10.25h9.377q1.97 0 3.36 1.39T20.5 15v2.75a.73.73 0 0 1-.216.535.73.73 0 0 1-.534.215.73.73 0 0 1-.535-.215.73.73 0 0 1-.215-.535V15a3.13 3.13 0 0 0-.952-2.298 3.13 3.13 0 0 0-2.298-.952z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
