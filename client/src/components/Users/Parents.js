import React, { useEffect, useState } from "react";
import { Button, Input, Table, message } from "antd";
import toast from "react-hot-toast";

const Parents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting by Name
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div>
          <Input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search name"
            style={{ width: 188, marginBottom: 8, display: "block" }}
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
      sorter: (a, b) => a.email.localeCompare(b.email), // Sorting by Email
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: (a, b) => a.phone_number.localeCompare(b.phone_number), // Sorting by Phone Number
    },
    {
      title: "Created On",
      dataIndex: "created_on",
      key: "created_on",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on), // Sorting by Created On
    },
  ];

  useEffect(() => {
    async function getAllUsers() {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/admins/getAllParents",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <Table
        columns={columns}
        dataSource={users.map((user) => ({ ...user, key: user.user_id }))}
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }} // Pagination with 5 items per page
        onChange={(pagination, filters, sorter) => {
          console.log("Params", pagination, filters, sorter);
        }}
      />
    </div>
  );
};

export default Parents;
