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
import { Layout, Menu, Image, Divider, Badge, Avatar, Typography, Space } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const AdminHomeLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={null}
        theme="light"
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          boxShadow: "2px 0 12px rgba(0, 0, 0, 0.04)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: collapsed ? "20px 16px" : "20px 24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.3s",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Image
            src={require("../images/logopngResize.png")}
            preview={false}
            width={collapsed ? 40 : 80}
            style={{ transition: "all 0.3s" }}
          />
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={!collapsed ? ["2"] : []}
          onClick={({ key }) => {
            if (key === "1") navigate("/home"); // Dashboard route
            if (key === "3") navigate("/parents"); // Parents list
            if (key === "4") navigate("/children"); // Children list
            if (key === "5") navigate("/partners"); // Partners list
            if (key === "7") navigate("/partner-enquiries"); // Partner Enquiries
          }}
          items={[
            {
              key: "1",
              icon: <HomeOutlined style={{ fontSize: "20px", color: "#64748b" }} />,
              label: <span style={{ fontSize: "16px", fontWeight: "500" }}>Dashboard</span>,
            },
            {
              key: "2",
              icon: <UserOutlined style={{ fontSize: "20px", color: "#64748b" }} />,
              label: <span style={{ fontSize: "16px", fontWeight: "500" }}>Users</span>,
              children: [
                {
                  key: "3",
                  icon: <TeamOutlined style={{ fontSize: "16px" }} />,
                  label: "Parents",
                },
                {
                  key: "4",
                  icon: <TeamOutlined style={{ fontSize: "16px" }} />,
                  label: "Children",
                },
              ],
            },
            {
              key: "5",
              icon: <ShopOutlined style={{ fontSize: "20px", color: "#64748b" }} />,
              label: <span style={{ fontSize: "16px", fontWeight: "500" }}>Partners</span>,
            },
            {
              key: "7",
              icon: <FormOutlined />,
              label: "Partner Enquiries",
            },
            {
              key: "6",
              icon: <UploadOutlined style={{ fontSize: "20px", color: "#64748b" }} />,
              label: <span style={{ fontSize: "16px", fontWeight: "500" }}>Transactions</span>,
            },
          ]}
          style={{
            borderRight: 0,
            padding: "16px 8px",
          }}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "all 0.2s",
        }}
      >
        <Header
          style={{
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#FCFBF8",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            position: "sticky",
            top: 0,
            zIndex: 99,
            height: "70px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                style: { 
                  fontSize: "20px", 
                  cursor: "pointer", 
                  color: "#98BDD2",
                  transition: "all 0.3s ease",
                },
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <Text
              strong
              style={{
                fontSize: "20px",
                color: "#1e293b",
                fontWeight: "700",
              }}
            >
              Admin Portal
            </Text>
          </div>
          
          <Space size="large">
            <Badge count={5} offset={[-5, 5]} style={{ backgroundColor: "#98BDD2" }}>
              <BellOutlined
                style={{
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#64748b",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => e.target.style.color = "#98BDD2"}
                onMouseLeave={(e) => e.target.style.color = "#64748b"}
                onClick={() => {
                  // TODO: Show notifications
                }}
              />
            </Badge>
            <Avatar
              size={40}
              style={{
                backgroundColor: "#98BDD2",
                cursor: "pointer",
                border: "2px solid #e5e7eb",
              }}
              icon={<UserOutlined />}
            />
            <LogoutOutlined
              style={{
                fontSize: "22px",
                cursor: "pointer",
                color: "#64748b",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = "#ef4444"}
              onMouseLeave={(e) => e.target.style.color = "#64748b"}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            />
          </Space>
        </Header>
        <Content
          style={{
            margin: "32px",
            padding: "32px",
            minHeight: "calc(100vh - 134px)",
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div className="fade-in">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHomeLayout;
