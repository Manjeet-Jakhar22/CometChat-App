import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      stroke={color}
      strokeWidth={1.339}
      d='M18.596 4.33H4.714A2.384 2.384 0 0 0 2.33 6.714V17.43a2.384 2.384 0 0 0 2.384 2.384h14.572a2.384 2.384 0 0 0 2.384-2.384V6.51l.02-.02-.095-.37a2.385 2.385 0 0 0-2.31-1.79zM3 13.286l.36-.23 1.055-.67-1.232.783-.02.012-.163.105Zm13.591-1.697.473.473zm-5.125 3.992c-.601.495-1.277.85-1.93.74.362.06.724-.025 1.05-.172.29-.13.584-.324.88-.568Z'
    />
  </Svg>
);
export default SvgComponent;
