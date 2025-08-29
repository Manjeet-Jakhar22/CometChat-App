import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M12 21.371a1.9 1.9 0 0 1-.596-.1q-3.164-1.125-5.034-3.99Q4.5 14.418 4.5 11.1V6.596q0-.57.328-1.025.327-.457.847-.661l5.692-2.125q.321-.116.633-.116t.633.116l5.692 2.125q.52.205.847.66.328.457.328 1.026V11.1q0 3.318-1.87 6.182t-5.034 3.989a1.7 1.7 0 0 1-.596.1m0-1.471q2.6-.825 4.3-3.3t1.7-5.5V6.587a.3.3 0 0 0-.053-.173.3.3 0 0 0-.149-.116l-5.692-2.125a.3.3 0 0 0-.106-.02.3.3 0 0 0-.106.02L6.202 6.298a.3.3 0 0 0-.149.115.3.3 0 0 0-.053.173V11.1q0 3.025 1.7 5.5t4.3 3.3'
    />
  </Svg>
);
export default SvgComponent;
