import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='m10.333 11.983 4.234 4.234a.71.71 0 0 1 .22.543.82.82 0 0 1-.237.557.75.75 0 0 1-.558.243.75.75 0 0 1-.563-.24l-4.783-4.783a.75.75 0 0 1-.185-.256.8.8 0 0 1-.057-.298q0-.162.057-.298a.8.8 0 0 1 .185-.264l4.8-4.8a.76.76 0 0 1 .562-.232q.33.003.559.244.228.242.229.565 0 .323-.23.552z'
    />
  </Svg>
);
export default SvgComponent;
