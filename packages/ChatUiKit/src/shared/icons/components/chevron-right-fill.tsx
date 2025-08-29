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
        d='M12.947 12 8.874 7.927a.73.73 0 0 1-.213-.522.7.7 0 0 1 .213-.532.72.72 0 0 1 .526-.217q.31 0 .527.217l4.495 4.494a.83.83 0 0 1 .255.633.833.833 0 0 1-.256.633l-4.493 4.494a.73.73 0 0 1-.523.213.7.7 0 0 1-.531-.213.72.72 0 0 1-.218-.527q0-.31.217-.527z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
