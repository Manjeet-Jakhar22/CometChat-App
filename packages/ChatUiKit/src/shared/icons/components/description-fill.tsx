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
        d='M9 17.75h6q.319 0 .534-.216A.73.73 0 0 0 15.75 17a.73.73 0 0 0-.216-.535.73.73 0 0 0-.534-.215H9a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534q0 .32.216.535A.73.73 0 0 0 9 17.75m0-4h6q.319 0 .534-.216A.73.73 0 0 0 15.75 13a.73.73 0 0 0-.216-.534.73.73 0 0 0-.534-.216H9a.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534q0 .32.216.534A.73.73 0 0 0 9 13.75M6.308 21.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V4.308q0-.758.525-1.283T6.308 2.5h7.194q.366 0 .697.14a1.8 1.8 0 0 1 .578.387l4.196 4.196a1.8 1.8 0 0 1 .527 1.275v11.194q0 .758-.525 1.283t-1.283.525zM13.5 7.6q0 .383.259.641a.87.87 0 0 0 .641.259H18L13.5 4z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
