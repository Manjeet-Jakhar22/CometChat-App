import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M11.253 8.269a1.269 1.269 0 1 1-2.538 0 1.269 1.269 0 0 1 2.538 0M15.482 8.269a1.269 1.269 0 1 1-2.538 0 1.269 1.269 0 0 1 2.538 0M16.202 11.656a4.7 4.7 0 0 1-8.112.039.634.634 0 0 1 1.091-.647 3.433 3.433 0 0 0 5.923-.028.635.635 0 0 1 1.098.636'
    />
    <Path
      fill={color}
      fillRule='evenodd'
      d='m3.518 20.4 2.546-2.55h14.187a1.52 1.52 0 0 0 1.112-.471q.471-.472.471-1.112V3.733q0-.64-.47-1.112a1.52 1.52 0 0 0-1.113-.471h-16.5a1.52 1.52 0 0 0-1.112.471 1.52 1.52 0 0 0-.471 1.112v16.113q0 .528.487.729.488.2.863-.175m16.733-4.133H5.397l-1.646 1.741V3.733h16.5z'
      clipRule='evenodd'
    />
  </Svg>
);
export default SvgComponent;
