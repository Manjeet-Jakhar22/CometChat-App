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
        d='M14.185 11.36 7.57 4.744a.7.7 0 0 1-.166-.238.7.7 0 0 1-.048-.262q0-.284.192-.514a.65.65 0 0 1 .528-.23h7.675q.318 0 .534.217a.73.73 0 0 1 .216.536q0 .3-.262.44a4 4 0 0 0-.488.307h-.25v5.808q0 .518-.473.72-.474.201-.843-.168M11.251 21v-5.5H8.18q-.551 0-.882-.385a1.28 1.28 0 0 1-.33-.857q0-.237.094-.469t.304-.443l1.135-1.135V10.64L2.658 4.765a.74.74 0 0 1-.22-.514.7.7 0 0 1 .222-.541.71.71 0 0 1 .525-.216q.31 0 .527.218L19.89 19.889a.71.71 0 0 1 .22.53.787.787 0 0 1-.763.764.7.7 0 0 1-.526-.226L13.362 15.5h-.611V21q0 .318-.216.534a.73.73 0 0 1-.535.216.73.73 0 0 1-.534-.216.73.73 0 0 1-.215-.534'
      />
    </G>
  </Svg>
);
export default SvgComponent;
