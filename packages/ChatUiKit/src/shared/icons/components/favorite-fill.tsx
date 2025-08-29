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
        d='M11.99 19.71q-.321 0-.645-.116a1.5 1.5 0 0 1-.57-.361l-1.437-1.306a66 66 0 0 1-4.748-4.764Q2.5 10.823 2.5 8.15q0-2.129 1.436-3.565T7.5 3.15q1.21 0 2.39.558T12 5.519q.93-1.254 2.11-1.811a5.54 5.54 0 0 1 2.39-.558q2.13 0 3.564 1.435Q21.5 6.022 21.5 8.15q0 2.701-2.125 5.068a64 64 0 0 1-4.738 4.724l-1.422 1.29a1.5 1.5 0 0 1-.575.362q-.329.115-.65.115'
      />
    </G>
  </Svg>
);
export default SvgComponent;
