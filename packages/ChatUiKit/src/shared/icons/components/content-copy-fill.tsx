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
        d='M9.058 17.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V4.308q0-.758.525-1.283T9.058 2.5h8.384q.758 0 1.283.525t.525 1.283v11.384q0 .758-.525 1.283t-1.283.525zm-3.5 3.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V7.058q0-.32.216-.535a.73.73 0 0 1 .534-.215q.32 0 .535.215a.73.73 0 0 1 .215.535v12.134q0 .116.096.212a.3.3 0 0 0 .212.096h9.134q.32 0 .535.215a.73.73 0 0 1 .215.535.73.73 0 0 1-.215.535.73.73 0 0 1-.535.215z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
