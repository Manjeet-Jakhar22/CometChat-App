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
        d='M12.1 21.5a9.3 9.3 0 0 1-3.74-.757 9.7 9.7 0 0 1-3.046-2.056 9.7 9.7 0 0 1-2.057-3.047A9.3 9.3 0 0 1 2.5 11.9q0-2.883 1.56-5.266t4.219-3.482a.91.91 0 0 1 .895.07.87.87 0 0 1 .426.769q.03 2.085.815 3.977a10.3 10.3 0 0 0 2.254 3.363q1.47 1.47 3.353 2.25 1.882.78 3.968.81.554.003.814.422.26.42.06.908-1.13 2.645-3.506 4.212T12.1 21.5'
      />
    </G>
  </Svg>
);
export default SvgComponent;
