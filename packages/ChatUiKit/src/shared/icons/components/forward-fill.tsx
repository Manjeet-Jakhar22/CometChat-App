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
        d='m19.377 11-4.058-4.058a.74.74 0 0 1-.233-.534q0-.303.233-.535a.75.75 0 0 1 .54-.213.72.72 0 0 1 .514.213l4.494 4.494a.83.83 0 0 1 .256.633.829.829 0 0 1-.256.633l-4.494 4.494a.7.7 0 0 1-.527.225.78.78 0 0 1-.527-.225.74.74 0 0 1-.235-.532.7.7 0 0 1 .22-.522zm-5.308.75H7.25a3.13 3.13 0 0 0-2.298.952A3.13 3.13 0 0 0 4 15v2.75a.73.73 0 0 1-.216.535.73.73 0 0 1-.534.215.73.73 0 0 1-.534-.215.73.73 0 0 1-.216-.535V15q0-1.97 1.39-3.36t3.36-1.39h6.82L10.76 6.942a.74.74 0 0 1-.232-.534q0-.303.232-.535a.75.75 0 0 1 .54-.213.72.72 0 0 1 .515.213l4.493 4.494a.83.83 0 0 1 .256.633.83.83 0 0 1-.256.633l-4.493 4.494a.7.7 0 0 1-.527.225.78.78 0 0 1-.527-.225.74.74 0 0 1-.236-.532.7.7 0 0 1 .22-.522z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
