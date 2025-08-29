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
        d='M7.308 20.5a1.74 1.74 0 0 1-1.277-.531 1.74 1.74 0 0 1-.531-1.277V6h-.25a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.32.216-.535A.73.73 0 0 1 5.25 4.5H9q0-.368.259-.626a.85.85 0 0 1 .625-.259h4.232q.367 0 .625.259A.85.85 0 0 1 15 4.5h3.75q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .32-.216.534A.73.73 0 0 1 18.75 6h-.25v12.692q0 .746-.531 1.277a1.74 1.74 0 0 1-1.277.531zm2.846-3.5q.319 0 .534-.215a.73.73 0 0 0 .216-.535v-7.5a.73.73 0 0 0-.216-.535.73.73 0 0 0-.535-.215.73.73 0 0 0-.534.215.73.73 0 0 0-.215.535v7.5q0 .318.216.535a.73.73 0 0 0 .534.215m3.693 0q.318 0 .534-.215a.73.73 0 0 0 .215-.535v-7.5a.73.73 0 0 0-.216-.535.73.73 0 0 0-.534-.215.73.73 0 0 0-.534.215.73.73 0 0 0-.216.535v7.5q0 .318.216.535a.73.73 0 0 0 .535.215'
      />
    </G>
  </Svg>
);
export default SvgComponent;
