import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M12 10.333 7.784 14.55a.71.71 0 0 1-.545.22.82.82 0 0 1-.556-.237.75.75 0 0 1-.244-.558.78.78 0 0 1 .241-.572l4.765-4.764A.76.76 0 0 1 12 8.4q.317 0 .562.238l4.783 4.783a.78.78 0 0 1 .231.562.74.74 0 0 1-.244.55.8.8 0 0 1-.564.23.75.75 0 0 1-.553-.23z'
    />
  </Svg>
);
export default SvgComponent;
