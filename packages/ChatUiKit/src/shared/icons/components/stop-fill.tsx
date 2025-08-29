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
        d='M6.5 15.692V8.308q0-.746.531-1.277A1.74 1.74 0 0 1 8.308 6.5h7.384q.746 0 1.277.531t.531 1.277v7.384q0 .746-.531 1.277a1.74 1.74 0 0 1-1.277.531H8.308a1.74 1.74 0 0 1-1.277-.531 1.74 1.74 0 0 1-.531-1.277'
      />
    </G>
  </Svg>
);
export default SvgComponent;
