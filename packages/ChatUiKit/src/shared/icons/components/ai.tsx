import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      stroke={color}
      strokeWidth={1.5}
      d='M9.302 7.865c.1-.487.796-.487.896 0a7.62 7.62 0 0 0 5.936 5.937c.488.1.488.796 0 .896a7.62 7.62 0 0 0-5.936 5.936c-.1.488-.796.488-.896 0a7.62 7.62 0 0 0-5.937-5.936c-.487-.1-.487-.796 0-.896a7.62 7.62 0 0 0 5.937-5.937ZM17.595 3.024c.007-.032.053-.032.06 0a4.26 4.26 0 0 0 3.32 3.321c.033.007.033.053 0 .06a4.26 4.26 0 0 0-3.32 3.32c-.007.033-.053.033-.06 0a4.26 4.26 0 0 0-3.32-3.32c-.033-.007-.033-.053 0-.06a4.26 4.26 0 0 0 3.32-3.32Z'
    />
  </Svg>
);
export default SvgComponent;
