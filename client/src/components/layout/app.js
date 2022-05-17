// Importing Build-In Package
import { Layout } from "antd";
import { useState } from "react";

// Importing Custom Package
import HeaderElement from "../ui/header";
import FooterElement from "../ui/footer";
import ContentElement from "../ui/content";



const AppLayout = () => {
  const [current, setCurrent] = useState("home");

  return(
    <Layout>
      <HeaderElement setKey={ setCurrent } current={ current } />
      <ContentElement current={ current } />
      <FooterElement />
    </Layout>
  );
}

export default AppLayout;