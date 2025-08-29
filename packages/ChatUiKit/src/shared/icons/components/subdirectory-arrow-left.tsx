import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='m7.192 13.917 3.308 3.308a.82.82 0 0 1 .254.583.78.78 0 0 1-.246.584.82.82 0 0 1-.596.25.81.81 0 0 1-.595-.25l-4.734-4.759a.8.8 0 0 1-.187-.277.9.9 0 0 1-.054-.308.9.9 0 0 1 .054-.306.8.8 0 0 1 .187-.275l4.725-4.725a.8.8 0 0 1 .592-.246.85.85 0 0 1 .598.254.85.85 0 0 1 .24.592.8.8 0 0 1-.246.591L7.175 12.25h10.158V2.833q0-.354.24-.594A.8.8 0 0 1 18.17 2q.356 0 .593.24a.8.8 0 0 1 .238.593v9.417q0 .687-.49 1.177-.489.49-1.177.49z'
    />
  </Svg>
);
export default SvgComponent;
