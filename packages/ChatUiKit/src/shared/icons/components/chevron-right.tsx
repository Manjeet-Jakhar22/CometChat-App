import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M13.066 11.983 8.833 7.751a.72.72 0 0 1-.221-.545.82.82 0 0 1 .237-.556.75.75 0 0 1 .558-.244q.33-.002.571.232l4.784 4.783q.12.129.18.264.061.135.061.298t-.06.299a.9.9 0 0 1-.183.258l-4.797 4.796a.74.74 0 0 1-.564.233.77.77 0 0 1-.55-.252.8.8 0 0 1-.23-.565q0-.323.23-.552z'
    />
  </Svg>
);
export default SvgComponent;
