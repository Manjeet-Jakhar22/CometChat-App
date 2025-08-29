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
        d='m12 16.689-3.89 2.346a.72.72 0 0 1-.436.106.8.8 0 0 1-.395-.147.84.84 0 0 1-.274-.331.65.65 0 0 1-.03-.454l1.032-4.417-3.434-2.973a.74.74 0 0 1-.245-.387.7.7 0 0 1 .027-.428.85.85 0 0 1 .233-.34.8.8 0 0 1 .416-.172l4.532-.396 1.76-4.171a.68.68 0 0 1 .291-.344.82.82 0 0 1 .825 0q.195.111.291.344l1.76 4.171 4.533.396a.8.8 0 0 1 .415.172q.152.132.233.34a.7.7 0 0 1 .028.428.74.74 0 0 1-.246.387l-3.434 2.973 1.033 4.417a.65.65 0 0 1-.031.454.84.84 0 0 1-.273.331.8.8 0 0 1-.395.147.72.72 0 0 1-.436-.106z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
