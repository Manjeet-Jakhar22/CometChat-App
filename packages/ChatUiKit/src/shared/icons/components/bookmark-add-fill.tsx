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
        d='M17 7h-1.25a.73.73 0 0 1-.534-.216A.73.73 0 0 1 15 6.25q0-.32.216-.535a.73.73 0 0 1 .534-.215H17V4.25q0-.319.216-.534a.73.73 0 0 1 .534-.216q.32 0 .535.216a.73.73 0 0 1 .215.534V5.5h1.25q.318 0 .534.216a.73.73 0 0 1 .216.534q0 .32-.216.535A.73.73 0 0 1 19.75 7H18.5v1.25q0 .319-.216.534A.73.73 0 0 1 17.75 9a.73.73 0 0 1-.535-.216A.73.73 0 0 1 17 8.25zm-5 10.462-3.97 1.703q-.903.387-1.716-.145-.814-.532-.814-1.506V5.308q0-.746.531-1.277A1.74 1.74 0 0 1 7.308 3.5h5.346a.66.66 0 0 1 .61.357.78.78 0 0 1 .032.743 4 4 0 0 0-.228.79Q13 5.786 13 6.25q0 1.77 1.147 3.093T17 10.93q.184.03.33.038t.285.008a.93.93 0 0 1 .626.248.77.77 0 0 1 .259.59v5.7q0 .975-.814 1.506-.813.533-1.717.146z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
