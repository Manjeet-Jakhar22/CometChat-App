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
        d='M10.96 15.267q.18 0 .336-.065a.9.9 0 0 0 .296-.206l2.994-3.019a.74.74 0 0 0 .22-.514.7.7 0 0 0-.22-.54.72.72 0 0 0-.527-.217.72.72 0 0 0-.526.217l-2.573 2.592-2.816-2.784h1.134a.73.73 0 0 0 .535-.216.73.73 0 0 0 .215-.534.73.73 0 0 0-.215-.535.73.73 0 0 0-.535-.215H6.432a.88.88 0 0 0-.645.258.88.88 0 0 0-.258.646v2.846q0 .319.215.534a.73.73 0 0 0 .534.216.73.73 0 0 0 .535-.216.73.73 0 0 0 .215-.534v-1.258l3.299 3.298a.8.8 0 0 0 .296.193q.156.053.337.053M4.548 19.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.308q0-.758.525-1.283T4.548 4.5h11.385q.757 0 1.282.525t.525 1.283v4.577l2.746-2.746q.221-.222.497-.111.276.11.276.422v7.1q0 .311-.276.422t-.497-.11l-2.746-2.747v4.577q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
