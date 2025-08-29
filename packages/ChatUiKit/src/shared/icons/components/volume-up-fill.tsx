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
        d='M18.847 11.975a6.8 6.8 0 0 0-1.106-3.768 6.8 6.8 0 0 0-2.964-2.543.88.88 0 0 1-.425-.408.66.66 0 0 1-.03-.55.72.72 0 0 1 .426-.421.79.79 0 0 1 .62.019 8.4 8.4 0 0 1 3.62 3.09q1.358 2.064 1.358 4.581t-1.358 4.58a8.4 8.4 0 0 1-3.62 3.091.79.79 0 0 1-.62.02.72.72 0 0 1-.426-.422.66.66 0 0 1 .03-.55.88.88 0 0 1 .425-.407 6.8 6.8 0 0 0 2.964-2.544 6.8 6.8 0 0 0 1.105-3.768M7.365 14.5H4.558a.88.88 0 0 1-.645-.259.88.88 0 0 1-.259-.645v-3.192q0-.387.259-.645a.88.88 0 0 1 .645-.259h2.808l2.992-2.992q.36-.36.828-.165t.468.707v9.9q0 .512-.468.707t-.828-.165zm8.788-2.5q0 .934-.389 1.771a4.1 4.1 0 0 1-1.048 1.408.42.42 0 0 1-.445.027.39.39 0 0 1-.233-.375V9.119q0-.262.233-.375a.42.42 0 0 1 .445.027q.66.586 1.048 1.44.39.855.389 1.789'
      />
    </G>
  </Svg>
);
export default SvgComponent;
