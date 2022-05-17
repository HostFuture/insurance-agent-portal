// Importing Build-In Package
import { useEffect, useState } from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

// Importing Custom Package
import RoutingLayout from "./routes";



const ThemeLayout = () => {
  const [baseTheme, setBaseTheme] = useState("light");
  const themes = {
    dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
    light: `${process.env.PUBLIC_URL}/light-theme.css`,
  };

  useEffect(() => {
    const is_dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setBaseTheme(is_dark ? "light" : "light");
  }, []);

  return (
    <ThemeSwitcherProvider themeMap={ themes } defaultTheme={ baseTheme }>
      <RoutingLayout />
    </ThemeSwitcherProvider>
  );
}

export default ThemeLayout;