import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M9.05 14.9H5.929a.77.77 0 0 1-.567-.23.77.77 0 0 1-.23-.566V9.888a.76.76 0 0 1 .23-.559.77.77 0 0 1 .567-.229h3.12l3.517-3.517q.375-.375.863-.177.487.198.487.723v11.734q0 .533-.487.73-.488.2-.863-.176zm9.316-2.9q0 1.217-.608 2.227a4 4 0 0 1-1.688 1.548q-.212.104-.391-.019a.39.39 0 0 1-.18-.34v-6.85a.39.39 0 0 1 .18-.339q.18-.123.391-.019 1.08.542 1.688 1.567T18.366 12m-6.033-3.83-2.588 2.513H6.716v2.634h3.03l2.587 2.52z'
    />
  </Svg>
);
export default SvgComponent;
