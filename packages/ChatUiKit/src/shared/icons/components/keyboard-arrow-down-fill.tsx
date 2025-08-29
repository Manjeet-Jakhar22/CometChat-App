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
        d='M12 14.677a.832.832 0 0 1-.633-.256L6.873 9.927a.73.73 0 0 1-.213-.522.7.7 0 0 1 .213-.532.72.72 0 0 1 .527-.217q.31 0 .527.217L12 12.946l4.073-4.073a.73.73 0 0 1 .522-.212.7.7 0 0 1 .532.212q.217.217.217.527a.72.72 0 0 1-.217.527l-4.494 4.494a.83.83 0 0 1-.633.256'
      />
    </G>
  </Svg>
);
export default SvgComponent;
