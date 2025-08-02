import './style.css';
import { useState, useEffect } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios';
import AdminLayout from '../../../components/AdminLayout/adminlayout';

const ListBaseCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/base');
      setCategories(response.data);
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = id => {
    navigate(`/admin/base/${id}`);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/base/${id}`);
      message.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: text => <img src={text} alt="category" width={50} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record._id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <AdminLayout heading="Base Category List">
      <Button type="primary" onClick={() => navigate('/admin/base')}>
        Add New Category
      </Button>
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="_id"
        style={{ marginTop: 20 }}
      />
    </AdminLayout>
  );
};

export default ListBaseCategory;
