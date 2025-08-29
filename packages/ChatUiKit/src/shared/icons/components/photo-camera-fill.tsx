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
        d='M12 17.115q1.722 0 2.918-1.197 1.197-1.196 1.197-2.918t-1.197-2.918Q13.722 8.885 12 8.885t-2.918 1.197Q7.885 11.278 7.885 13t1.197 2.918T12 17.115m0-1.5q-1.108.001-1.861-.754-.755-.753-.755-1.861t.755-1.861q.753-.755 1.861-.755t1.861.755q.755.753.755 1.861t-.755 1.861q-.753.755-1.861.755M4.308 20.5q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V7.308q0-.758.525-1.283T4.308 5.5h3.054l1.307-1.417q.246-.271.595-.427.35-.156.736-.156h4q.387 0 .736.156.348.156.595.427L16.639 5.5h3.053q.758 0 1.283.525t.525 1.283v11.384q0 .758-.525 1.283t-1.283.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
