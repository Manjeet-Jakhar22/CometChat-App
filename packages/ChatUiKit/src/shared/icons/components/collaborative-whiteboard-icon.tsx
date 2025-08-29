import type { SvgProps } from "react-native-svg";
import Svg, { G, Path } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <G fill={color ?? "#6852D6"}>
      <Path
        fillRule='evenodd'
        d='M2 4.147A3.147 3.147 0 0 1 5.147 1H15.85a3.147 3.147 0 0 1 3.147 3.147V9.54a.63.63 0 0 1-.179.44l-4.067 4.16-5.817 5.571a.63.63 0 0 1-.436.175h-3.35A3.15 3.15 0 0 1 2 16.737zm7.24-.195a.826.826 0 0 0 0 1.652h5.98a.826.826 0 0 0 0-1.652zM5.775 7.415a.826.826 0 1 0 0 1.652h9.443a.826.826 0 0 0 0-1.652zm0 3.461a.826.826 0 1 0 0 1.652h7.554a.826.826 0 1 0 0-1.652z'
        clipRule='evenodd'
      />
      <Path d='M21.128 11.334a1.26 1.26 0 0 0-1.78 0l-7.935 7.934a.33.33 0 0 0-.094.187l-.367 2.57a.33.33 0 0 0 .374.375l2.57-.367a.33.33 0 0 0 .188-.094l7.934-7.934a1.26 1.26 0 0 0 0-1.78z' />
    </G>
  </Svg>
);
export default SvgComponent;
