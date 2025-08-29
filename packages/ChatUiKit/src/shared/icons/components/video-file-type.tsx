import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 32 32'>
    <Path fill='#fff' d='M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z' />
    <G filter='url(#prefix__a)'>
      <Path
        fill='#7C8EEE'
        fillRule='evenodd'
        d='M7.333 2.667A2.133 2.133 0 0 0 5.199 4.8v22.4c0 1.178.955 2.134 2.134 2.134h17.333a2.133 2.133 0 0 0 2.133-2.134V9.333l-6.666-6.666z'
        clipRule='evenodd'
      />
    </G>
    <G filter='url(#prefix__b)'>
      <Path
        fill='#fff'
        d='m21.09 17.753-7.775 4.635a.78.78 0 0 1-1.18-.674v-9.27c0-.595.66-.97 1.18-.673l7.775 4.635c.504.313.504 1.05 0 1.347'
      />
    </G>
    <Path fill='url(#prefix__c)' d='M26.176 8.708H20.76L26.8 14.75V9.333z' />
    <Path fill='#CAD1F8' d='M22.267 9.333h4.534l-6.667-6.667V7.2c0 1.178.955 2.133 2.133 2.133' />
    <Defs>
      <LinearGradient
        id='prefix__c'
        x1={22.114}
        x2={28.156}
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
