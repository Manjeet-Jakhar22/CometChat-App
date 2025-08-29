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
        d='M12 20.94q-.293 0-.585-.1a1.5 1.5 0 0 1-.53-.313 37 37 0 0 1-2.519-2.555 23 23 0 0 1-2.039-2.628 14 14 0 0 1-1.371-2.603q-.505-1.29-.505-2.493 0-3.462 2.24-5.605Q8.93 2.5 11.998 2.5t5.309 2.143q2.24 2.144 2.24 5.605-.001 1.201-.506 2.488a14.4 14.4 0 0 1-1.366 2.603 22 22 0 0 1-2.035 2.628 37 37 0 0 1-2.519 2.55 1.6 1.6 0 0 1-.53.317q-.296.106-.593.106m0-9.075q.747 0 1.277-.531.53-.532.53-1.278t-.532-1.276a1.75 1.75 0 0 0-1.278-.53q-.745 0-1.276.531-.53.532-.53 1.278t.532 1.277 1.278.53'
      />
    </G>
  </Svg>
);
export default SvgComponent;
