import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";

const Children = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChildren = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admins/getAllChildren"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setChildren(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getChildren();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name), // Sorting based on name
      // Add filters if needed, e.g., based on user type
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div>
          {/* Custom filter options */}
          <input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search name"
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <button onClick={() => confirm()}>Search</button>
            <button onClick={clearFilters}>Reset</button>
          </Space>
        </div>
      ),
      filterIcon: () => <i className="fa fa-search"></i>,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age, // Sorting based on age
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Children</h1>
      <Table
        columns={columns}
        dataSource={children}
        rowKey="child_id"
        loading={loading}
        pagination={{ pageSize: 5 }} // Pagination with 5 items per page
        onChange={(pagination, filters, sorter) => {
          console.log("Params", pagination, filters, sorter);
        }}
      />
    </div>
  );
};

export default Children;
