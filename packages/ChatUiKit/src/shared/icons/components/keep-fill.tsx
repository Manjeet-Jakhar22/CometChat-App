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
        d='M15.5 5v7.211l1.565 1.566a.75.75 0 0 1 .223.539v.427q0 .317-.219.537a.73.73 0 0 1-.54.22h-3.78v5.389q0 .318-.215.534a.73.73 0 0 1-.535.215.73.73 0 0 1-.534-.215.73.73 0 0 1-.216-.534V15.5H7.471a.73.73 0 0 1-.542-.22.73.73 0 0 1-.218-.537v-.427a.77.77 0 0 1 .223-.539L8.5 12.212V5h-.25a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.32.216-.534A.73.73 0 0 1 8.25 3.5h7.5q.32 0 .535.216a.73.73 0 0 1 .215.534q0 .32-.215.535a.73.73 0 0 1-.535.215z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
