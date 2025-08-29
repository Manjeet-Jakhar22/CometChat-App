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
        d='M13.473 19.958a.72.72 0 0 1-.228-.532.73.73 0 0 1 .228-.522l3.154-3.154h-9.32q-.747 0-1.277-.53a1.74 1.74 0 0 1-.53-1.278V5.25q0-.32.215-.535A.73.73 0 0 1 6.25 4.5q.32 0 .535.215A.73.73 0 0 1 7 5.25v8.692a.3.3 0 0 0 .087.222.3.3 0 0 0 .22.086h9.32l-3.17-3.17a.7.7 0 0 1-.224-.526.78.78 0 0 1 .225-.527.74.74 0 0 1 .531-.236q.3-.003.522.22l4.356 4.356a.83.83 0 0 1 .256.633.828.828 0 0 1-.256.633l-4.325 4.325a.74.74 0 0 1-.534.232.74.74 0 0 1-.535-.232'
      />
    </G>
  </Svg>
);
export default SvgComponent;
