import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='m10.376 13.604-5.744-2.327a.8.8 0 0 1-.427-.352 1 1 0 0 1-.13-.485q0-.247.142-.486a.85.85 0 0 1 .44-.354l13.69-5.126a.78.78 0 0 1 .518-.044.96.96 0 0 1 .434.251.96.96 0 0 1 .251.433q.068.251-.044.519L14.36 19.317a.85.85 0 0 1-.35.434.9.9 0 0 1-.486.145 1 1 0 0 1-.487-.136.8.8 0 0 1-.353-.431zm3.116 3.735 4.165-11.016-11.035 4.146 4.9 1.97z'
    />
  </Svg>
);
export default SvgComponent;
