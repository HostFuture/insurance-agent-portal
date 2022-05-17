// Importing Build-In Package
import { Layout, Menu } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

// Importing Custom Package
import UserElement from "./user";
import { HomeIcon, DocumentIcon } from "./icons";

// Importing Media Content
import Logo from "../../media/logo-text.png";


const { Header } = Layout;


const HeaderElement = ({ current, setKey }) => {
  const { currentTheme } = useThemeSwitcher();
  
  return(
    <Header className="app-header" style={{ backgroundColor: currentTheme === "light" && "white" }}>
      <div>
        <img src={ Logo } alt="Logo" style={{
          width: "25vh", 
          height: "auto",
          marginRight: "5vh"
        }} />
      </div>
      
      <Menu theme={ currentTheme } mode="horizontal" 
        style={{ width: "calc(100% - 25vh - 5vh)" }} 
        selectedKeys={[ current ]} onClick={(e) => setKey(e.key)}
      >
        <Menu.Item to="/app" key="home" icon={ <HomeIcon /> } className="header-menu-items">Home</Menu.Item>
        <Menu.Item to="/docs" key="docs" icon={ <DocumentIcon /> } className="header-menu-items">Details</Menu.Item>
      </Menu>

      <div>
        <UserElement />
      </div>
    </Header>
  );
}

export default HeaderElement;