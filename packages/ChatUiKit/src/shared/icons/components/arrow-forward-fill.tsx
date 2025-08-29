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
        d='M16.627 12.75H5.25a.73.73 0 0 1-.535-.216A.73.73 0 0 1 4.5 12q0-.32.215-.534a.73.73 0 0 1 .535-.216h11.377l-5.17-5.17a.7.7 0 0 1-.22-.521q.003-.3.236-.532A.78.78 0 0 1 12 4.802a.7.7 0 0 1 .527.225l6.34 6.34a.83.83 0 0 1 .256.633.828.828 0 0 1-.256.633l-6.34 6.34a.72.72 0 0 1-.514.213.75.75 0 0 1-.54-.213.74.74 0 0 1-.232-.534q0-.303.232-.535z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
