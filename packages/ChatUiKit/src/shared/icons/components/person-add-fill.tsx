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
        d='M18.125 10.75h-2.25a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.32.216-.535a.73.73 0 0 1 .534-.215h2.25V7q0-.319.216-.534a.73.73 0 0 1 .534-.216q.32 0 .535.216a.73.73 0 0 1 .215.534v2.25h2.25q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .319-.216.534a.73.73 0 0 1-.534.216h-2.25V13q0 .318-.216.534a.73.73 0 0 1-.534.216.72.72 0 0 1-.535-.216.73.73 0 0 1-.215-.534zM9 11.692q-1.444 0-2.472-1.028T5.5 8.192 6.528 5.72 9 4.692t2.472 1.028T12.5 8.192t-1.028 2.472Q10.443 11.693 9 11.692m-7.5 6.096v-.704q0-.735.399-1.36a2.66 2.66 0 0 1 1.067-.963 14.5 14.5 0 0 1 2.99-1.09 12.95 12.95 0 0 1 6.087 0q1.509.364 2.992 1.09.667.337 1.066.963t.399 1.36v.704q0 .633-.443 1.076a1.47 1.47 0 0 1-1.076.444H3.019q-.633 0-1.076-.444a1.47 1.47 0 0 1-.443-1.076'
      />
    </G>
  </Svg>
);
export default SvgComponent;
