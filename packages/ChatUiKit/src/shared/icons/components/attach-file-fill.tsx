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
        d='M17.673 15.644q0 2.436-1.695 4.146t-4.127 1.71q-2.43 0-4.131-1.71-1.7-1.71-1.7-4.146v-8.99q0-1.731 1.202-2.942Q8.422 2.5 10.154 2.5q1.73 0 2.933 1.212 1.202 1.21 1.202 2.942v8.51a2.38 2.38 0 0 1-.707 1.733 2.33 2.33 0 0 1-1.725.718 2.37 2.37 0 0 1-1.734-.713 2.36 2.36 0 0 1-.719-1.739V7.136q0-.318.216-.535a.73.73 0 0 1 .535-.215q.318 0 .534.215a.73.73 0 0 1 .215.535v8.029q0 .402.27.677t.673.275a.9.9 0 0 0 .672-.275.93.93 0 0 0 .27-.677v-8.52q-.015-1.107-.77-1.876Q11.266 4 10.154 4q-1.107 0-1.87.773a2.58 2.58 0 0 0-.764 1.88v8.991q-.015 1.814 1.253 3.085 1.27 1.27 3.082 1.271 1.786 0 3.037-1.271 1.25-1.272 1.281-3.085v-8.51q0-.318.216-.534a.73.73 0 0 1 .535-.215q.318 0 .534.215a.73.73 0 0 1 .215.535z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
