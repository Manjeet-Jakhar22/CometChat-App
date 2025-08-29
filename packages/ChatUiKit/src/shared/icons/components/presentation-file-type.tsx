import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 32 32'>
    <Path fill='#fff' d='M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z' />
    <G filter='url(#prefix__a)'>
      <Path
        fill='#FF9333'
        fillRule='evenodd'
        d='M7.333 2.667A2.133 2.133 0 0 0 5.199 4.8v22.4c0 1.178.955 2.134 2.134 2.134h17.333a2.133 2.133 0 0 0 2.133-2.134V9.333l-6.666-6.666z'
        clipRule='evenodd'
      />
    </G>
    <G filter='url(#prefix__b)'>
      <Path
        fill='#fff'
        d='M14.192 22.667v-4.09h2.913c2.287 0 3.444-.994 3.444-2.969q0-2.94-3.43-2.941h-4.07v10zm2.858-5.084h-2.858v-3.922h2.858c.794 0 1.38.155 1.77.49.39.295.586.785.586 1.457s-.195 1.163-.572 1.485c-.39.322-.976.49-1.784.49'
      />
    </G>
    <Path fill='url(#prefix__c)' d='M26.174 8.708h-5.416l6.041 6.042V9.333z' />
    <Path fill='#FFD3AD' d='M22.266 9.333h4.533l-6.667-6.667V7.2c0 1.178.955 2.133 2.133 2.133' />
    <Defs>
      <LinearGradient
        id='prefix__c'
        x1={22.112}
        x2={28.154}
        y1={7.354}
        y2={13.396}
        gradientUnits='userSpaceOnUse'
      >
        <Stop stopOpacity={0.2} />
        <Stop offset={1} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgComponent;
