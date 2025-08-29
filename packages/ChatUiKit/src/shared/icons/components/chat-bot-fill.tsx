import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      fillRule='evenodd'
      d='M5.896 18.7 3.35 21.25q-.375.375-.863.175-.486-.2-.487-.73V4.584q0-.64.471-1.112A1.52 1.52 0 0 1 3.583 3h16.5q.64 0 1.112.471.471.472.471 1.112v12.534q0 .64-.47 1.112a1.52 1.52 0 0 1-1.113.471zm5.189-9.581a1.269 1.269 0 1 1-2.538 0 1.269 1.269 0 0 1 2.538 0m4.23 0a1.269 1.269 0 1 1-2.539 0 1.269 1.269 0 0 1 2.538 0m.719 3.387a4.702 4.702 0 0 1-8.112.039.634.634 0 0 1 1.091-.647 3.433 3.433 0 0 0 5.923-.028.634.634 0 1 1 1.098.636'
      clipRule='evenodd'
    />
  </Svg>
);
export default SvgComponent;
