import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";

const ListItemCheckIcon = ({ height = 16, width = 16, color = "white" }: SvgProps) => (
  <Svg width={width} height={height} viewBox='0 0 16 16' fill='none'>
    <G id='Base_Icon'>
      <Path
        id='Vector'
        d='M6.42713 10.1992L11.974 4.65234C12.0802 4.54818 12.2039 4.49609 12.3453 4.49609C12.4867 4.49609 12.6095 4.54833 12.7137 4.65281C12.8179 4.7574 12.8699 4.88151 12.8699 5.02516C12.8699 5.16891 12.8179 5.29287 12.7137 5.39703L6.79182 11.3242C6.68765 11.4284 6.56609 11.4805 6.42713 11.4805C6.28828 11.4805 6.16677 11.4284 6.0626 11.3242L3.27088 8.5325C3.16671 8.42792 3.11723 8.30365 3.12244 8.15969C3.12765 8.01583 3.18255 7.89182 3.28713 7.78766C3.39161 7.68349 3.51572 7.63141 3.65947 7.63141C3.80322 7.63141 3.92718 7.68349 4.03135 7.78766L6.42713 10.1992Z'
        fill={color}
        stroke={color}
        strokeWidth='0.5'
      />
    </G>
  </Svg>
);

export default ListItemCheckIcon;
