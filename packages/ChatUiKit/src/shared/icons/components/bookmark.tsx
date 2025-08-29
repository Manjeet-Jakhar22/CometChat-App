import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='m12.004 17.867-4.659 1.987q-.796.342-1.504-.125-.708-.468-.708-1.333V4.65q0-.64.471-1.112a1.52 1.52 0 0 1 1.112-.471h10.567q.64 0 1.112.471.471.471.471 1.112v13.746q0 .865-.708 1.332t-1.496.126zM12 16.147l5.283 2.253V4.65H6.716V18.4zM12 4.65H6.716h10.567z'
    />
  </Svg>
);
export default SvgComponent;
