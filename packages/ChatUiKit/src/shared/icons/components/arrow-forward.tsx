import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M16.81 12.787H4.964A.777.777 0 0 1 4.168 12a.77.77 0 0 1 .229-.567.77.77 0 0 1 .567-.229H16.81l-5.367-5.367a.767.767 0 0 1 .004-1.117.778.778 0 0 1 1.117 0l6.717 6.717a1 1 0 0 1 .18.265q.06.135.061.298 0 .162-.06.298t-.181.256l-6.717 6.717a.77.77 0 0 1-1.117 0 .75.75 0 0 1 0-1.113z'
    />
  </Svg>
);
export default SvgComponent;
