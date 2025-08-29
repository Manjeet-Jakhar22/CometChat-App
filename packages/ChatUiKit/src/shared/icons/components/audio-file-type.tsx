import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 32 32'>
    <Path fill='#fff' d='M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z' />
    <G filter='url(#prefix__a)'>
      <Path
        fill='#F16C00'
        fillRule='evenodd'
        d='M7.333 2.667A2.133 2.133 0 0 0 5.199 4.8v22.4c0 1.178.955 2.134 2.134 2.134h17.333a2.133 2.133 0 0 0 2.133-2.134V9.333l-6.666-6.666z'
        clipRule='evenodd'
      />
    </G>
    <Path
      fill='#fff'
      d='M21.62 15.974a1.5 1.5 0 0 1-.229.55c-.09.139-.183.231-.275.184-.091 0-.139-.597-.183-.69q-.106-.241-.137-.505c-.046-.367-.184-.691-.415-.828q-.343-.276-.962-.415a3 3 0 0 1-1.24-.55c-.366-.277-.779-.507-1.008-.783-.23-.23-.414-.277-.505-.23-.138.046-.183.184-.183.322v8.555c0 .23-.046.506-.138.782-.091.277-.138.552-.367.827-.23.277-.55.46-.963.645-.414.184-.918.277-1.47.322a3.3 3.3 0 0 1-1.65-.322 3.3 3.3 0 0 1-1.147-.874c-.276-.368-.414-.736-.414-1.197 0-.413.185-.827.597-1.195.367-.367.78-.644 1.24-.782.457-.139.871-.23 1.284-.23s1.055 0 1.376.093c.32.091.551.138.734.184v-8.142c0-.277.091-.505.23-.689.137-.184.366-.276.595-.322q.345-.069.552.138c.138.092 0 .277.182.46q.207.275.552.69c.23.276.504.506.87.735.322.23.598.368.827.507.23.09.46.184.643.276.183.091.413.183.596.321s.414.322.642.599c.23.277.366.505.413.781 0 .277 0 .552-.047.782z'
    />
    <Path fill='url(#prefix__b)' d='M26.176 8.708H20.76L26.8 14.75V9.333z' />
    <Path fill='#F9C499' d='M22.267 9.333h4.534l-6.667-6.667V7.2c0 1.178.955 2.133 2.133 2.133' />
    <Defs>
      <LinearGradient
        id='prefix__b'
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
