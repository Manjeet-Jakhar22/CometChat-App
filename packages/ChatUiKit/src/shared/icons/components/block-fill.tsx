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
        d='M12.002 21.5a9.3 9.3 0 0 1-3.706-.748 9.6 9.6 0 0 1-3.016-2.03 9.6 9.6 0 0 1-2.032-3.016 9.25 9.25 0 0 1-.748-3.704q0-1.972.748-3.706a9.6 9.6 0 0 1 2.03-3.016 9.6 9.6 0 0 1 3.016-2.032 9.25 9.25 0 0 1 3.704-.748q1.972 0 3.706.748a9.6 9.6 0 0 1 3.017 2.03 9.6 9.6 0 0 1 2.03 3.016 9.25 9.25 0 0 1 .749 3.704q0 1.972-.748 3.706a9.6 9.6 0 0 1-2.03 3.017 9.6 9.6 0 0 1-3.016 2.03 9.25 9.25 0 0 1-3.704.749M12 20a7.8 7.8 0 0 0 2.71-.476 7.9 7.9 0 0 0 2.382-1.378L5.854 6.908A8.1 8.1 0 0 0 4.48 9.29 7.8 7.8 0 0 0 4 12q0 3.35 2.325 5.675T12 20m6.146-2.908a7.9 7.9 0 0 0 1.378-2.381A7.8 7.8 0 0 0 20 12q0-3.35-2.325-5.675T12 4q-1.41 0-2.717.471a7.6 7.6 0 0 0-2.375 1.383z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
