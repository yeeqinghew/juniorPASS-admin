import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button, Input } from "antd";
import toast from "react-hot-toast";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5000/admins/getAllChildren",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setChildren(data);
      } catch (err) {
        toast.error("Error loading children data");
      } finally {
        setLoading(false);
      }
    };

    getChildren();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search name"
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button onClick={() => confirm()} size="small" type="primary">
              Search
            </Button>
            <Button onClick={clearFilters} size="small">
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: "#1890ff" }}>Edit</a>
          <a style={{ color: "#ff4d4f" }}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
          Children
        </h1>
        <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "15px" }}>
          Manage children profiles
        </p>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "28px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)",
        }}
      >
        <Table
          columns={columns}
          dataSource={children}
          rowKey="child_id"
          loading={loading}
          bordered={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} children`,
          }}
          onChange={(pagination, filters, sorter) => {
            console.log("Params", pagination, filters, sorter);
          }}
        />
      </div>
    </div>
  );
};

export default Children;
