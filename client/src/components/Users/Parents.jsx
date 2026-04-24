import React, { useEffect, useState } from "react";
import { Button, Input, Table, message } from "antd";
import toast from "react-hot-toast";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";

const Parents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <Button onClick={() => confirm()}>Search</Button>
          <Button onClick={clearFilters}>Reset</Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
  ];

  useEffect(() => {
    async function getAllUsers() {
      setLoading(true);
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.GET_ALL_PARENTS, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
        message.success("Users loaded successfully!");
      } catch (err) {
        console.error(err.message);
        toast.error("Error retrieving users. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    getAllUsers();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Parents</h1>
        <p className="page-subtitle">Manage parent user accounts</p>
      </div>

      <div className="table-card">
        <Table
          columns={columns}
          dataSource={users.map((user) => ({ ...user, key: user.user_id }))}
          loading={loading}
          bordered={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} users`,
          }}
          onChange={(pagination, filters, sorter) => {
            console.log("Params", pagination, filters, sorter);
          }}
        />
      </div>
    </div>
  );
};

export default Parents;
