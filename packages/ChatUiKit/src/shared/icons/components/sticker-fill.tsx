import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color ?? "#212121"}
      d='M4 17.867V6.133C4 4.955 4.955 4 6.133 4h11.734C19.045 4 20 4.955 20 6.133v6.4h-3.2a3.733 3.733 0 0 0-3.733 3.734V20H6.133A2.133 2.133 0 0 1 4 17.867'
    />
    <Path fill={color ?? "#212121"} d='M19.97 13.6H16.8a2.667 2.667 0 0 0-2.667 2.667V20h.042z' />
  </Svg>
);
export default SvgComponent;
