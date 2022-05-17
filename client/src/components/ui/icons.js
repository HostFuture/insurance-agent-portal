// Importing Build-In Package
import Icon from "@ant-design/icons";


const HomeSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" role="presentation">
    <g transform="translate(2.4 2)">
      <path d="M0,.5H5.815" transform="translate(6.679 13.635)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5px"></path>
      <path d="M0,11.713c0-5.631.614-5.238,3.919-8.3C5.365,2.246,7.615,0,9.558,0s4.237,2.235,5.7,3.41c3.305,3.065,3.918,2.672,3.918,8.3C19.172,20,17.213,20,9.586,20S0,20,0,11.713Z" transform="translate(0)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5px"></path>
    </g>
  </svg>
);
const HomeIcon = props => <Icon component={ HomeSvg } {...props} title="Dashboard" />;


const DocumentSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" role="presentation">
    <g transform="translate(3.65 2.75)">
      <path d="M5.4.5H0" transform="translate(5.255 12.2)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5px"></path>
      <path d="M3.356.5H0" transform="translate(5.255 8.189)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5px"></path>
      <path d="M16.51,5.55,10.84.15A18.2,18.2,0,0,0,8.39,0C2.1,0,0,2.32,0,9.25S2.1,18.5,8.39,18.5s8.4-2.31,8.4-9.25A21.045,21.045,0,0,0,16.51,5.55Z" transform="translate(0)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5px"></path>
      <path d="M0,0V2.661A3.363,3.363,0,0,0,3.364,6.024H6.315" transform="translate(10.284 0.083)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5px"></path>
    </g>
  </svg>
)
const DocumentIcon = props => <Icon component={ DocumentSvg } {...props} title="Document" />;



export { HomeIcon, DocumentIcon };