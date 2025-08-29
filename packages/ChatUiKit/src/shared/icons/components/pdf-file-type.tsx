import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 32 32'>
    <Path fill='#fff' d='M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z' />
    <G filter='url(#prefix__a)'>
      <Path
        fill='#FA4E4E'
        fillRule='evenodd'
        d='M7.333 2.667A2.133 2.133 0 0 0 5.199 4.8v22.4c0 1.178.955 2.134 2.134 2.134h17.333a2.133 2.133 0 0 0 2.133-2.134V9.333l-6.666-6.666z'
        clipRule='evenodd'
      />
    </G>
    <Path
      fill='#fff'
      d='M20.33 20.626a4.25 4.25 0 0 1-2.465-1.002c-1.366.3-2.666.735-3.966 1.27-1.033 1.837-2 2.773-2.833 2.773-.166 0-.366-.033-.5-.134a.99.99 0 0 1-.566-.902c0-.3.067-1.136 3.233-2.506a24 24 0 0 0 1.766-4.144c-.4-.802-1.267-2.773-.667-3.776.2-.367.6-.568 1.034-.534.333 0 .666.167.866.434.433.601.4 1.871-.167 3.743a10.1 10.1 0 0 0 2.066 2.673c.7-.134 1.4-.234 2.1-.234 1.566.033 1.8.768 1.766 1.203 0 1.136-1.1 1.136-1.666 1.136M11 22.698l.1-.034c.466-.167.833-.5 1.1-.935-.5.2-.9.534-1.2.969m4.432-10.025h-.1c-.033 0-.1 0-.133.033-.134.568-.034 1.17.2 1.705.2-.568.2-1.17.033-1.738m.233 4.845-.033.067-.033-.033c-.3.768-.634 1.537-1 2.272l.066-.033v.066a19 19 0 0 1 2.267-.668l-.034-.033h.1c-.5-.502-.966-1.07-1.333-1.638m4.533 1.771c-.3 0-.567 0-.867.067.333.167.667.234 1 .268.233.033.466 0 .666-.067 0-.1-.133-.268-.8-.268'
    />
    <Path fill='url(#prefix__b)' d='M26.174 8.708h-5.416l6.041 6.042V9.333z' />
    <Path fill='#FDB8B8' d='M22.266 9.333h4.533l-6.667-6.667V7.2c0 1.178.955 2.133 2.133 2.133' />
    <Defs>
      <LinearGradient
        id='prefix__b'
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
