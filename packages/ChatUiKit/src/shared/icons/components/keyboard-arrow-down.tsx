import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M11.999 14.996a.8.8 0 0 1-.298-.057.75.75 0 0 1-.256-.185L6.66 9.971a.72.72 0 0 1-.23-.563.78.78 0 0 1 .251-.558.8.8 0 0 1 .565-.23q.322 0 .552.23l4.2 4.217 4.217-4.217a.71.71 0 0 1 .543-.22q.315.008.557.237a.75.75 0 0 1 .243.558.76.76 0 0 1-.23.562l-4.768 4.767a.8.8 0 0 1-.264.185.8.8 0 0 1-.298.057'
    />
  </Svg>
);
export default SvgComponent;
