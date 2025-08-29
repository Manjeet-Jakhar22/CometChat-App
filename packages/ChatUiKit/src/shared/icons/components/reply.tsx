import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='m6.222 11.72 3.354 3.363a.74.74 0 0 1 .231.559.79.79 0 0 1-.243.558.82.82 0 0 1-.571.231.75.75 0 0 1-.563-.244l-4.7-4.7a.75.75 0 0 1-.246-.554q0-.316.246-.562L8.451 5.65a.75.75 0 0 1 .563-.236.83.83 0 0 1 .566.236.77.77 0 0 1 .238.564q0 .328-.238.565l-3.358 3.358h9.73q2.073 0 3.478 1.411 1.404 1.41 1.404 3.473v3.017a.77.77 0 0 1-.229.566.76.76 0 0 1-.558.23.77.77 0 0 1-.567-.23.77.77 0 0 1-.229-.566V15.02q0-1.417-.942-2.359-.94-.94-2.358-.941z'
    />
  </Svg>
);
export default SvgComponent;
