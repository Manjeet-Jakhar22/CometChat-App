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
        d='M17.25 22v-3.25H7.058q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.75H2a.73.73 0 0 1-.534-.216A.73.73 0 0 1 1.25 6q0-.32.216-.535A.73.73 0 0 1 2 5.25h3.25V2q0-.318.216-.534A.73.73 0 0 1 6 1.25q.32 0 .535.216A.73.73 0 0 1 6.75 2v14.942q0 .116.096.212a.3.3 0 0 0 .212.096H22q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .32-.216.535a.73.73 0 0 1-.534.215h-3.25V22q0 .318-.216.534a.73.73 0 0 1-.534.216.73.73 0 0 1-.535-.216.73.73 0 0 1-.215-.534m0-6.25V7.058a.3.3 0 0 0-.096-.212.3.3 0 0 0-.212-.096H8.25v-1.5h8.692q.758 0 1.283.525t.525 1.283v8.692z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
