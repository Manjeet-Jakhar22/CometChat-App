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
        d='m12 10.454-4.072 4.073a.73.73 0 0 1-.523.213.7.7 0 0 1-.532-.213.72.72 0 0 1-.217-.527q0-.31.218-.527l4.494-4.494A.87.87 0 0 1 12 8.708q.36 0 .632.27l4.495 4.495q.207.208.212.522a.7.7 0 0 1-.212.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
