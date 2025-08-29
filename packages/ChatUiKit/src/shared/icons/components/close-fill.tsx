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
        d='m12 13.054-5.072 5.073a.73.73 0 0 1-.523.213.7.7 0 0 1-.532-.213.72.72 0 0 1-.217-.527q0-.31.218-.527L10.947 12 5.874 6.927a.73.73 0 0 1-.213-.522.7.7 0 0 1 .213-.532.72.72 0 0 1 .527-.217q.308 0 .527.217L12 10.946l5.073-5.073a.73.73 0 0 1 .522-.212.7.7 0 0 1 .532.212q.216.217.217.527a.72.72 0 0 1-.217.527L13.054 12l5.074 5.073q.207.209.212.522a.7.7 0 0 1-.212.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
