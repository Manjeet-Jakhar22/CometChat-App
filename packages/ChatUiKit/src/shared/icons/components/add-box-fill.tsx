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
        d='M11.25 12.75V16q0 .318.216.534a.73.73 0 0 0 .534.216q.32 0 .534-.216A.73.73 0 0 0 12.75 16v-3.25H16q.318 0 .534-.216A.73.73 0 0 0 16.75 12a.73.73 0 0 0-.216-.534.73.73 0 0 0-.534-.216h-3.25V8a.73.73 0 0 0-.216-.534A.73.73 0 0 0 12 7.25a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534v3.25H8a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534q0 .32.216.534A.73.73 0 0 0 8 12.75zM5.308 20.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V5.308q0-.758.525-1.283T5.308 3.5h13.384q.758 0 1.283.525t.525 1.283v13.384q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
