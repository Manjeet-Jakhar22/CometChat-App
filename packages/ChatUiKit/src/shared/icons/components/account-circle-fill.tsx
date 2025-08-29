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
        d='M6.023 17.292q1.275-.946 2.778-1.494A9.3 9.3 0 0 1 12 15.25q1.695 0 3.199.548t2.778 1.494a7.9 7.9 0 0 0 1.478-2.373A7.7 7.7 0 0 0 20 12q0-3.325-2.337-5.662Q15.325 4 12 4T6.338 6.338 4 12q0 1.57.545 2.92.545 1.347 1.478 2.372M12 12.75q-1.37 0-2.31-.94T8.75 9.5q0-1.37.94-2.31T12 6.25q1.37 0 2.31.94t.94 2.31q0 1.37-.94 2.31t-2.31.94m0 8.75a9.3 9.3 0 0 1-3.713-.744 9.5 9.5 0 0 1-3.016-2.027 9.5 9.5 0 0 1-2.027-3.016A9.3 9.3 0 0 1 2.5 12q0-1.98.744-3.713a9.5 9.5 0 0 1 2.027-3.016 9.5 9.5 0 0 1 3.016-2.027A9.3 9.3 0 0 1 12 2.5a9.3 9.3 0 0 1 3.713.744 9.5 9.5 0 0 1 3.016 2.027 9.5 9.5 0 0 1 2.027 3.016A9.3 9.3 0 0 1 21.5 12q0 1.98-.744 3.713a9.5 9.5 0 0 1-2.027 3.016 9.5 9.5 0 0 1-3.016 2.027A9.3 9.3 0 0 1 12 21.5'
      />
    </G>
  </Svg>
);
export default SvgComponent;
