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
        d='M16.806 21.5a2.6 2.6 0 0 1-1.907-.785 2.6 2.6 0 0 1-.783-1.907q0-.15.103-.73l-7.111-4.186q-.362.375-.86.588a2.7 2.7 0 0 1-1.065.212 2.58 2.58 0 0 1-1.9-.788A2.6 2.6 0 0 1 2.5 12q0-1.115.783-1.904a2.58 2.58 0 0 1 1.9-.788q.568 0 1.066.212.497.213.859.588l7.111-4.177a2 2 0 0 1-.082-.362 3 3 0 0 1-.021-.377q0-1.122.785-1.907A2.6 2.6 0 0 1 16.81 2.5a2.6 2.6 0 0 1 1.906.786q.784.786.784 1.908 0 1.124-.785 1.907a2.6 2.6 0 0 1-1.907.784q-.571 0-1.063-.218a2.7 2.7 0 0 1-.853-.592l-7.111 4.187q.06.184.082.361.021.177.021.377t-.022.377a2 2 0 0 1-.081.361l7.111 4.187q.362-.375.853-.592a2.6 2.6 0 0 1 1.063-.217q1.122 0 1.907.785a2.6 2.6 0 0 1 .785 1.909 2.6 2.6 0 0 1-.786 1.906 2.6 2.6 0 0 1-1.908.784'
      />
    </G>
  </Svg>
);
export default SvgComponent;
