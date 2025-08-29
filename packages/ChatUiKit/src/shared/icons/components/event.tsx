import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M14.78 18.267q-1.014 0-1.706-.694-.69-.694-.69-1.71 0-1.014.694-1.705.693-.69 1.709-.691 1.015 0 1.706.694.69.693.69 1.709t-.693 1.706-1.71.69M4.735 21.833q-.64 0-1.112-.47a1.52 1.52 0 0 1-.472-1.113V5.383q0-.64.472-1.112a1.52 1.52 0 0 1 1.112-.47h1.5v-.847q0-.337.24-.58a.8.8 0 0 1 .585-.24q.35 0 .596.24a.78.78 0 0 1 .245.58V3.8h8.2v-.846q0-.337.241-.58a.8.8 0 0 1 .584-.24q.351 0 .596.24a.78.78 0 0 1 .246.58V3.8h1.5q.64 0 1.112.471.471.472.471 1.112V20.25q0 .64-.47 1.112a1.52 1.52 0 0 1-1.113.471zm0-1.583h14.533V9.867H4.734zm0-11.967h14.533v-2.9H4.734z'
    />
  </Svg>
);
export default SvgComponent;
