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
        d='M12 13.5q-1.048 0-1.774-.726A2.41 2.41 0 0 1 9.5 11V5q0-1.048.726-1.774A2.41 2.41 0 0 1 12 2.5q1.048 0 1.774.726T14.5 5v6q0 1.048-.726 1.774A2.41 2.41 0 0 1 12 13.5m-.75 6.5v-2.546a6.33 6.33 0 0 1-3.827-1.835q-1.594-1.576-1.868-3.844a.65.65 0 0 1 .168-.547A.68.68 0 0 1 6.25 11q.318 0 .534.22t.287.54a4.8 4.8 0 0 0 1.68 3.038A4.85 4.85 0 0 0 12 16q1.867 0 3.261-1.214 1.395-1.215 1.667-3.027.072-.318.287-.539a.72.72 0 0 1 .535-.22q.318 0 .527.228a.65.65 0 0 1 .167.547 6.4 6.4 0 0 1-1.855 3.814q-1.581 1.598-3.84 1.865V20a.73.73 0 0 1-.215.535.73.73 0 0 1-.534.215.73.73 0 0 1-.535-.215.73.73 0 0 1-.215-.535'
      />
    </G>
  </Svg>
);
export default SvgComponent;
