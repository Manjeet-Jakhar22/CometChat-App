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
        d='m7.373 12.75 5.17 5.17a.7.7 0 0 1 .22.521.74.74 0 0 1-.236.532.78.78 0 0 1-.527.225.7.7 0 0 1-.527-.225l-6.34-6.34A.83.83 0 0 1 4.877 12q0-.18.058-.336a.8.8 0 0 1 .198-.297l6.34-6.34a.72.72 0 0 1 .515-.213.75.75 0 0 1 .539.213.74.74 0 0 1 .232.534q0 .303-.232.535L7.373 11.25H18.75q.32 0 .535.216A.73.73 0 0 1 19.5 12a.73.73 0 0 1-.215.534.73.73 0 0 1-.535.216z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
