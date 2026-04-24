import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Typography,
  Space,
  Alert,
} from "antd";
import {
  MailOutlined,
  SendOutlined,
  ShopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const CreatePartner = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.CREATE_PARTNER, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          partner_name: values.partner_name || "",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send invitation");
      }

      const data = await response.json();

      message.success(
        "Invitation sent successfully! The partner will receive an email with login credentials."
      );
      toast.success(`Invitation sent to ${values.email}`);

      form.resetFields();

      // Optionally redirect after a delay
      setTimeout(() => {
        navigate("/partners");
      }, 2000);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message || "Error sending invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <Title level={2} className="page-title">
          Invite New Partner
        </Title>
        <Text className="page-subtitle">
          Send an invitation email to onboard a new partner organization
        </Text>
      </div>

      <div className="invitation-form-container">
        <Card className="invitation-card">
          <div className="invitation-icon-wrapper">
            <MailOutlined className="invitation-icon" />
          </div>

          <Title level={3} className="invitation-title">
            Send Partner Invitation
          </Title>
          <Paragraph className="invitation-subtitle">
            Enter the partner's email address. They will receive login credentials
            and instructions to complete their profile.
          </Paragraph>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Partner Organization Name (Optional)"
              name="partner_name"
              extra="You can add this now or the partner can fill it in later"
            >
              <Input
                prefix={<ShopOutlined />}
                placeholder="e.g., ABC Learning Center"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter partner's email" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="partner@example.com"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SendOutlined />}
                loading={loading}
                block
              >
                Send Invitation Email
              </Button>
            </Form.Item>
          </Form>

          <div className="invitation-steps">
            <Text className="invitation-steps-title">What happens next:</Text>
            <ol>
              <li>Partner receives an email with temporary login credentials</li>
              <li>Partner logs in with the provided credentials</li>
              <li>Partner is prompted to change their password</li>
              <li>Partner completes their profile with all required details:
                <ul style={{ marginTop: 8, marginBottom: 0 }}>
                  <li>Organization details</li>
                  <li>Address and region</li>
                  <li>Contact information</li>
                  <li>Website and logo</li>
                  <li>Categories/services offered</li>
                </ul>
              </li>
              <li>Partner account becomes active</li>
            </ol>
          </div>

          <Alert
            message="Default Profile Settings"
            description={
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Text>• Default profile picture will be automatically assigned</Text>
                <Text>• Rating starts at 0</Text>
                <Text>• Credit balance starts at 0</Text>
                <Text>• Categories can be selected from your predefined list</Text>
                <Text>• All fields can be updated by partner after login</Text>
              </Space>
            }
            type="info"
            showIcon
            icon={<CheckCircleOutlined />}
            style={{ marginTop: 16 }}
          />

          <div className="default-avatar-preview">
            <ShopOutlined className="default-avatar-icon" />
          </div>
          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center", fontSize: 12 }}
          >
            Default profile picture
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default CreatePartner;
