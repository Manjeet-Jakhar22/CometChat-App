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
        d='M11.212 14.5H8.404a.87.87 0 0 1-.644-.26.87.87 0 0 1-.26-.644v-3.192q0-.383.26-.644a.87.87 0 0 1 .644-.26h2.807l2.993-2.992q.36-.36.828-.162t.468.704v9.9q0 .507-.468.704-.468.198-.828-.162z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
