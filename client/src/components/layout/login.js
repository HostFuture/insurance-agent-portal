// Importing Build-In Package
import { Row, Col, Typography } from "antd";

// Importing Media Content
import Logo from "../../media/logo-text.png";


const { Text } = Typography;


const LoginLayout = ({ Child }) => {
  return(
    <Row gutter={4} style={{ height: "100vh" }}>
      <Col md={17} xs={ 0 } className="login-side-bar">
        
        <div className="login-side-text">
          <Text style={{ color:"#111314",fontWeight:500,fontSize:"9vh" }}>
            Welcome to <span>Shield Fox</span>
          </Text> <br/>
          <Text style={{ color:"#636E72",fontWeight:200,fontSize:"6.15vh" }}>
            Joining hands with ease in Insuranace
          </Text>
        </div>

      </Col>

      <Col md={7} xs={ 24 } className="login-side-form">
        
        <div className="logo"><img src={ Logo } alt="Logo" /></div>

        <div className="login-form-section">
          <Child />
        </div>

      </Col>
    </Row>
  )
}

export default LoginLayout;