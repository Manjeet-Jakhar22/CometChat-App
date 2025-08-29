import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M22 12.725 6.245 19.362a.77.77 0 0 1-.757-.062.73.73 0 0 1-.355-.646V5.329q0-.417.355-.646a.79.79 0 0 1 .757-.07L22 11.257q.474.207.475.732 0 .527-.475.735m-15.284 4.68 12.9-5.418-12.9-5.466v3.966l5.917 1.5-5.917 1.467z'
    />
  </Svg>
);
export default SvgComponent;
