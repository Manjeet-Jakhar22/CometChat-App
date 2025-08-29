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
        d='m17.768 10.885 2.746-2.747q.221-.22.497-.11t.276.422v7.1q0 .311-.276.422t-.497-.11l-2.854-2.854v.173q-.154.408-.616.526-.463.118-.812-.232L8.793 6.036a.8.8 0 0 1-.254-.472 1.016 1.016 0 0 1 .384-.904.8.8 0 0 1 .518-.16h6.52q.756 0 1.282.525.525.525.525 1.283zm1.677 10.746L2.06 4.246a.73.73 0 0 1-.212-.522.7.7 0 0 1 .212-.532.72.72 0 0 1 .527-.217q.31 0 .527.217L20.5 20.577q.208.207.212.522a.7.7 0 0 1-.212.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217M4.44 4.519l13.308 13.308a1.75 1.75 0 0 1-.559 1.186q-.51.487-1.23.487H4.576q-.758 0-1.283-.525a1.75 1.75 0 0 1-.525-1.283V6.308q0-.72.487-1.23.486-.51 1.186-.559'
      />
    </G>
  </Svg>
);
export default SvgComponent;
