import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M14.7 18.867q-.654 0-1.119-.466a1.53 1.53 0 0 1-.465-1.118V6.717q0-.654.465-1.119t1.119-.465h2.583q.653 0 1.118.465t.465 1.119v10.566q0 .654-.465 1.118t-1.118.466zm-7.984 0q-.653 0-1.118-.466a1.52 1.52 0 0 1-.465-1.118V6.717q0-.654.465-1.119t1.118-.465H9.3q.653 0 1.118.465t.465 1.119v10.566q0 .654-.465 1.118t-1.118.466zm7.984-1.584h2.583V6.717H14.7zm-7.984 0H9.3V6.717H6.716z'
    />
  </Svg>
);
export default SvgComponent;
