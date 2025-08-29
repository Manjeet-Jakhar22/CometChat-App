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
        d='M19.44 20.5q-2.827 0-5.68-1.314t-5.242-3.709-3.704-5.242T3.5 4.56A1.03 1.03 0 0 1 4.55 3.5h3.262q.378 0 .668.247t.368.61L9.421 7.3q.06.41-.025.704-.084.293-.304.494l-2.31 2.248q.558 1.02 1.275 1.932.716.91 1.55 1.74a17.2 17.2 0 0 0 3.753 2.842l2.244-2.264q.235-.245.568-.342.334-.099.694-.048l2.776.565q.38.1.619.387.24.285.239.65v3.242q0 .45-.303.75t-.757.3M16 8h-2.25a.73.73 0 0 1-.534-.216A.73.73 0 0 1 13 7.25q0-.32.216-.535a.73.73 0 0 1 .534-.215H16V4.25q0-.319.216-.534a.73.73 0 0 1 .534-.216q.32 0 .535.216a.73.73 0 0 1 .215.534V6.5h2.25q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .32-.216.535A.73.73 0 0 1 19.75 8H17.5v2.25q0 .319-.216.534a.73.73 0 0 1-.534.216.73.73 0 0 1-.535-.216.73.73 0 0 1-.215-.534z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
