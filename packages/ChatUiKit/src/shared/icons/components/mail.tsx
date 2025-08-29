import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M3.75 19.85q-.642 0-1.113-.471a1.52 1.52 0 0 1-.471-1.112V5.733q0-.64.471-1.112A1.52 1.52 0 0 1 3.75 4.15h16.5q.64 0 1.112.471.471.472.471 1.112v12.534q0 .64-.47 1.112a1.52 1.52 0 0 1-1.113.471zm16.5-12.617-7.83 5.063q-.107.054-.206.091a.6.6 0 0 1-.215.038.6.6 0 0 1-.214-.038 2 2 0 0 1-.198-.091L3.749 7.233v11.034h16.5zM12 10.983l8.166-5.25H3.849zm-8.25-3.75v.188-1.08.014-.622.617-.015 1.087zv11.033z'
    />
  </Svg>
);
export default SvgComponent;
