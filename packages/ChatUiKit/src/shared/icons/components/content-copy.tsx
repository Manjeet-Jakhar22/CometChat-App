import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgComponent = ({ height, width, color }: SvgProps) => (
  <Svg width={width} height={height} fill='none' viewBox='0 0 24 24'>
    <Path
      fill={color}
      d='M7.918 18.667a1.52 1.52 0 0 1-1.112-.472 1.52 1.52 0 0 1-.472-1.112V3.75q0-.64.472-1.112a1.52 1.52 0 0 1 1.112-.471h10.333q.64 0 1.112.471.471.471.471 1.112v13.333q0 .64-.47 1.112a1.52 1.52 0 0 1-1.113.472zm0-1.584h10.333V3.75H7.918zm-3.167 4.75a1.52 1.52 0 0 1-1.112-.471 1.52 1.52 0 0 1-.471-1.112V6.12q0-.323.232-.555a.77.77 0 0 1 .562-.232q.33 0 .56.232t.23.556V20.25H15.88q.324 0 .556.233a.76.76 0 0 1 .232.558q0 .334-.232.563a.76.76 0 0 1-.556.23z'
    />
  </Svg>
);
export default SvgComponent;
