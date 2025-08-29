import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 32 32'>
    <Path fill='#fff' d='M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z' />
    <G filter='url(#prefix__a)'>
      <Path
        fill='#CCC'
        fillRule='evenodd'
        d='M7.333 2.667A2.133 2.133 0 0 0 5.199 4.8v22.4c0 1.178.955 2.134 2.134 2.134h17.333a2.133 2.133 0 0 0 2.133-2.134V9.333l-6.666-6.666z'
        clipRule='evenodd'
      />
    </G>
    <G filter='url(#prefix__b)'>
      <Path
        fill='#fff'
        d='M12.666 15.666c0-.666.133-1.2.267-1.533.133-.333.4-.667.733-.933a2.44 2.44 0 0 1 1.133-.667c.4-.133.8-.2 1.267-.2.933 0 1.667.267 2.333.8.6.533.934 1.2.934 2.067 0 .4-.134.733-.267 1.066q-.2.501-1 1.2c-.533.467-.733.8-.933 1s-.267.467-.4.734c-.134.266-.067.466-.067 1.133h-1.333c0-.667.066-1 .133-1.333.067-.334.2-.6.4-.867s.4-.6.867-1.067.8-.8.933-1 .267-.533.267-1-.2-.8-.534-1.133c-.333-.333-.8-.533-1.4-.533-1.333 0-2 .933-2 2.266zm4 7.334h-1.333v-1.334h1.333z'
      />
    </G>
    <Path fill='url(#prefix__c)' d='M26.174 8.708h-5.416l6.041 6.042V9.333z' />
    <Path fill='#EAEAEA' d='M22.266 9.333h4.533l-6.667-6.667V7.2c0 1.178.955 2.133 2.133 2.133' />
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
