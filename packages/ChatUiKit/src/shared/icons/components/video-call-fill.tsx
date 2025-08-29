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
        d='M9.49 12.75V15q0 .319.216.534a.73.73 0 0 0 .535.216q.318 0 .534-.216A.73.73 0 0 0 10.99 15v-2.25h2.25q.319 0 .534-.216A.73.73 0 0 0 13.99 12a.73.73 0 0 0-.216-.534.73.73 0 0 0-.534-.216h-2.25V9a.73.73 0 0 0-.216-.534.73.73 0 0 0-.534-.216.73.73 0 0 0-.535.216A.73.73 0 0 0 9.49 9v2.25H7.24a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534q0 .32.216.534a.73.73 0 0 0 .534.216zM4.548 19.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.308q0-.758.525-1.283T4.548 4.5h11.385q.757 0 1.282.525t.525 1.283v4.577l2.75-2.75q.218-.217.493-.107.276.111.276.422v7.1q0 .31-.276.422-.275.11-.494-.107l-2.749-2.75v4.577q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
