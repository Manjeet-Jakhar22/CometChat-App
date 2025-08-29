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
        d='M11.25 12.75h-5a.73.73 0 0 1-.534-.216A.73.73 0 0 1 5.5 12q0-.32.216-.534a.73.73 0 0 1 .534-.216h5v-5q0-.319.216-.534A.73.73 0 0 1 12 5.5q.32 0 .534.216a.73.73 0 0 1 .216.534v5h5q.318 0 .534.216A.73.73 0 0 1 18.5 12q0 .32-.216.534a.73.73 0 0 1-.534.216h-5v5q0 .318-.216.534A.73.73 0 0 1 12 18.5a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
