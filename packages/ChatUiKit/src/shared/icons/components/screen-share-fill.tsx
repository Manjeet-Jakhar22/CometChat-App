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
        d='M11.135 10.808h2v1.111q0 .156.135.214t.251-.058l1.696-1.696q.14-.14.14-.321a.44.44 0 0 0-.14-.322L13.521 8.04q-.115-.115-.25-.057-.136.058-.136.213v1.112h-2q-1.144 0-1.947.803a2.65 2.65 0 0 0-.803 1.947v1.25q0 .319.215.534a.73.73 0 0 0 .535.216q.318 0 .534-.216a.73.73 0 0 0 .216-.534v-1.25q0-.522.364-.886t.886-.364m-9 9.423a.73.73 0 0 1-.535-.216.73.73 0 0 1-.215-.534q0-.32.215-.535a.73.73 0 0 1 .535-.215h19.73q.32 0 .535.215a.73.73 0 0 1 .215.535.73.73 0 0 1-.215.534.73.73 0 0 1-.535.216zm2.173-2.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V5.539q0-.758.525-1.283t1.283-.525h15.384q.758 0 1.283.525t.525 1.282v10.385q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
