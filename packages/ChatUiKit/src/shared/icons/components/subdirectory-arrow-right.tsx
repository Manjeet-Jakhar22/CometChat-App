import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M13.5 18.392a.8.8 0 0 1-.25-.584.8.8 0 0 1 .25-.583l3.308-3.308H6.667q-.688 0-1.178-.49A1.6 1.6 0 0 1 5 12.25V2.833q0-.354.24-.594A.8.8 0 0 1 5.837 2q.356 0 .593.24a.8.8 0 0 1 .238.594v9.417h10.158l-3.3-3.3a.8.8 0 0 1-.246-.592.85.85 0 0 1 .24-.591.87.87 0 0 1 .59-.263.76.76 0 0 1 .583.238l4.725 4.725a.8.8 0 0 1 .187.277.9.9 0 0 1 .054.308q0 .165-.054.306a.8.8 0 0 1-.187.275l-4.725 4.759a.82.82 0 0 1-.597.25.81.81 0 0 1-.595-.25'
    />
  </Svg>
);
export default SvgComponent;
