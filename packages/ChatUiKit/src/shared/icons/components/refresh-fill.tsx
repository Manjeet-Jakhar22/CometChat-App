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
        d='M12.04 19.5q-3.142 0-5.321-2.18-2.18-2.178-2.18-5.318T6.72 6.68Q8.899 4.5 12.039 4.5q1.755 0 3.32.78a7.1 7.1 0 0 1 2.603 2.2V5.25q0-.319.216-.534a.73.73 0 0 1 .534-.216q.32 0 .535.216a.73.73 0 0 1 .215.534v4.461q0 .385-.26.644a.88.88 0 0 1-.644.26h-4.461a.73.73 0 0 1-.535-.215.73.73 0 0 1-.215-.535q0-.319.215-.534a.73.73 0 0 1 .535-.215h3.2a5.9 5.9 0 0 0-2.193-2.282A5.9 5.9 0 0 0 12.04 6q-2.5 0-4.25 1.75T6.04 12t1.75 4.25T12.04 18a5.86 5.86 0 0 0 3.192-.916 5.9 5.9 0 0 0 2.195-2.442.799.799 0 0 1 .98-.394.65.65 0 0 1 .428.4.66.66 0 0 1-.02.577 7.45 7.45 0 0 1-2.742 3.109Q14.257 19.5 12.039 19.5'
      />
    </G>
  </Svg>
);
export default SvgComponent;
