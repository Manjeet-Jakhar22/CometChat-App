import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 18 19'>
    <G clipPath='url(#prefix__a)'>
      <Path
        fill={color ?? "#A1A1A1"}
        d='M5.8 18.032H3.667V16.61a.71.71 0 0 1-.71-.71v-2.844a.71.71 0 0 1 .71-.712h1.066v-1.066a3.306 3.306 0 0 1 3.317-3.2h1.902a3.307 3.307 0 0 1 3.315 3.2v1.066h1.067a.71.71 0 0 1 .71.712v2.843a.71.71 0 0 1-.71.71v1.423H12.2V16.61H5.8zM3.667 15.19v.7h10.667v-.7h-2.667v-.012a.356.356 0 0 0-.357-.355H6.69a.355.355 0 0 0-.356.355v.012zm9.423-2.056a.8.8 0 1 0 .002 1.6.8.8 0 0 0-.002-1.6m-8.2 0a.8.8 0 1 0 .565.235.8.8 0 0 0-.566-.235zM9 9.145c-3.2 0-3.2 1.554-3.2 3.2h6.4v-.011a3.93 3.93 0 0 0-.4-2.205c-.453-.671-1.34-.984-2.8-.984m-7.467 7.812H.467v-9.6h3.562L4.023.967h7.467v4.257h6.044v11.732h-1.067V6.3h-4.978v1.066h-1.067V2.033H5.089l-.009 6.4H1.533zm13.867-6.4h-1.066V9.49H15.4zm-11.733 0H2.6V9.49h1.067zM15.4 8.424h-1.066V7.357H15.4zM9.355 6.3H8.29V5.233h1.066zm-2.133 0H6.155V5.233h1.067zm2.133-2.133H8.29V3.1h1.066zm-2.133 0H6.155V3.089l1.067.011z'
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
