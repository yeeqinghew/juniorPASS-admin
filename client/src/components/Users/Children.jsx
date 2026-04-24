import React, { useEffect, useState } from "react";
import { Table, Space, Button, Input } from "antd";
import toast from "react-hot-toast";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.GET_ALL_CHILDREN, {
          method: "GET",
        });

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
        <div className="filter-dropdown">
          <Input
            className="filter-input"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search name"
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
          <a className="action-link action-link-primary">Edit</a>
          <a className="action-link action-link-danger">Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Children</h1>
        <p className="page-subtitle">Manage children profiles</p>
      </div>

      <div className="table-card">
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
