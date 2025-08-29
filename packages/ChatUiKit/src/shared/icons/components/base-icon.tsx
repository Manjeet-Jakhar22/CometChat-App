import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 60 61"
  >
    <G fill="#DCDCDC">
      <Path d="M10 45.167V15.833a5.333 5.333 0 0 1 5.333-5.333h29.334A5.333 5.333 0 0 1 50 15.833v16h-8a9.333 9.333 0 0 0-9.333 9.334V50.5H15.333A5.333 5.333 0 0 1 10 45.167" />
      <Path d="M49.924 34.5H42a6.667 6.667 0 0 0-6.667 6.667V50.5h.105z" />
    </G>
  </Svg>
);
export default SvgComponent;
