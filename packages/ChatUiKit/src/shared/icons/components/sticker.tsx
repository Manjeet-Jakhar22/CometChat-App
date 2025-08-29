import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M16.8 3.6a3.6 3.6 0 0 1 3.593 3.388l.007.212v5.254a2.4 2.4 0 0 1-.56 1.542l-.143.155-5.546 5.546c-.4.4-.927.644-1.486.694l-.211.009H7.2a3.6 3.6 0 0 1-3.594-3.388L3.6 16.8V7.2a3.6 3.6 0 0 1 3.388-3.594L7.2 3.6zm0 1.2H7.2a2.4 2.4 0 0 0-2.394 2.22L4.8 7.2v9.6a2.4 2.4 0 0 0 2.22 2.393l.18.007H12v-3.6a3.6 3.6 0 0 1 3.388-3.594L15.6 12h3.6V7.2a2.4 2.4 0 0 0-2.221-2.393zm2.139 8.402-3.34-.002a2.4 2.4 0 0 0-2.393 2.22l-.006.18v3.337l.103-.088 5.545-5.546q.049-.048.09-.101'
    />
  </Svg>
);
export default SvgComponent;
