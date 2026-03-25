import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Home = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChildren: 0,
    totalPartners: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const [parentsRes, childrenRes, partnersRes] = await Promise.all([
          fetch("http://localhost:5000/admins/getAllParents", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/admins/getAllChildren", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch("http://localhost:5000/admins/getAllPartners", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const parents = await parentsRes.json();
        const children = await childrenRes.json();
        const partners = await partnersRes.json();

        setStats({
          totalUsers: parents?.length || 0,
          totalChildren: children?.length || 0,
          totalPartners: partners?.length || 0,
          totalRevenue: 0, // TODO: Calculate from transactions
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color, prefix }) => (
    <Card
      hoverable
      style={{
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
      }}
      bodyStyle={{ padding: "28px" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "12px",
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(icon, {
            style: { fontSize: "32px", color: color },
          })}
        </div>
        <div style={{ flex: 1 }}>
          <Text
            style={{
              color: "#64748b",
              fontSize: "14px",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {title}
          </Text>
          <Statistic
            value={value}
            prefix={prefix}
            valueStyle={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1e293b",
            }}
          />
        </div>
      </div>
    </Card>
  );

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <Title
          level={2}
          style={{ marginBottom: "8px", color: "#1e293b", fontWeight: "700" }}
        >
          Dashboard Overview
        </Title>
        <Text style={{ color: "#64748b", fontSize: "16px" }}>
          Welcome back! Here's what's happening with your platform today.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Parents"
            value={stats.totalUsers}
            icon={<UserOutlined />}
            color="#98BDD2"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Children"
            value={stats.totalChildren}
            icon={<TeamOutlined />}
            color="#10b981"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Partners"
            value={stats.totalPartners}
            icon={<ShopOutlined />}
            color="#8b5cf6"
          />
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            prefix="$"
            icon={<DollarOutlined />}
            color="#f59e0b"
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: "32px" }}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e293b",
                }}
              >
                Recent Activity
              </span>
            }
            style={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              style={{
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#94a3b8", fontSize: "15px" }}>
                Activity chart coming soon...
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e293b",
                }}
              >
                Quick Actions
              </span>
            }
            style={{
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div
              style={{
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#94a3b8", fontSize: "15px" }}>
                Quick actions coming soon...
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
