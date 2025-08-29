import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 32 32'>
    <Path fill='#fff' d='M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z' />
    <G filter='url(#prefix__a)'>
      <Path
        fill='#F6AD00'
        fillRule='evenodd'
        d='M7.333 2.667A2.133 2.133 0 0 0 5.199 4.8v22.4c0 1.178.955 2.134 2.134 2.134h17.333a2.133 2.133 0 0 0 2.133-2.134V9.333l-6.666-6.666z'
        clipRule='evenodd'
      />
    </G>
    <G fill='#fff' filter='url(#prefix__b)'>
      <Path d='m9.96 21.991 2.43-3.571a.376.376 0 0 1 .578-.057l1.605 1.573 3.524-5.522a.378.378 0 0 1 .646.014l4.378 7.587a.378.378 0 0 1-.328.567h-12.52a.378.378 0 0 1-.313-.59M10.688 13.905a1.905 1.905 0 1 0 3.81 0 1.905 1.905 0 0 0-3.81 0' />
    </G>
    <Path fill='url(#prefix__c)' d='M26.174 8.708h-5.416l6.041 6.042V9.333z' />
    <Path fill='#FBDE99' d='M22.267 9.333h4.534l-6.667-6.667V7.2c0 1.178.955 2.133 2.133 2.133' />
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
