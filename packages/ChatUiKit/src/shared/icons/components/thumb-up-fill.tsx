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
        d='M20.692 8.5q.714 0 1.26.547.549.548.548 1.26v1.616a1.9 1.9 0 0 1-.13.673l-2.866 6.762q-.216.48-.721.811-.506.33-1.052.331H9.634q-.747 0-1.277-.53a1.74 1.74 0 0 1-.53-1.278V9.248q0-.362.148-.695.148-.334.394-.58l5.29-5.256q.3-.282.691-.348a1.2 1.2 0 0 1 .752.117q.36.183.519.537t.063.752L14.609 8.5zm-16.384 12q-.748 0-1.278-.53a1.74 1.74 0 0 1-.53-1.278v-8.384q0-.748.53-1.278t1.278-.53h.211q.748 0 1.278.53t.53 1.278v8.394q0 .748-.53 1.273a1.75 1.75 0 0 1-1.278.525z'
      />
    </G>
  </Svg>
);
export default SvgComponent;
