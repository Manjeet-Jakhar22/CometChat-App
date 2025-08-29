import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill='#F9F8FD'
      stroke={color}
      strokeWidth={1.5}
      d='M18.625 11.11c.086-.176.132-.37.132-.57V5.78a3.53 3.53 0 0 0-3.53-3.53H5.78A3.53 3.53 0 0 0 2.25 5.78v11.115c0 1.95 1.58 3.53 3.529 3.53h2.958c.336 0 .66-.13.903-.364l-.473-.493.473.493.835-.8-.313 2.198a1.042 1.042 0 0 0 1.178 1.178l2.27-.324c.223-.032.43-.135.59-.295l7.005-7.005a1.86 1.86 0 0 0 0-2.633l-.786-.786a1.86 1.86 0 0 0-1.794-.483Z'
    />
  </Svg>
);
export default SvgComponent;
