import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 18 19'>
    <G clipPath='url(#prefix__a)'>
      <Path
        fill={color ?? "#A1A1A1"}
        fillRule='evenodd'
        d='M6.743 17.575a.96.96 0 0 0 .586.314q.832.133 1.675.145.842-.012 1.673-.146a.96.96 0 0 0 .828-.934v-2.083l.107-.927c.15-1.22.75-2.34 1.68-3.142a5.3 5.3 0 0 0 1.756-4.146A5.88 5.88 0 0 0 9.004.967a5.88 5.88 0 0 0-6.048 5.689 5.3 5.3 0 0 0 1.76 4.146 4.95 4.95 0 0 1 1.679 3.142l.106.928v2.084a.96.96 0 0 0 .242.619M4.344 8.48c-.24-.577-.35-1.2-.321-1.824a4.815 4.815 0 0 1 4.98-4.622 4.834 4.834 0 0 1 4.979 4.661 4.24 4.24 0 0 1-1.404 3.316 5.98 5.98 0 0 0-2.019 3.756H7.448a6.02 6.02 0 0 0-2.039-3.77A4.3 4.3 0 0 1 4.344 8.48m4.301 2.18v2.396h.71v-2.397l.895-.824a.71.71 0 1 0-.518-.527L9 9.982l-.731-.674a.7.7 0 0 0-.101-.558.71.71 0 1 0-.413 1.085zm.345 6.307a10 10 0 0 1-1.422-.121v-.59h1.436v-.712H7.568v-.672l.003-.038h2.864v2.013q-.718.111-1.445.12'
        clipRule='evenodd'
      />
    </G>
    <Defs>
      <ClipPath id='prefix__a'>
        <Path fill='#fff' d='M.467.967h17.067v17.067H.467z' />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
