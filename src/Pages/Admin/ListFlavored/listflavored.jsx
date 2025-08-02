import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import AdminLayout from '../../../components/AdminLayout/adminlayout';
import './style.css';

const ListFlavoredItem = () => {
  const [flavoredItems, setFlavoredItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFlavoredItems();
  }, []);

  const fetchFlavoredItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/flavored');
      setFlavoredItems(response.data);
    } catch (error) {
      message.error('Failed to fetch flavored items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/flavored/${id}`);
      message.success('Item deleted successfully');
      setFlavoredItems(flavoredItems.filter(item => item._id !== id));
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    {
      title: 'baseCategory',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => record.baseCategory?.name,
    },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: text => (
        <img
          src={text}
          alt="Item"
          style={{ width: 50, height: 50, borderRadius: 4 }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="danger" onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2>Flavored Item List</h2>
      <Table
        dataSource={flavoredItems}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
      />
    </AdminLayout>
  );
};

export default ListFlavoredItem;
