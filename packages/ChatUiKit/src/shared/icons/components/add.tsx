import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M11.167 12.833H5.833a.8.8 0 0 1-.594-.24.8.8 0 0 1-.239-.596q0-.355.24-.593a.8.8 0 0 1 .593-.237h5.334V5.833q0-.354.24-.593.24-.24.596-.24a.8.8 0 0 1 .593.24.8.8 0 0 1 .237.593v5.334h5.334q.354 0 .593.24.24.241.24.596a.8.8 0 0 1-.24.593.8.8 0 0 1-.593.237h-5.334v5.334q0 .354-.24.594a.8.8 0 0 1-.596.24.8.8 0 0 1-.593-.24.8.8 0 0 1-.237-.594z'
    />
  </Svg>
);
export default SvgComponent;
