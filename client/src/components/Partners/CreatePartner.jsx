import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Space,
  Typography,
  Row,
  Col,
  Upload,
  Select,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  ShopOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const CreatePartner = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Auto-generate password when component mounts
  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(password);
    return password;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Prepare data matching database schema
      const partnerData = {
        partner_name: values.partner_name,
        email: values.email,
        password: generatedPassword,
        description: values.description || "",
        website: values.website,
        picture: values.picture || "",
        address: values.address,
        region: values.region,
        contact_number: values.contact_number,
        categories: values.categories.split(',').map(cat => cat.trim()),
      };

      const response = await fetchWithAuth(API_ENDPOINTS.CREATE_PARTNER, {
        method: "POST",
        body: JSON.stringify(partnerData),
      });

      if (!response.ok) {
        throw new Error("Failed to create partner");
      }

      await response.json();
      message.success("Partner created successfully! Credentials have been sent to their email.");

      form.resetFields();
      setGeneratedPassword("");

      toast.success(
        `Partner ${values.partner_name} created!\nEmail: ${values.email}\nTemporary Password: ${generatedPassword}`
      );
    } catch (error) {
      console.error(error.message);
      toast.error("Error creating partner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          Create New Partner
        </Title>
        <Text className="page-subtitle">
          Add a new partner organization and send them login credentials
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card className="table-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Partner Name"
                    name="partner_name"
                    rules={[
                      { required: true, message: "Please enter partner name" },
                      { max: 50, message: "Partner name must be 50 characters or less" },
                    ]}
                  >
                    <Input
                      prefix={<ShopOutlined />}
                      placeholder="Enter partner organization name"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Please enter valid email" },
                      { max: 255, message: "Email must be 255 characters or less" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="partner@example.com"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Contact Number"
                    name="contact_number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter contact number",
                      },
                      {
                        pattern: /^\d{8}$/,
                        message: "Contact number must be exactly 8 digits",
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="12345678"
                      maxLength={8}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Website"
                    name="website"
                    rules={[
                      { required: true, message: "Please enter website URL" },
                      { type: "url", message: "Please enter valid URL" },
                    ]}
                  >
                    <Input
                      prefix={<GlobalOutlined />}
                      placeholder="https://partner.com"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Region"
                    name="region"
                    rules={[
                      { required: true, message: "Please select region" },
                      { max: 50, message: "Region must be 50 characters or less" },
                    ]}
                  >
                    <Select
                      placeholder="Select region"
                      size="large"
                    >
                      <Option value="North">North</Option>
                      <Option value="South">South</Option>
                      <Option value="East">East</Option>
                      <Option value="West">West</Option>
                      <Option value="Central">Central</Option>
                      <Option value="North-East">North-East</Option>
                      <Option value="North-West">North-West</Option>
                      <Option value="South-East">South-East</Option>
                      <Option value="South-West">South-West</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Categories"
                    name="categories"
                    rules={[
                      { required: true, message: "Please enter categories" },
                    ]}
                    extra="Separate multiple categories with commas (e.g., Education, Sports, Arts)"
                  >
                    <Input
                      prefix={<TagsOutlined />}
                      placeholder="Education, Sports, Arts"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Address (Headquarters)"
                    name="address"
                    rules={[
                      { required: true, message: "Please enter address" },
                      { max: 1000, message: "Address must be 1000 characters or less" },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Enter partner's headquarters address"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      { max: 1000, message: "Description must be 1000 characters or less" },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Brief description of the partner organization (optional)"
                      showCount
                      maxLength={1000}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label="Logo URL"
                    name="picture"
                    rules={[
                      { type: "url", message: "Please enter valid URL" },
                    ]}
                    extra="Enter the URL of the partner's logo image"
                  >
                    <Input
                      prefix={<UploadOutlined />}
                      placeholder="https://example.com/logo.png"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                  >
                    Create Partner & Send Credentials
                  </Button>
                  <Button size="large" onClick={() => form.resetFields()}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Credential Information" className="table-card">
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <div>
                <Text strong>Auto-Generated Password</Text>
                <p className="page-subtitle">
                  A secure one-time password has been automatically generated and
                  will be sent to the partner's email address upon creation.
                </p>
              </div>

              {generatedPassword && (
                <Card size="small" style={{ backgroundColor: "#f0f9ff" }}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text strong>Generated Password:</Text>
                    <Text
                      code
                      copyable
                      style={{ fontSize: 16, wordBreak: "break-all" }}
                    >
                      {generatedPassword}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      This password will be sent via email upon partner creation.
                    </Text>
                  </Space>
                </Card>
              )}

              <Button
                icon={<LockOutlined />}
                onClick={generatePassword}
                block
                size="large"
              >
                Regenerate Password
              </Button>

              <div>
                <Text strong>What happens next?</Text>
                <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 0 }}>
                  <li>Partner account is created</li>
                  <li>Credentials sent to their email</li>
                  <li>They can login and change password</li>
                  <li>Account is immediately active</li>
                </ul>
              </div>

              <div>
                <Text strong>Database Fields:</Text>
                <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 0, fontSize: 12, color: "#64748b" }}>
                  <li>Credit: 0 (default)</li>
                  <li>Rating: 0 (default)</li>
                  <li>Timestamps: Auto-generated</li>
                </ul>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreatePartner;
