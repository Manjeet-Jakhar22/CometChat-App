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
        d='m4.623 11 4.073 4.073a.7.7 0 0 1 .22.522.74.74 0 0 1-.235.532.78.78 0 0 1-.527.225.7.7 0 0 1-.527-.225l-4.494-4.494A.83.83 0 0 1 2.877 11q0-.18.058-.336a.8.8 0 0 1 .198-.297l4.494-4.494a.72.72 0 0 1 .514-.213.75.75 0 0 1 .54.213.74.74 0 0 1 .232.535q0 .302-.232.534zm5.308.75 3.323 3.323a.7.7 0 0 1 .22.522.74.74 0 0 1-.236.532.78.78 0 0 1-.527.225.7.7 0 0 1-.527-.225L7.69 11.633A.83.83 0 0 1 7.434 11q0-.18.058-.336a.8.8 0 0 1 .198-.297l4.494-4.494a.72.72 0 0 1 .515-.213.75.75 0 0 1 .54.213.74.74 0 0 1 .232.535q0 .302-.232.534L9.93 10.25h6.819q1.97 0 3.36 1.39T21.5 15v2.75a.73.73 0 0 1-.215.535.73.73 0 0 1-.535.215.73.73 0 0 1-.535-.215.73.73 0 0 1-.215-.535V15q0-1.347-.952-2.298a3.13 3.13 0 0 0-2.298-.952z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
