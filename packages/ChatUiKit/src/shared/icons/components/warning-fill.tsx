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
        d='M3.425 20.5a.876.876 0 0 1-.772-.452.96.96 0 0 1-.129-.437.8.8 0 0 1 .127-.467l8.561-14.788A.9.9 0 0 1 12 3.904q.23 0 .44.11a.9.9 0 0 1 .347.342l8.56 14.788q.14.231.128.467a.96.96 0 0 1-.129.437.88.88 0 0 1-.771.452zm8.574-2.692q.343 0 .576-.232a.78.78 0 0 0 .232-.576.78.78 0 0 0-.232-.575.78.78 0 0 0-.576-.233.78.78 0 0 0-.575.233.78.78 0 0 0-.233.575q0 .343.233.576a.78.78 0 0 0 .575.232m0-2.616q.32 0 .535-.215a.73.73 0 0 0 .215-.535v-3.5a.73.73 0 0 0-.216-.534.73.73 0 0 0-.534-.216.72.72 0 0 0-.534.216.73.73 0 0 0-.216.534v3.5q0 .32.216.535a.73.73 0 0 0 .534.215'
      />
    </G>
  </Svg>
);
export default SvgComponent;
