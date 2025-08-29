import Svg, { Path, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M12.243 14.743a.54.54 0 0 1-.557-.557v-4.029a.54.54 0 0 1 .557-.557.54.54 0 0 1 .557.557v4.029a.54.54 0 0 1-.557.557m-5.472 0a.73.73 0 0 1-.559-.225A.77.77 0 0 1 6 13.97v-3.6q0-.321.212-.546a.73.73 0 0 1 .56-.225h2.842a.54.54 0 0 1 .557.557.54.54 0 0 1-.557.557h-2.5v2.915h1.943v-.9a.54.54 0 0 1 .557-.558.54.54 0 0 1 .557.558v1.242q0 .322-.212.547a.73.73 0 0 1-.559.225zm8.043 0a.54.54 0 0 1-.557-.557v-4.029a.54.54 0 0 1 .557-.557h2.629a.54.54 0 0 1 .557.557.54.54 0 0 1-.557.557H15.37v1.143h1.172a.54.54 0 0 1 .557.557.54.54 0 0 1-.557.557H15.37v1.215a.54.54 0 0 1-.557.557'
    />
    <Rect width={19.2} height={13.2} x={2.401} y={5.4} stroke={color} strokeWidth={1.2} rx={1.8} />
  </Svg>
);
export default SvgComponent;
