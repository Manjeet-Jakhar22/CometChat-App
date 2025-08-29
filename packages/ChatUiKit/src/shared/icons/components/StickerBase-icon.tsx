import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 60 61"
  >
    <Path
      fill="#DCDCDC"
      d="M11.834 52.625q-1.6 0-2.78-1.178-1.178-1.18-1.178-2.78V12.333q0-1.6 1.178-2.78 1.18-1.178 2.78-1.178h36.334q1.6 0 2.78 1.178 1.178 1.18 1.178 2.78v36.334q0 1.6-1.178 2.78-1.18 1.178-2.78 1.178zm0-3.958h36.334V12.333H11.834zM17.157 43h25.774q.59 0 .872-.536.28-.537-.066-1.052l-7.066-9.387a.98.98 0 0 0-.795-.39.98.98 0 0 0-.792.386l-7.125 9.27-4.873-6.588a.98.98 0 0 0-.793-.39.98.98 0 0 0-.792.385l-5.085 6.714q-.415.515-.126 1.052.29.536.867.536"
    />
  </Svg>
);
export default SvgComponent;
