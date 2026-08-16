import { useEffect, useState } from "react";
import { Alert, Button, Card, DatePicker, Form, InputNumber, Space, Table, Typography, message } from "antd";
import dayjs from "dayjs";
import { API_ENDPOINTS, fetchWithAuth } from "../../config/api";
import "./styles.css";

const { Title, Paragraph, Text } = Typography;

const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadRate = async () => {
      try {
        const response = await fetchWithAuth(API_ENDPOINTS.CREDIT_CONVERSION);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load rate");
        form.setFieldsValue({
          dollars_per_credit: data.dollars_per_credit,
          effective_from: dayjs(),
        });
        setHistory(data.history || []);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadRate();
  }, [form]);

  const saveRate = async (values) => {
    setSaving(true);
    try {
      const response = await fetchWithAuth(API_ENDPOINTS.CREDIT_CONVERSION, {
        method: "PUT",
        body: JSON.stringify({
          dollars_per_credit: values.dollars_per_credit,
          effective_from: values.effective_from.toISOString(),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save rate");
      form.setFieldsValue({
        dollars_per_credit: data.dollars_per_credit,
        effective_from: dayjs(),
      });
      message.success("Credit conversion rate updated");
      setHistory((current) => [
        {
          old_value: data.old_value,
          new_value: data.dollars_per_credit,
          effective_from: data.effective_from,
          changed_at: data.updated_at,
        },
        ...current,
      ]);
    } catch (error) {
      message.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page">
      <Title level={2}>Platform Settings</Title>
      <Paragraph type="secondary">
        Manage commercial settings used across partner pricing and parent bookings.
      </Paragraph>
      <Card loading={loading} className="settings-card">
        <Title level={4}>Credit conversion</Title>
        <Paragraph type="secondary">
          Partners enter package prices in dollars. The platform divides that price
          by this rate and rounds up to the next whole credit for parents.
        </Paragraph>
        <Alert
          type="info"
          showIcon
          message="Rate changes apply only to new bookings. Existing bookings retain their original rate."
        />
        <Form form={form} layout="vertical" onFinish={saveRate} className="settings-form">
          <Form.Item
            name="dollars_per_credit"
            label="Partner dollar value per credit"
            rules={[
              { required: true, message: "Enter a conversion rate" },
              { type: "number", min: 0.01, message: "Rate must be greater than zero" },
            ]}
          >
            <InputNumber prefix="$" min={0.01} precision={2} step={0.05} />
          </Form.Item>
          <Form.Item
            name="effective_from"
            label="Effective from"
            rules={[{ required: true, message: "Select an effective date" }]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={saving}>Save rate</Button>
            <Text type="secondary">Example: $1,000 at $9.50/credit = 106 credits</Text>
          </Space>
        </Form>
      </Card>
      <Card className="settings-card" title="Rate history">
        <Table
          rowKey={(row) => `${row.effective_from}-${row.changed_at}`}
          pagination={false}
          dataSource={history}
          columns={[
            {
              title: "Previous",
              dataIndex: "old_value",
              render: (value) => (value == null ? "—" : `$${value.toFixed(2)}`),
            },
            {
              title: "New rate",
              dataIndex: "new_value",
              render: (value) => `$${value.toFixed(2)}`,
            },
            {
              title: "Effective from",
              dataIndex: "effective_from",
              render: (value) => dayjs(value).format("D MMM YYYY, h:mm A"),
            },
            {
              title: "Changed at",
              dataIndex: "changed_at",
              render: (value) => dayjs(value).format("D MMM YYYY, h:mm A"),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Settings;
