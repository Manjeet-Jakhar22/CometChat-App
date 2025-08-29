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
        fillRule='evenodd'
        d='M3.265 18.975q.525.525 1.283.525h11.385q.757 0 1.282-.525t.525-1.283v-4.577l2.746 2.746q.221.222.497.111.276-.11.276-.422v-7.1q0-.311-.276-.422t-.497.11l-2.746 2.747V6.308q0-.758-.525-1.283a1.75 1.75 0 0 0-1.283-.525H4.548q-.758 0-1.283.525T2.74 6.308v11.384q0 .758.525 1.283M8.725 9.5h2.196l-4.704 4.704A.72.72 0 0 0 6 14.73q0 .31.217.527a.7.7 0 0 0 .532.212.72.72 0 0 0 .522-.212l4.704-4.704v2.196q0 .319.215.534a.73.73 0 0 0 .534.216q.32 0 .535-.216a.73.73 0 0 0 .216-.534V8.904a.87.87 0 0 0-.26-.644.87.87 0 0 0-.644-.26H8.725a.73.73 0 0 0-.535.215.73.73 0 0 0-.215.535q0 .318.215.534a.73.73 0 0 0 .535.216'
        clipRule='evenodd'
      />
    </G>
  </Svg>
);
export default SvgComponent;
