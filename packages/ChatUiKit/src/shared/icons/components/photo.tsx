import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M4.734 20.85q-.64 0-1.112-.471a1.52 1.52 0 0 1-.472-1.112V4.733q0-.64.472-1.112a1.52 1.52 0 0 1 1.112-.471h14.533q.64 0 1.112.471.471.471.471 1.112v14.534q0 .64-.47 1.112a1.52 1.52 0 0 1-1.113.47zm0-1.583h14.533V4.733H4.734zM6.863 17h10.31a.37.37 0 0 0 .348-.215.39.39 0 0 0-.026-.42l-2.827-3.755a.4.4 0 0 0-.318-.156.39.39 0 0 0-.316.154l-2.85 3.709-1.95-2.636a.39.39 0 0 0-.317-.156.39.39 0 0 0-.317.154l-2.034 2.686q-.165.206-.05.42a.37.37 0 0 0 .347.215'
    />
  </Svg>
);
export default SvgComponent;
