import './style.css';
import AdminLayout from '../../../components/AdminLayout/adminlayout';
import { Input, Button, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../Utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const AddFlavoredItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [flavoredItem, setFlavoredItem] = useState({
    name: '',
    baseCategory: '', // This should be baseCategory, not category
    price: '',
    image: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (id) getById();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/base');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      message.error('Failed to fetch categories');
    }
  };

  const getById = async () => {
    try {
      const response = await axios.get(`/flavored/${id}`);
      setFlavoredItem(response.data);
    } catch (error) {
      console.error('Failed to fetch flavored item:', error);
      message.error('Failed to fetch flavored item');
    }
  };

  const onChange = (e, key) => {
    setFlavoredItem(prev => ({ ...prev, [key]: e.target.value }));
  };

  const flavoredImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await axios.post('/images', formData);
      console.log('Image uploaded successfully:', response);
      setFlavoredItem(prev => ({ ...prev, image: response.data.url }));
    } catch (error) {
      console.error('Image upload failed:', error);
      message.error('Failed to upload image');
    }
  };

  const flavoredItemAdd = async () => {
    const item = {
      ...flavoredItem,
      price: parseFloat(flavoredItem.price),
      baseCategory: flavoredItem.baseCategory,
    };

    console.log('Sending item:', item);
    try {
      if (id) {
        await axios.patch(`/flavored/${id}`, item);
        message.success('Flavored item updated successfully!');
      } else {
        await axios.post('/flavored', item);
        message.success('Flavored item added successfully!');
      }
      navigate('/admin/flavor');
    } catch (error) {
      console.error(
        'Error adding/updating flavored item:',
        error.response || error.message
      );
      message.error('Failed to add/update flavored item');
    }
  };

  return (
    <AdminLayout heading={id ? 'Edit Flavored Item' : 'Add Flavored Item'}>
      <div className="dep-container-form">
        <div className="input-container">
          <label>Name</label>
          <Input
            value={flavoredItem.name}
            onChange={e => onChange(e, 'name')}
          />
        </div>
        <div className="input-container">
          <label>Category</label>
          <Select // Bind the Select to baseCategory
            onChange={value =>
              setFlavoredItem(prev => ({ ...prev, baseCategory: value }))
            }
          >
            {categories.map(cat => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="input-container">
          <label>Price</label>
          <Input
            type="number"
            value={flavoredItem.price}
            onChange={e => onChange(e, 'price')}
          />
        </div>
        <div className="input-container">
          <label>Image</label>
          <div className="prev-image">
            <Input
              className="img-in"
              type="file"
              onChange={flavoredImageUpload}
            />
            {flavoredItem.image && (
              <div className="uploaded-image-container">
                <img
                  src={flavoredItem.image}
                  alt="Uploaded Preview"
                  className="uploaded-image"
                  style={{
                    width: '60px',
                    height: 'auto',
                    marginBottom: '10px',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dep-ad-btn">
        <Button type="primary" onClick={flavoredItemAdd}>
          {id ? 'Edit' : 'Add'}
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AddFlavoredItem;
