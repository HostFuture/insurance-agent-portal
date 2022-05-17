// Importing Build-In Package
import { Button, Form, Input, message, Typography } from "antd";


const key = "registerFormKey";
const { Text } = Typography;


const RegisterForm = () => {
  const onFinish = (response) => {
    message.loading({ content:"Creating your account...", key });
    
    fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(response)
    }).then(r => r.json()
    ).then(response => {
      if(response.status === 201) {
        message.success({ content: response.message, key, duration:5 });
        window.location.href = "/login";
      } else {
        message.error({ content: response.message, key, duration:5 })
      }
    })
  }

  return(
    <>
      <div style={{ marginBottom: "5vh" }}>
        <Text style={{ fontSize:"7vh",fontWeight:300 }}>Register</Text><br />
        <Text type="secondary">We welcome you to join the family of  Shield Fox.</Text>
      </div>

      <Form name="register-form" autoComplete="off" onFinish={ onFinish } layout="vertical" size="large" initialValues={{ remember:false }}>

        <Form.Item label="Name" style={{ marginBottom: 0 }} required tooltip="Please enter your complete name">
          <Form.Item name="first_name" rules={[{ required:true, message:"Enter your first name" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item name="last_name" rules={[{ required:true, message:"Enter your last name" }]}
            style={{ display: "inline-block", width: "calc(50% - 8px)", margin: "0 8px" }} >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Form.Item>
        
        <Form.Item label="Email Address" name="email" rules={[{ required:true, type: "email", message:"Enter a valid email address" }]}
          tooltip="Please enter your email address" style={{ marginBottom: "2vh" }}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required:true, message:"Choose your profile password" }]}
          tooltip="Please choose a suitable password for your account">
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ marginTop: "3vh" }}>Signup</Button>
      </Form>

      <Typography style={{ fontWeight: 300, paddingTop: "3vh" }}>
        Already have an account? <a href="/login" rel="noreferrer">Login here</a>.
      </Typography>
    </>
  );
}

export default RegisterForm;