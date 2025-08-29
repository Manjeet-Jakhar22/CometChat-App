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
        d='M6.308 21.5a1.74 1.74 0 0 1-1.277-.531 1.74 1.74 0 0 1-.531-1.277v-9.384q0-.746.531-1.277A1.74 1.74 0 0 1 6.308 8.5H15v-2q0-1.25-.875-2.125A2.9 2.9 0 0 0 12 3.5q-1.085 0-1.898.686a3 3 0 0 0-1.03 1.702.78.78 0 0 1-.304.444.85.85 0 0 1-.514.168.74.74 0 0 1-.538-.213.53.53 0 0 1-.16-.5q.217-1.595 1.475-2.69Q10.288 2 12 2q1.873 0 3.187 1.314Q16.5 4.626 16.5 6.5v2h1.192q.746 0 1.277.531t.531 1.277v9.384q0 .746-.531 1.277a1.74 1.74 0 0 1-1.277.531zM12 16.75q.729 0 1.24-.51.51-.511.51-1.24t-.51-1.24-1.24-.51-1.24.51q-.51.511-.51 1.24t.51 1.24 1.24.51'
      />
    </G>
  </Svg>
);
export default SvgComponent;
