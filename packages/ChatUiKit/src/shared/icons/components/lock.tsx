import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M5.732 21.833q-.653 0-1.119-.465a1.53 1.53 0 0 1-.465-1.118V9.783q0-.653.465-1.118T5.732 8.2h1.55V5.968q0-1.97 1.375-3.344T12 1.25t3.341 1.375 1.373 3.347V8.2h1.55q.654 0 1.118.465t.465 1.118V20.25q0 .654-.465 1.118t-1.118.465zm0-1.583h12.533V9.783H5.732zM12 16.917q.785 0 1.341-.548.557-.548.557-1.317 0-.754-.558-1.345a1.78 1.78 0 0 0-1.343-.59q-.785 0-1.341.589-.558.59-.558 1.351 0 .762.559 1.31.558.55 1.343.55M8.865 8.2h6.267V5.96q0-1.305-.908-2.215-.907-.912-2.22-.912t-2.226.91q-.913.909-.913 2.22z'
    />
  </Svg>
);
export default SvgComponent;
