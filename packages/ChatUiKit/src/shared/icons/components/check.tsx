import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='m9.483 15.517 8.875-8.875a.82.82 0 0 1 1.184 0q.25.252.25.596 0 .345-.25.595l-9.475 9.484a.8.8 0 0 1-.584.25.8.8 0 0 1-.583-.25L4.433 12.85a.77.77 0 0 1-.237-.596.86.86 0 0 1 .263-.596.82.82 0 0 1 .596-.25q.345 0 .595.25z'
    />
  </Svg>
);
export default SvgComponent;
