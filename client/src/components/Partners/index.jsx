import React, { useEffect, useState } from "react";
import { Table, message, Image, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Logo",
      dataIndex: "picture",
      key: "picture",
      render: (picture) => (
        <Image
          src={picture}
          alt="Partner Logo"
          width={50}
          height={50}
          className="partner-logo"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "partner_name",
      key: "partner_name",
      sorter: (a, b) => a.partner_name.localeCompare(b.partner_name),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="filter-dropdown">
          <input
            className="filter-input"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search partner name"
          />
          <button onClick={() => confirm()}>Search</button>
          <button onClick={clearFilters}>Reset</button>
        </div>
      ),
      onFilter: (value, record) =>
        record.partner_name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="filter-dropdown">
          <input
            className="filter-input"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search email"
          />
          <button onClick={() => confirm()}>Search</button>
          <button onClick={clearFilters}>Reset</button>
        </div>
      ),
      onFilter: (value, record) =>
        record.email.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
      sorter: (a, b) => a.contact_number.localeCompare(b.contact_number),
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (website) => (
        <a href={website} target="_blank" rel="noopener noreferrer" className="table-link">
          Visit
        </a>
      ),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => `${rating} / 5`,
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => categories.replace(/{|}/g, ""),
    },
    {
      title: "Created On",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
  ];

  useEffect(() => {
    async function fetchPartners() {
      setLoading(true);
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.GET_ALL_PARTNERS, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }

        const data = await response.json();
        setPartners(data);
        message.success("Partners loaded successfully!");
      } catch (error) {
        console.error(error.message);
        toast.error("Error loading partners. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  return (
    <div className="page-container">
      <div className="page-actions">
        <div className="page-header">
          <h1 className="page-title">Partners</h1>
          <p className="page-subtitle">Manage all partner organizations</p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate("/create-partner")}
        >
          Create New Partner
        </Button>
      </div>

      <div className="table-card">
        <Table
          columns={columns}
          dataSource={partners.map((partner) => ({
            ...partner,
            key: partner.partner_id,
          }))}
          loading={loading}
          bordered={false}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} partners`,
          }}
          onChange={(pagination, filters, sorter) => {
            console.log("Params", pagination, filters, sorter);
          }}
        />
      </div>
    </div>
  );
};

export default Partners;
