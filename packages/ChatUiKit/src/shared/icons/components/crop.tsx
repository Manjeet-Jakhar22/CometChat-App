import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M17.234 22.054V18.8H6.78a1.52 1.52 0 0 1-1.112-.471 1.52 1.52 0 0 1-.472-1.112V6.754H1.934a.76.76 0 0 1-.56-.228.77.77 0 0 1-.228-.562.77.77 0 0 1 .228-.564.76.76 0 0 1 .56-.23h3.262V1.92q0-.322.228-.555a.76.76 0 0 1 .563-.232q.334 0 .564.232t.229.556v15.296h15.287q.334 0 .565.233.231.232.231.557a.76.76 0 0 1-.231.564.77.77 0 0 1-.565.23h-3.25v3.253q0 .333-.232.565a.76.76 0 0 1-.558.231.76.76 0 0 1-.564-.231.77.77 0 0 1-.229-.565m0-6.42v-8.88h-8.87V5.171h8.87q.64 0 1.112.476.471.475.471 1.107v8.88z'
    />
  </Svg>
);
export default SvgComponent;
