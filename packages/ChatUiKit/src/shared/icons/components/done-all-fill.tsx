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
        d='M1.923 12.877a.7.7 0 0 1-.22-.522q.002-.3.236-.532a.78.78 0 0 1 .527-.225.7.7 0 0 1 .526.225l3.724 3.723.25-.25q.146.07.306.172.16.103.317.259.232.232.225.527a.76.76 0 0 1-.24.527l-.241.24a.92.92 0 0 1-.633.264.84.84 0 0 1-.633-.264zm10.427 2.654 8.673-8.673a.7.7 0 0 1 .522-.22q.3.002.532.235.217.232.225.527a.7.7 0 0 1-.225.527l-9.094 9.094a.87.87 0 0 1-.633.271.87.87 0 0 1-.633-.27l-4.144-4.145a.72.72 0 0 1-.212-.514.75.75 0 0 1 .212-.54.74.74 0 0 1 .535-.232q.302 0 .534.232zm4.062-7.589-3.881 3.881a.72.72 0 0 1-.515.213.75.75 0 0 1-.539-.213.73.73 0 0 1-.233-.534q0-.303.233-.535l3.88-3.881a.72.72 0 0 1 .515-.213.75.75 0 0 1 .54.213.74.74 0 0 1 .232.535q0 .301-.232.534'
      />
    </G>
  </Svg>
);
export default SvgComponent;
