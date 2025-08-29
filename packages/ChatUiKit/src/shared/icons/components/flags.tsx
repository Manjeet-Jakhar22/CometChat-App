import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 18 19'>
    <Path
      fill={color ?? "#A1A1A1"}
      fillRule='evenodd'
      d='M3.667 16.967H2.601V2.347h1.066c.303.352.686.638 1.119.818s.902.257 1.37.226a5.5 5.5 0 0 0 2.41-.72 6.4 6.4 0 0 1 2.568-.638c.873.008 1.73.234 2.489.657l.71.46v8.359l-.71-.46a5.2 5.2 0 0 0-2.49-.662c-.771.077-1.52.3-2.206.657a6.8 6.8 0 0 1-2.773.657 3.59 3.59 0 0 1-2.487-.735v6.001m1.12-6.495a3 3 0 0 1-1.12-.807v-5.91c.731.485 1.61.71 2.49.636a6.8 6.8 0 0 0 2.77-.657 6 6 0 0 1 2.207-.657c.754.021 1.489.234 2.133.617l.002 6.128a5.3 5.3 0 0 0-2.135-.479 6.4 6.4 0 0 0-2.569.637 5.5 5.5 0 0 1-2.408.72 3.1 3.1 0 0 1-1.37-.228'
      clipRule='evenodd'
    />
  </Svg>
);
export default SvgComponent;
