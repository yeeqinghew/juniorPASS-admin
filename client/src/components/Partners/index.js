import React, { useEffect, useState } from "react";
import { Table, message, Image } from "antd";
import toast from "react-hot-toast";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define table columns for partners
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
          style={{ objectFit: "contain" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "partner_name",
      key: "partner_name",
      sorter: (a, b) => a.partner_name.localeCompare(b.partner_name), // Sorting by Partner Name
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div>
          <input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search partner name"
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <button onClick={() => confirm()}>Search</button>
          <button onClick={clearFilters}>Reset</button>
        </div>
      ),
      onFilter: (value, record) =>
        record.partner_name.toLowerCase().includes(value.toLowerCase()), // Filter by Partner Name
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email), // Sorting by Email
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div>
          <input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search email"
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <button onClick={() => confirm()}>Search</button>
          <button onClick={clearFilters}>Reset</button>
        </div>
      ),
      onFilter: (value, record) =>
        record.email.toLowerCase().includes(value.toLowerCase()), // Filter by Email
    },
    {
      title: "Contact Number",
      dataIndex: "contact_number",
      key: "contact_number",
      sorter: (a, b) => a.contact_number.localeCompare(b.contact_number), // Sorting by Contact Number
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (website) => (
        <a href={website} target="_blank" rel="noopener noreferrer">
          Visit
        </a>
      ),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      sorter: (a, b) => a.region.localeCompare(b.region), // Sorting by Region
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => `${rating} / 5`,
      sorter: (a, b) => a.rating - b.rating, // Sorting by Rating
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (categories) => categories.replace(/{|}/g, ""), // Remove curly braces
    },
    {
      title: "Created On",
      dataIndex: "created_on",
      key: "created_on",
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.created_on) - new Date(b.created_on), // Sorting by Created On
    },
  ];

  // Fetch partners data
  useEffect(() => {
    async function fetchPartners() {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/admins/getAllPartners",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
    <div style={{ padding: "20px" }}>
      <h1>Partners List</h1>
      <Table
        columns={columns}
        dataSource={partners.map((partner) => ({
          ...partner,
          key: partner.partner_id,
        }))}
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

export default Partners;
