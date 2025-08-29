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
        d='M6.767 18.723a.9.9 0 0 1-.86-.077.84.84 0 0 1-.407-.752v-4.221L12.423 12 5.5 10.327V6.106q0-.494.407-.752a.9.9 0 0 1 .86-.077l13.956 5.885q.558.249.558.84 0 .59-.558.836z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
