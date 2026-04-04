import React, { useEffect, useState } from "react";
import {
  Table,
  message,
  Tag,
  Button,
  Modal,
  Space,
  Typography,
  Card,
  Popconfirm,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";

const { Text, Paragraph } = Typography;

const PartnerEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch partner enquiries data
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/admins/getAllPartnerEnquiries",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch partner enquiries");
      }

      const data = await response.json();
      setEnquiries(data);
      message.success("Partner enquiries loaded successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Error loading partner enquiries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsResponded = async (enquiryId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admins/markEnquiryResponded/${enquiryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to mark enquiry as responded");
      }

      message.success("Enquiry marked as responded!");
      fetchEnquiries(); // Refresh the list
    } catch (error) {
      console.error(error.message);
      toast.error("Error updating enquiry status.");
    }
  };

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  // Define table columns
  const columns = [
    {
      title: "Status",
      dataIndex: "responded",
      key: "responded",
      width: 120,
      render: (responded) => (
        <Tag
          icon={responded ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          color={responded ? "success" : "warning"}
        >
          {responded ? "Responded" : "Pending"}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: false },
        { text: "Responded", value: true },
      ],
      onFilter: (value, record) => record.responded === value,
      defaultFilteredValue: [false], // Show pending by default
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      sorter: (a, b) => a.company_name.localeCompare(b.company_name),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search company name"
            style={{
              width: 200,
              marginBottom: 8,
              display: "block",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #d9d9d9",
            }}
          />
          <Space>
            <Button size="small" onClick={() => confirm()}>
              Search
            </Button>
            <Button size="small" onClick={clearFilters}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.company_name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person_name",
      key: "contact_person_name",
      sorter: (a, b) =>
        a.contact_person_name.localeCompare(b.contact_person_name),
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
        <div style={{ padding: 8 }}>
          <input
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            placeholder="Search email"
            style={{
              width: 200,
              marginBottom: 8,
              display: "block",
              padding: 8,
              borderRadius: 4,
              border: "1px solid #d9d9d9",
            }}
          />
          <Space>
            <Button size="small" onClick={() => confirm()}>
              Search
            </Button>
            <Button size="small" onClick={clearFilters}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) =>
        record.email.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
      render: (message) => (
        <Text ellipsis style={{ maxWidth: 300 }}>
          {message || "No message"}
        </Text>
      ),
    },
    {
      title: "Submitted On",
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      defaultSortOrder: "descend",
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            ghost
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
          {!record.responded && (
            <Popconfirm
              title="Mark as responded?"
              description="Are you sure you want to mark this enquiry as responded?"
              onConfirm={() => handleMarkAsResponded(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" icon={<CheckOutlined />} size="small">
                Done
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginBottom: 16 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Partner Enquiries</h1>
          <Button onClick={fetchEnquiries} loading={loading}>
            Refresh
          </Button>
        </div>

        <Card size="small">
          <Space size="large">
            <div>
              <Text type="secondary">Total Enquiries: </Text>
              <Text strong style={{ fontSize: 18 }}>
                {enquiries.length}
              </Text>
            </div>
            <div>
              <Text type="secondary">Pending: </Text>
              <Text strong style={{ fontSize: 18, color: "#faad14" }}>
                {enquiries.filter((e) => !e.responded).length}
              </Text>
            </div>
            <div>
              <Text type="secondary">Responded: </Text>
              <Text strong style={{ fontSize: 18, color: "#52c41a" }}>
                {enquiries.filter((e) => e.responded).length}
              </Text>
            </div>
          </Space>
        </Card>
      </Space>

      <Table
        columns={columns}
        dataSource={enquiries.map((enquiry) => ({
          ...enquiry,
          key: enquiry.id,
        }))}
        loading={loading}
        bordered
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} enquiries`,
        }}
      />

      <Modal
        title={
          <Space>
            <Text strong style={{ fontSize: 18 }}>
              Enquiry Details
            </Text>
            {selectedEnquiry && (
              <Tag
                icon={
                  selectedEnquiry.responded ? (
                    <CheckCircleOutlined />
                  ) : (
                    <ClockCircleOutlined />
                  )
                }
                color={selectedEnquiry.responded ? "success" : "warning"}
              >
                {selectedEnquiry.responded ? "Responded" : "Pending"}
              </Tag>
            )}
          </Space>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedEnquiry(null);
        }}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>,
          selectedEnquiry && !selectedEnquiry.responded && (
            <Popconfirm
              key="markResponded"
              title="Mark as responded?"
              description="Are you sure you want to mark this enquiry as responded?"
              onConfirm={() => {
                handleMarkAsResponded(selectedEnquiry.id);
                setIsModalOpen(false);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" icon={<CheckOutlined />}>
                Mark as Responded
              </Button>
            </Popconfirm>
          ),
        ]}
        width={700}
      >
        {selectedEnquiry && (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Card size="small" title="Company Information">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">Company Name:</Text>
                  <br />
                  <Text strong style={{ fontSize: 16 }}>
                    {selectedEnquiry.company_name}
                  </Text>
                </div>
                <div>
                  <Text type="secondary">Contact Person:</Text>
                  <br />
                  <Text strong>{selectedEnquiry.contact_person_name}</Text>
                </div>
                <div>
                  <Text type="secondary">Email:</Text>
                  <br />
                  <Text strong copyable>
                    {selectedEnquiry.email}
                  </Text>
                </div>
              </Space>
            </Card>

            <Card size="small" title="Message">
              <Paragraph style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {selectedEnquiry.message || "No message provided"}
              </Paragraph>
            </Card>

            <Card size="small" title="Metadata">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Text type="secondary">Enquiry ID:</Text>
                  <br />
                  <Text code>{selectedEnquiry.id}</Text>
                </div>
                <div>
                  <Text type="secondary">Submitted On:</Text>
                  <br />
                  <Text>
                    {new Date(selectedEnquiry.created_at).toLocaleString()}
                  </Text>
                </div>
                {selectedEnquiry.updated_at && (
                  <div>
                    <Text type="secondary">Last Updated:</Text>
                    <br />
                    <Text>
                      {new Date(selectedEnquiry.updated_at).toLocaleString()}
                    </Text>
                  </div>
                )}
              </Space>
            </Card>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default PartnerEnquiries;
