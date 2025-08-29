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
        d='M5.308 20.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V5.308q0-.758.525-1.283T5.308 3.5h13.384q.758 0 1.283.525t.525 1.283v13.384q0 .758-.525 1.283t-1.283.525zm2.346-3.75h8.769q.27 0 .402-.246a.42.42 0 0 0-.04-.477L14.4 12.833a.44.44 0 0 0-.361-.181.44.44 0 0 0-.362.18l-2.446 3.187-1.639-2.1a.44.44 0 0 0-.357-.171.43.43 0 0 0-.356.181l-1.577 2.098q-.18.231-.05.477a.43.43 0 0 0 .402.246'
      />
    </G>
  </Svg>
);
export default SvgComponent;
