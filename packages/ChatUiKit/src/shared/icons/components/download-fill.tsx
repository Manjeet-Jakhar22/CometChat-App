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
        d='M12 15.412a.83.83 0 0 1-.633-.256l-3.11-3.11a.7.7 0 0 1-.22-.522.77.77 0 0 1 .22-.532.77.77 0 0 1 .535-.24q.303-.008.535.225L11.25 12.9V5.25q0-.32.216-.535A.73.73 0 0 1 12 4.5q.32 0 .534.215a.73.73 0 0 1 .216.535v7.65l1.923-1.923a.71.71 0 0 1 .53-.22q.306.003.54.235.217.233.224.527a.7.7 0 0 1-.225.527l-3.11 3.11a.83.83 0 0 1-.632.255M6.308 19.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283v-1.961q0-.32.215-.535a.73.73 0 0 1 .535-.215q.32 0 .535.215a.73.73 0 0 1 .215.535v1.961q0 .116.096.212a.3.3 0 0 0 .212.096h11.384a.3.3 0 0 0 .212-.096.3.3 0 0 0 .096-.212v-1.961q0-.32.215-.535a.73.73 0 0 1 .535-.215q.32 0 .535.215a.73.73 0 0 1 .215.535v1.961q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
