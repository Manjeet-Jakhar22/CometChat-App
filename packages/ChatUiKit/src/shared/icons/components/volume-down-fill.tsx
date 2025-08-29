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
        d='M9.212 14.5H6.403a.88.88 0 0 1-.645-.259.88.88 0 0 1-.259-.645v-3.192q0-.387.259-.645a.88.88 0 0 1 .645-.259h2.807l2.993-2.992q.36-.36.828-.165t.468.707v9.9q0 .512-.468.707t-.828-.165zM18 12q0 .934-.389 1.771a4.1 4.1 0 0 1-1.047 1.408.42.42 0 0 1-.446.027.39.39 0 0 1-.233-.375V9.119q0-.262.233-.375a.42.42 0 0 1 .446.027q.66.587 1.047 1.44.39.855.389 1.789'
      />
    </G>
  </Svg>
);
export default SvgComponent;
