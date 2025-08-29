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
        d='M12 19.27q-.619 0-1.06-.442a1.44 1.44 0 0 1-.44-1.059q0-.618.44-1.06.442-.44 1.06-.44t1.06.44q.44.442.44 1.06 0 .62-.44 1.06-.442.44-1.06.44m0-5.77q-.619 0-1.06-.44A1.44 1.44 0 0 1 10.5 12q0-.619.44-1.06.442-.44 1.06-.44t1.06.44q.44.441.44 1.06 0 .618-.44 1.06-.442.44-1.06.44m0-5.77q-.619 0-1.06-.44a1.44 1.44 0 0 1-.44-1.06q0-.618.44-1.059.442-.44 1.06-.44t1.06.44q.44.44.44 1.06 0 .618-.44 1.06-.442.44-1.06.44'
      />
    </G>
  </Svg>
);
export default SvgComponent;
