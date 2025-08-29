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
        d='M8.5 16.444V7.556q0-.396.272-.65a.9.9 0 0 1 .871-.221 1 1 0 0 1 .238.098l6.996 4.454a.9.9 0 0 1 .309.336q.102.196.102.427a.9.9 0 0 1-.102.427.9.9 0 0 1-.31.337l-6.995 4.453a.95.95 0 0 1-.476.131.9.9 0 0 1-.634-.254.85.85 0 0 1-.271-.65'
      />
    </G>
  </Svg>
);
export default SvgComponent;
