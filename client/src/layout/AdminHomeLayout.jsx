import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, Badge, Avatar, Typography, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../images/logopngResize.png";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminHomeLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="admin-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
        theme="light"
        className="sidebar"
      >
        <div className={`sidebar-logo-wrapper ${collapsed ? 'collapsed' : 'expanded'}`}>
          <Image
            src={logo}
            preview={false}
            width={collapsed ? 40 : 80}
            className="sidebar-logo"
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={!collapsed ? ["2"] : []}
          onClick={({ key }) => {
            if (key === "1") navigate("/home");
            if (key === "3") navigate("/parents");
            if (key === "4") navigate("/children");
            if (key === "5") navigate("/partners");
            if (key === "7") navigate("/partner-enquiries");
          }}
          className="sidebar-menu"
          items={[
            {
              key: "1",
              icon: <HomeOutlined className="sidebar-menu-icon" />,
              label: <span className="sidebar-menu-label">Dashboard</span>,
            },
            {
              key: "2",
              icon: <UserOutlined className="sidebar-menu-icon" />,
              label: <span className="sidebar-menu-label">Users</span>,
              children: [
                {
                  key: "3",
                  icon: <TeamOutlined />,
                  label: "Parents",
                },
                {
                  key: "4",
                  icon: <TeamOutlined />,
                  label: "Children",
                },
              ],
            },
            {
              key: "5",
              icon: <ShopOutlined className="sidebar-menu-icon" />,
              label: <span className="sidebar-menu-label">Partners</span>,
            },
            {
              key: "7",
              icon: <FormOutlined className="sidebar-menu-icon" />,
              label: <span className="sidebar-menu-label">Partner Enquiries</span>,
            },
            {
              key: "6",
              icon: <UploadOutlined className="sidebar-menu-icon" />,
              label: <span className="sidebar-menu-label">Transactions</span>,
            },
          ]}
        />
      </Sider>

      <Layout className={`main-layout ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <Header className="main-header">
          <div className="header-left">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "header-toggle-icon",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Text className="header-title">Admin Portal</Text>
          </div>

          <Space size="large" className="header-right">
            <Badge count={5} offset={[-5, 5]}>
              <BellOutlined
                className="header-notification-icon"
                onClick={() => {
                  // TODO: Show notifications
                }}
              />
            </Badge>
            <Avatar
              size={40}
              className="header-avatar"
              icon={<UserOutlined />}
            />
            <LogoutOutlined
              className="header-logout-icon"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            />
          </Space>
        </Header>
        <Content className="main-content">
          <div className="fade-in">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHomeLayout;
