import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      stroke={color}
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M4 6h16M4 10h16M4 14h16M4 18h16'
    />
  </Svg>
);
export default SvgComponent;
