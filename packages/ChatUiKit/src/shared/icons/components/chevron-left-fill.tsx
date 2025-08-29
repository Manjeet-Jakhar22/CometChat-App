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
        d='m10.453 12 4.074 4.073q.207.209.212.522a.7.7 0 0 1-.212.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217l-4.495-4.494A.83.83 0 0 1 8.723 12q0-.18.057-.336a.8.8 0 0 1 .198-.297l4.495-4.494a.73.73 0 0 1 .522-.213.7.7 0 0 1 .532.213q.217.217.217.527a.72.72 0 0 1-.217.527z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
