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
        d='M4.548 19.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.308q0-.758.525-1.283T4.548 4.5h11.385q.757 0 1.282.525t.525 1.283v4.577l2.746-2.746q.221-.222.497-.111.276.11.276.422v7.1q0 .311-.276.422t-.497-.11l-2.746-2.747v4.577q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
