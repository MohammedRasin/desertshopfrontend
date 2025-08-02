import React from 'react';
import './order.css';
import { Form, Input, Select, Button, InputNumber, Card } from 'antd';

const { Option } = Select;

const OrderForm = ({ onFinish }) => {
  return (
    <Card
      title="Create Order"
      bordered={false}
      style={{ maxWidth: 600, margin: 'auto' }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="user"
          label="User ID"
          rules={[{ required: true, message: 'User is required' }]}
        >
          <Input placeholder="Enter User ID" />
        </Form.Item>

        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} style={{ marginBottom: 10 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'product']}
                    label="Product ID"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter Product ID" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'flavor']}
                    label="Flavor"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter Flavor" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    label="Quantity"
                    rules={[{ required: true, type: 'number', min: 1 }]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    label="Price"
                    rules={[{ required: true }]}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                  <Button danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()}>
                Add Item
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item
          name="totalAmount"
          label="Total Amount"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="COD">COD</Option>
            <Option value="Online">Online</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="orderStatus"
          label="Order Status"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="Pending">Pending</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Address Details">
          <Form.Item
            name={['address', 'fullName']}
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['address', 'phone']}
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['address', 'city']}
            label="City"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['address', 'state']}
            label="State"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['address', 'country']}
            label="Country"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit Order
        </Button>
      </Form>
    </Card>
  );
};

export default OrderForm;
