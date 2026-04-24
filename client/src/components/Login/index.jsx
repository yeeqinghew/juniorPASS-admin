import React from "react";
import { Image } from "antd";
import {
  LockOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logopngResize.png";
import { API_ENDPOINTS } from "../../config/api";

const { Title } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        navigate("/home");
        toast.success("Login successfully");
      } else {
        toast.error("Wrong credential");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          margin: "auto",
          background: "#f8f9fa",
        }}
      >
        <div
          style={{
            width: "460px",
            padding: "48px",
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
          className="fade-in"
        >
          <Toaster />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <Image
              src={logo}
              preview={false}
              width={100}
            />
          </div>

          <Title
            level={2}
            style={{
              textAlign: "center",
              marginBottom: "8px",
              color: "#1e293b",
              fontWeight: "700",
            }}
          >
            Admin Portal
          </Title>
          <p style={{ textAlign: "center", color: "#64748b", marginBottom: "40px", fontSize: "15px" }}>
            Sign in to manage your platform
          </p>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#94a3b8" }} />}
                placeholder="Username"
                size="large"
                style={{
                  borderRadius: "12px",
                  fontSize: "16px",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#94a3b8" }} />}
                type="password"
                placeholder="Password"
                size="large"
                style={{
                  borderRadius: "12px",
                  fontSize: "16px",
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                }}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone twoToneColor="#98BDD2" /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "32px" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  borderRadius: "12px",
                  height: "52px",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "#98BDD2",
                  border: "none",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
