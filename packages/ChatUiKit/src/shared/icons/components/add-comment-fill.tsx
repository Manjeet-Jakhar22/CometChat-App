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
        d='m6.039 17.5-2.002 2.002q-.427.426-.982.192-.555-.235-.555-.84V4.308q0-.758.525-1.283T4.308 2.5h15.384q.758 0 1.283.525t.525 1.283v11.384q0 .758-.525 1.283t-1.283.525zm5.211-6.75V13q0 .319.216.534a.73.73 0 0 0 .534.216q.32 0 .534-.216A.73.73 0 0 0 12.75 13v-2.25H15q.319 0 .534-.216A.73.73 0 0 0 15.75 10a.73.73 0 0 0-.216-.534A.73.73 0 0 0 15 9.25h-2.25V7a.73.73 0 0 0-.216-.534A.73.73 0 0 0 12 6.25a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534v2.25H9a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534q0 .32.216.534A.73.73 0 0 0 9 10.75z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
