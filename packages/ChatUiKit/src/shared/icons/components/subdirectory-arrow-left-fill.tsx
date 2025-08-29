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
        d='m7.373 15.75 3.154 3.154a.76.76 0 0 1 .236.522.69.69 0 0 1-.22.532.74.74 0 0 1-.535.232.74.74 0 0 1-.535-.232l-4.34-4.325A.83.83 0 0 1 4.877 15q0-.18.058-.336a.8.8 0 0 1 .198-.297l4.355-4.356a.7.7 0 0 1 .523-.22q.299.003.531.236.217.232.225.527a.7.7 0 0 1-.225.527L7.373 14.25h9.32a.3.3 0 0 0 .22-.086.3.3 0 0 0 .087-.222V5.25q0-.32.215-.535a.73.73 0 0 1 .535-.215q.32 0 .535.215a.73.73 0 0 1 .215.535v8.692q0 .749-.53 1.278-.53.53-1.278.53z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
