import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M11.034 14.9H7.913a.77.77 0 0 1-.567-.23.77.77 0 0 1-.229-.566V9.888a.76.76 0 0 1 .23-.559.77.77 0 0 1 .566-.229h3.12l3.517-3.517q.375-.375.863-.177.487.198.487.723v11.734q0 .533-.487.73-.488.2-.863-.176zM8.7 13.317h3.03l2.587 2.52V8.172l-2.587 2.512H8.7z'
    />
  </Svg>
);
export default SvgComponent;
