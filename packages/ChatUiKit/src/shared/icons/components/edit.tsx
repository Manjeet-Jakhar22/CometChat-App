import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M4.751 19.25h1.142L17.035 8.13l-1.146-1.147L4.75 18.113zm-.787 1.583a.77.77 0 0 1-.567-.229.77.77 0 0 1-.229-.567v-1.914q0-.315.127-.613.126-.3.348-.518L17.018 3.629a1.62 1.62 0 0 1 1.103-.446q.3 0 .592.119.293.118.534.335l1.142 1.146q.225.23.335.519a1.62 1.62 0 0 1-.001 1.184 1.4 1.4 0 0 1-.334.51L7.009 20.358a1.6 1.6 0 0 1-1.133.475zM16.459 7.558l-.57-.575 1.146 1.146z'
    />
  </Svg>
);
export default SvgComponent;
