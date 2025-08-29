import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M12 21.371a1.9 1.9 0 0 1-.596-.1q-3.164-1.125-5.034-3.99Q4.5 14.418 4.5 11.1V6.596q0-.567.329-1.024.33-.456.846-.662l5.692-2.125q.321-.116.633-.116t.633.116l5.692 2.125q.517.206.846.662.33.457.329 1.024V11.1q0 3.318-1.87 6.182t-5.034 3.989a1.7 1.7 0 0 1-.596.1'
    />
  </Svg>
);
export default SvgComponent;
