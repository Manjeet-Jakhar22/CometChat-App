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
        d='m12 17.462-3.97 1.703q-.903.387-1.716-.148-.814-.534-.814-1.503V5.308q0-.758.525-1.283T7.308 3.5h9.384q.758 0 1.283.525t.525 1.283v12.206q0 .969-.814 1.503-.813.535-1.717.148z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
