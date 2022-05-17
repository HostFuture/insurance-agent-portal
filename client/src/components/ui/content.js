// Importing Build-In Package
import { Layout } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";

// Importing Custom Package
import ScoreCard from "./scoreCard";
import FilterData from "./filterData";


const { Content } = Layout;


const ContentElement = ({ current }) => {
  const { currentTheme } = useThemeSwitcher();

  return(
    <Content style={{ padding: "20px 50px", marginTop: 4, backgroundColor: currentTheme === "dark" ? "#141414" : "#F0F2F5" }}>
      {
        current === "home"
        ? <ScoreCard />
        : <FilterData />
      }
      
    </Content>
  );
}

export default ContentElement;