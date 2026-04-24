import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";

const { Title, Text } = Typography;

const Home = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChildren: 0,
    totalPartners: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [parentsRes, childrenRes, partnersRes] = await Promise.all([
          fetchWithAuth(API_ENDPOINTS.GET_ALL_PARENTS, { method: "GET" }),
          fetchWithAuth(API_ENDPOINTS.GET_ALL_CHILDREN, { method: "GET" }),
          fetchWithAuth(API_ENDPOINTS.GET_ALL_PARTNERS, { method: "GET" }),
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
    <Card hoverable className="stat-card" bodyStyle={{ padding: 0 }}>
      <div className="stat-card-body">
        <div className="stat-card-content">
          <div
            className="stat-card-icon-wrapper"
            style={{ background: `${color}15` }}
          >
            {React.cloneElement(icon, {
              className: "stat-card-icon",
              style: { color: color },
            })}
          </div>
          <div className="stat-card-details">
            <Text className="stat-card-label">{title}</Text>
            <Statistic
              value={value}
              prefix={prefix}
              valueStyle={{ fontSize: 0 }}
            />
            <div className="stat-card-value">{prefix}{value}</div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <Title level={2} className="home-title">
          Dashboard Overview
        </Title>
        <Text className="home-subtitle">
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

      <Row gutter={[24, 24]} className="activity-section">
        <Col xs={24} lg={16}>
          <Card
            title={<span className="section-card-title">Recent Activity</span>}
            className="section-card"
          >
            <div className="section-card-content">
              <Text className="section-card-placeholder">
                Activity chart coming soon...
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={<span className="section-card-title">Quick Actions</span>}
            className="section-card"
          >
            <div className="section-card-content">
              <Text className="section-card-placeholder">
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
