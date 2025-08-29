import Svg, { Mask, Path, G } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Mask
      id='prefix__a'
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits='userSpaceOnUse'
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill='#D9D9D9' d='M0 0h24v24H0z' />
    </Mask>
    <G mask='url(#prefix__a)'>
      <Path
        fill={color}
        d='M15.5 18.5q-.613 0-1.057-.443A1.44 1.44 0 0 1 14 17V7q0-.613.443-1.057A1.44 1.44 0 0 1 15.5 5.5h.75q.613 0 1.057.443.443.444.443 1.057v10q0 .613-.443 1.057a1.44 1.44 0 0 1-1.057.443zm-7.75 0q-.613 0-1.057-.443A1.44 1.44 0 0 1 6.25 17V7q0-.613.443-1.057A1.44 1.44 0 0 1 7.75 5.5h.75q.613 0 1.057.443Q10 6.387 10 7v10q0 .613-.443 1.057A1.44 1.44 0 0 1 8.5 18.5z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
