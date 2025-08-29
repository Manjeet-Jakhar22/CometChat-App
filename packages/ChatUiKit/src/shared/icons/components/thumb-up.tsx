import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M21.166 8.233q.63 0 1.106.478.477.476.477 1.106v2q0 .175.018.364a.7.7 0 0 1-.051.352L19.649 19.6q-.219.521-.733.877-.513.357-1.063.356H6.949v-12.6l5.546-5.762a1.46 1.46 0 0 1 1.781-.283q.423.249.623.723.2.472.083 1.002l-.95 4.32zm-12.633.655V19.25h9.566l3.067-7.23V9.818h-9.1l1.313-5.95zM3.749 20.833q-.653 0-1.118-.465a1.53 1.53 0 0 1-.465-1.118V9.817q0-.653.465-1.118t1.118-.466h3.2v1.584h-3.2v9.433h3.2v1.583z'
    />
  </Svg>
);
export default SvgComponent;
