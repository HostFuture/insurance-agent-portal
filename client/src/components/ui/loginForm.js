// Importing Build-In Package
import { Button, Checkbox, Form, Input, message, Typography } from "antd";

// Importing Custom Package
import { login } from "./auth";


const key = "loginFormKey";
const { Text } = Typography;


const LoginForm = () => {
  const onFinish = (response) => {
    message.loading({ content:"Trying to logging you in...", key });

    fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(response)
    }).then(r => r.json()
    ).then(response => {
      if(response.status === 200) {
        message.success({ content: response.message, key, duration:5 });
        login(response.token);
        window.location.href = "/app";
      } else {
        message.error({ content: response.message, key, duration:5 })
      }
    })
  }

  return (
    <>
      <div style={{ marginBottom: "5vh" }}>
        <Text style={{ fontSize:"7vh",fontWeight:300 }}>Login</Text><br />
        <Text type="secondary">Welcome back, please login to your account.</Text>
      </div>

      <Form name="login-form" autoComplete="off" onFinish={ onFinish } layout="vertical" size="large" initialValues={{ remember:false }}>
        <Form.Item label="Email Address" name="email" rules={[{ required:true, type: "email", message:"Enter your valid registered email address" }]}
          tooltip="Please enter your registered email address">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required:true, message:"Enter your corresponding password" }]}
          tooltip="Please enter your corresponding password">
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me for a week</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ marginRight: "2vh" }}>Login</Button>
        <Button type="secondary" htmlType="button" 
          onClick={() => onFinish({"email" : "john.doe@example.com", "password" : "P@$$w0rd", "remember": true})}
        >
          Guest Login
        </Button>

      </Form>

      <Typography style={{ fontWeight: 300, paddingTop: "3vh" }}>
        Don't have an account yet? <a href="/register" rel="noreferrer">Signup here</a>.
      </Typography>
    </>
  );
}

export default LoginForm;