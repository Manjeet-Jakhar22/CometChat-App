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
        d='M4.404 20.5a.87.87 0 0 1-.644-.26.87.87 0 0 1-.26-.644v-1.733q0-.365.14-.697a1.8 1.8 0 0 1 .387-.578L16.691 3.932q.226-.207.5-.319a1.5 1.5 0 0 1 .575-.112q.3 0 .583.107.282.106.499.34l1.221 1.236q.233.217.332.5.099.282.099.565 0 .301-.103.576t-.328.501L7.412 19.973a1.8 1.8 0 0 1-1.275.527zM17.552 7.694 19 6.256 17.744 5l-1.438 1.448z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
