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
        d='M9.52 15.615q-2.562 0-4.339-1.777T3.404 9.5t1.777-4.339T9.52 3.385q2.56 0 4.338 1.776 1.777 1.777 1.777 4.339 0 1.071-.36 2.046t-.96 1.696l5.755 5.754q.207.209.212.522a.7.7 0 0 1-.212.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217l-5.754-5.754q-.75.62-1.725.97t-2.017.35m0-1.5q1.932 0 3.274-1.341 1.341-1.34 1.341-3.274t-1.341-3.274Q11.452 4.885 9.52 4.884q-1.933 0-3.274 1.342Q4.904 7.566 4.904 9.5t1.342 3.274q1.34 1.342 3.274 1.342'
      />
    </G>
  </Svg>
);
export default SvgComponent;
