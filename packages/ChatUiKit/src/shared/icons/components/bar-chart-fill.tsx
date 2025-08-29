import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M16.904 19.5a.88.88 0 0 1-.644-.26.87.87 0 0 1-.26-.644V14.5q0-.384.26-.644a.88.88 0 0 1 .644-.26h1.692q.383 0 .644.26.26.26.26.644v4.096q0 .383-.26.644a.87.87 0 0 1-.644.26zm-5.75 0a.87.87 0 0 1-.644-.26.87.87 0 0 1-.26-.644V5.404q0-.383.26-.644a.87.87 0 0 1 .644-.26h1.692q.384 0 .644.26t.26.644v13.192q0 .383-.26.644a.88.88 0 0 1-.644.26zm-5.75 0a.87.87 0 0 1-.644-.26.87.87 0 0 1-.26-.644v-8.284q0-.39.26-.65a.88.88 0 0 1 .644-.258h1.692q.383 0 .644.26.26.26.26.644v8.284a.88.88 0 0 1-.26.65.88.88 0 0 1-.644.258z'
    />
  </Svg>
);
export default SvgComponent;
