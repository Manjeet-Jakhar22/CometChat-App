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
        d='M4.308 19.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.308q0-.758.525-1.283T4.308 4.5h15.384q.758 0 1.283.525t.525 1.283v11.384q0 .758-.525 1.283t-1.283.525zM12 12.392a.9.9 0 0 0 .248-.037q.123-.038.239-.103l7.152-4.579a.6.6 0 0 0 .242-.274.64.64 0 0 0 .042-.355.59.59 0 0 0-.338-.514.61.61 0 0 0-.645.03L12 11 5.06 6.56q-.325-.198-.64-.032a.6.6 0 0 0-.343.507.7.7 0 0 0 .042.375.5.5 0 0 0 .243.263l7.152 4.579q.115.065.238.103a.9.9 0 0 0 .248.037'
      />
    </G>
  </Svg>
);
export default SvgComponent;
