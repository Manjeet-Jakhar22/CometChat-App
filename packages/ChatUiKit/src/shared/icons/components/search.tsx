import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M9.5 15.75q-2.663 0-4.508-1.845t-1.846-4.47q0-2.627 1.841-4.472t4.48-1.846q2.637 0 4.476 1.846 1.837 1.845 1.837 4.476 0 1.061-.346 2.047a6.3 6.3 0 0 1-1 1.814l5.865 5.82q.231.23.231.568t-.238.579a.78.78 0 0 1-.578.241.74.74 0 0 1-.564-.238l-5.845-5.85a5.3 5.3 0 0 1-1.729.986q-.987.345-2.076.344m-.02-1.583q1.967 0 3.342-1.382 1.375-1.383 1.375-3.353t-1.375-3.35T9.476 4.7q-1.984 0-3.366 1.382-1.38 1.383-1.38 3.352 0 1.97 1.381 3.352 1.382 1.38 3.369 1.38'
    />
  </Svg>
);
export default SvgComponent;
