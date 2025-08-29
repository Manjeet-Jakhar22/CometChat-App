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
        d='M5.308 21.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.308q0-.758.525-1.283T5.308 4.5h1.384V3.154q0-.329.22-.55a.75.75 0 0 1 .55-.22q.328 0 .549.22.22.221.22.55V4.5h7.577V3.135q0-.32.215-.535a.73.73 0 0 1 .535-.215q.319 0 .534.215a.73.73 0 0 1 .216.535V4.5h1.384q.758 0 1.283.525t.525 1.283v13.384q0 .758-.525 1.283t-1.283.525zm0-1.5h13.384a.3.3 0 0 0 .212-.096.3.3 0 0 0 .096-.212v-9.384H5v9.384q0 .116.096.212a.3.3 0 0 0 .212.096'
      />
    </G>
  </Svg>
);
export default SvgComponent;
