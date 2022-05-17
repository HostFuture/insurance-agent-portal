// Importing Build-In Package
import { Avatar, Dropdown, Menu, Typography } from "antd";
import { useEffect, useState, memo } from "react";

// Importing Custom Package
import { authFetch, logout } from "./auth";


const { Title } = Typography;


const UserElement = () => {
  const [user, setUser] = useState({});

  const handleLogout = () => {
    window.location.href = "/login";
    setUser({});
    logout();
  }

  const menu = (
    <Menu 
      style={{ padding: "2vh", width: "" }}
      items={[{
        label: <>
                <Title level={5}>Profile Settings</Title>
                <Typography>Hello { user.first_name }</Typography>
              </>,
        key: "0",
      }, {
        type: "divider",
      }, {
        label: "Profile",
        key: "1",
      }, {
        label: "Logout",
        key: "2",
        onClick: handleLogout
      }
    ]} />
  );

  useEffect(() => {
    authFetch("/auth/user"
    ).then(r => r.json()
    ).then((response) => {
      if(response.status === 200) {
        setUser(response.user);
      }
    })
  }, []);

  return(
    <Dropdown placement="bottomRight" overlay={menu}>
      <Avatar style={{ backgroundColor: "2b0000ff", verticalAlign: "middle", cursor: "pointer" }} size="large" gap={1}>
        { user.first_name ? user.first_name[0]  : "?" }
      </Avatar>
    </Dropdown>
  );
}

export default memo(UserElement);