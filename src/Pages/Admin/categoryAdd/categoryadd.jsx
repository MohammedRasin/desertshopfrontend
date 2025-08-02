import './style.css';
import AdminLayout from '../../../components/AdminLayout/adminlayout';
import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from '../../../Utils/axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

const AddBaseCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    name: '',
    image: '',
  });

  const onChange = (e, key) => {
    setCategory({ ...category, [key]: e.target.value });
  };

  const getById = async () => {
    const response = await axios.get('/base/' + id);
    console.log(response.data);
    setCategory(response.data);
  };

  useEffect(() => {
    if (id) getById();
  }, []);

  const categoryImageUpload = async e => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    const response = await axios.post('/images', formData);
    setCategory({ ...category, image: response.data.url });
  };

  const categoryAdd = async () => {
    if (id) {
      await axios.patch(`/base/${id}`, category);
    } else {
      await axios.post('/base', category);
    }
    navigate('/admin/base');
  };

  return (
    <AdminLayout heading={id ? 'Edit Base Category' : 'Add Base Category'}>
      <div className="dep-container-form">
        <div className="input-container">
          <label>Name</label>
          <Input value={category.name} onChange={e => onChange(e, 'name')} />
        </div>
        <div className="input-container">
          <label>Image</label>
          <div className="prev-image">
            <Input
              className="img-in"
              type="file"
              onChange={categoryImageUpload}
            />
            {category.image && (
              <div className="uploaded-image-container">
                <img
                  src={category.image}
                  alt=""
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
        <Button onClick={categoryAdd}>{id ? 'Edit' : 'Add'}</Button>
      </div>
    </AdminLayout>
  );
};

export default AddBaseCategory;
