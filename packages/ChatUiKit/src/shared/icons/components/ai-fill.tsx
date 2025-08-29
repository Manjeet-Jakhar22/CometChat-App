import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M9.003 7.406c.11-.541.884-.541.994 0a8.46 8.46 0 0 0 6.597 6.597c.541.11.541.884 0 .995a8.46 8.46 0 0 0-6.597 6.596c-.11.541-.884.541-.994 0a8.46 8.46 0 0 0-6.597-6.597c-.541-.11-.541-.884 0-.995a8.46 8.46 0 0 0 6.597-6.596M18.217 2.027c.007-.036.059-.036.066 0a4.73 4.73 0 0 0 3.69 3.69c.036.007.036.059 0 .066a4.73 4.73 0 0 0-3.69 3.69c-.007.036-.059.036-.066 0a4.73 4.73 0 0 0-3.69-3.69c-.036-.007-.036-.059 0-.066a4.73 4.73 0 0 0 3.69-3.69'
    />
  </Svg>
);
export default SvgComponent;
