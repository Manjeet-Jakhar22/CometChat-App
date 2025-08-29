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
        d='M11.029 17.5a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.32.216-.535a.73.73 0 0 1 .534-.215h1.932q.32 0 .535.216a.73.73 0 0 1 .215.534q0 .32-.215.535a.73.73 0 0 1-.535.215zm-3.875-4.75a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.32.216-.534a.73.73 0 0 1 .534-.216h9.683q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .32-.216.534a.73.73 0 0 1-.534.216zM4.25 8a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.32.216-.535A.73.73 0 0 1 4.25 6.5h15.5q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .32-.216.535A.73.73 0 0 1 19.75 8z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
