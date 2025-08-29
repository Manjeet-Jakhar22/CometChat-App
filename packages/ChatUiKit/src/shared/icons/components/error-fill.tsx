import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <G clipPath='url(#prefix__a)'>
      <Mask
        id='prefix__b'
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
      <G mask='url(#prefix__b)'>
        <Path fill='#fff' d='M2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0' />
        <Path
          fill={color}
          d='M12 16.73q.343 0 .575-.232a.78.78 0 0 0 .233-.575.78.78 0 0 0-.232-.575.78.78 0 0 0-.576-.232.78.78 0 0 0-.575.232.78.78 0 0 0-.233.575q0 .343.232.575a.78.78 0 0 0 .576.233m0-3.653q.32 0 .534-.216a.73.73 0 0 0 .216-.534v-4.5a.73.73 0 0 0-.216-.534.73.73 0 0 0-.534-.216.73.73 0 0 0-.534.216.73.73 0 0 0-.216.534v4.5q0 .319.216.534a.73.73 0 0 0 .534.216m.002 8.423a9.3 9.3 0 0 1-3.706-.748 9.6 9.6 0 0 1-3.016-2.03 9.6 9.6 0 0 1-2.032-3.016 9.25 9.25 0 0 1-.748-3.704q0-1.972.748-3.706a9.6 9.6 0 0 1 2.03-3.016 9.6 9.6 0 0 1 3.016-2.032 9.25 9.25 0 0 1 3.704-.748q1.972 0 3.706.748a9.6 9.6 0 0 1 3.017 2.03 9.6 9.6 0 0 1 2.03 3.016 9.25 9.25 0 0 1 .749 3.704q0 1.972-.748 3.706a9.6 9.6 0 0 1-2.03 3.017 9.6 9.6 0 0 1-3.016 2.03 9.25 9.25 0 0 1-3.704.749'
        />
      </G>
    </G>
    <Defs>
      <ClipPath id='prefix__a'>
        <Path fill='#fff' d='M0 0h24v24H0z' />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
