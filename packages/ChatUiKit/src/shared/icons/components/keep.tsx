import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M15.8 4.717v7.833l1.827 1.665a.8.8 0 0 1 .18.274.8.8 0 0 1 .06.305v.453a.76.76 0 0 1-.233.555.76.76 0 0 1-.555.231h-4.284v5.771q0 .333-.232.565a.77.77 0 0 1-.566.231.75.75 0 0 1-.56-.231.78.78 0 0 1-.225-.565v-5.77H6.93a.77.77 0 0 1-.565-.233.76.76 0 0 1-.231-.557v-.453a.8.8 0 0 1 .058-.303q.06-.15.188-.271l1.72-1.667V4.717h-.37a.77.77 0 0 1-.565-.232.77.77 0 0 1-.231-.563q0-.33.231-.56a.77.77 0 0 1 .565-.229h8.45q.323 0 .555.233a.76.76 0 0 1 .232.558q0 .334-.232.564a.76.76 0 0 1-.555.229zM8.316 14.45h7.267l-1.367-1.28V4.717H9.683v8.45z'
    />
  </Svg>
);
export default SvgComponent;
