import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

const ReminderSvg = ({ height = 17, width = 16, color = "#000" }: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
    <Path
      d="M1 8.5C1 10.3565 1.7375 12.137 3.05025 13.4497C4.36301 14.7625 6.14348 15.5 8 15.5C9.85652 15.5 11.637 14.7625 12.9497 13.4497C14.2625 12.137 15 10.3565 15 8.5C15 6.64348 14.2625 4.86301 12.9497 3.55025C11.637 2.2375 9.85652 1.5 8 1.5C6.14348 1.5 4.36301 2.2375 3.05025 3.55025C1.7375 4.86301 1 6.64348 1 8.5Z"
      stroke={color}
      strokeWidth={1.27273}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 8.50043V6.01074"
      stroke={color}
      strokeWidth={1.27273}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 8.5L11.1118 11.6124"
      stroke={color}
      strokeWidth={1.27273}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ReminderSvg;
