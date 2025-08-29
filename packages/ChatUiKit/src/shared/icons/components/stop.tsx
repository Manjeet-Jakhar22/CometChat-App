import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M6.117 16.3V7.7q0-.653.465-1.118T7.7 6.117h8.6q.654 0 1.119.465t.465 1.118v8.6q0 .654-.465 1.118t-1.119.465H7.7q-.653 0-1.118-.465a1.53 1.53 0 0 1-.465-1.118m1.583 0h8.6V7.7H7.7z'
    />
  </Svg>
);
export default SvgComponent;
