import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, Divider } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AdminHomeLayout = () => {
  const navigate = useNavigate();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          width: "200px",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            margin: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={require("../images/logopngResize.png")}
            preview={false}
            width={100}
          />
        </div>
        <Divider />

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          onClick={({ key }) => {
            if (key === "1") navigate("/home"); // Dashboard route
            if (key === "3") navigate("/parents"); // Parents list
            if (key === "4") navigate("/children"); // Children list
            if (key === "5") navigate("/partners"); // Partners list
          }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Users",
              children: [
                {
                  key: "3",
                  label: "Parents",
                },
                {
                  key: "4",
                  label: "Children",
                },
              ],
            },
            {
              key: "5",
              icon: <VideoCameraOutlined />,
              label: "Partners",
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: "Transactions",
            },
          ]}
          style={{
            flex: 1,
            minWidth: 0,
            hegith: "100vh",
          }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            display: "flex",
          }}
        >
          <Menu
            mode="horizontal"
            style={{ flex: 1, minWidth: 0, display: "block" }}
          >
            <Menu.Item key="logout" style={{ float: "right" }}>
              <LogoutOutlined
                onClick={() => {
                  // handle Logout
                }}
              />
            </Menu.Item>
            <Menu.Item
              key="notification"
              style={{ float: "right" }}
              onClick={() => {
                // TODO: Popover antd to show a list of notifcations
              }}
            >
              {/* TODO: <Badge> */}
              <i className="fa fa-bell-o"></i>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "white",
            borderRadius: "25px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHomeLayout;
