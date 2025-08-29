import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M2.832 15.767q-.63 0-1.107-.477t-.477-1.107v-2q0-.175-.018-.364a.7.7 0 0 1 .052-.352L4.348 4.4q.219-.521.733-.877t1.064-.356h10.903v12.6l-5.537 5.754a1.48 1.48 0 0 1-.857.458 1.4 1.4 0 0 1-.924-.17 1.45 1.45 0 0 1-.632-.72 1.6 1.6 0 0 1-.074-1.01l.941-4.312zm12.633-.663V4.75H5.898l-3.066 7.218v2.215h9.1l-1.305 5.95zm4.783-11.937q.654 0 1.118.465t.465 1.118v9.433q0 .654-.465 1.119-.464.465-1.118.465h-3.2v-1.584h3.2V4.75h-3.2V3.167z'
    />
  </Svg>
);
export default SvgComponent;
