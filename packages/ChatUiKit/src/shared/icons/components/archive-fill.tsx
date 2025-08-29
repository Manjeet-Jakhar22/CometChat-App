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
        d='M5.385 20.5q-.75 0-1.317-.568-.568-.57-.568-1.317V7.005q0-.32.103-.612.102-.291.309-.537l1.404-1.698q.245-.321.615-.49.369-.168.78-.168H17.27q.412 0 .786.168.374.169.62.49l1.413 1.717q.206.246.309.542t.103.618v11.58q0 .75-.568 1.317-.57.568-1.317.568zM5.39 6.404H18.6l-1.09-1.298a.4.4 0 0 0-.111-.077.3.3 0 0 0-.13-.029H6.721a.3.3 0 0 0-.13.029.4.4 0 0 0-.11.077zM12 10.289a.73.73 0 0 0-.534.215.73.73 0 0 0-.216.535v3.7l-1.323-1.324a.73.73 0 0 0-.522-.212.7.7 0 0 0-.532.213.72.72 0 0 0-.217.526q0 .31.217.527l2.494 2.495q.271.27.633.27.361 0 .633-.27l2.494-2.495a.73.73 0 0 0 .212-.522.7.7 0 0 0-.212-.531.72.72 0 0 0-.527-.218.72.72 0 0 0-.527.217L12.75 14.74v-3.7a.73.73 0 0 0-.216-.535.73.73 0 0 0-.534-.215'
      />
    </G>
  </Svg>
);
export default SvgComponent;
