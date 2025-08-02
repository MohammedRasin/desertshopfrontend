import './signup.css';
import { Input, Button, Select } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from '../../../Utils/axios';
import { ToastContainer, toast } from 'react-toastify';

const { TextArea } = Input;

const UserSignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER',
    image: '',
    phonenumber: '',
  });

  const onchange = (e, key) => {
    if (key === 'image') {
      userImageUpload(e);
    } else {
      setUser({ ...user, [key]: e.target.value });
    }
  };

  const userImageUpload = async e => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    try {
      const upload = await axios.post('/images', formData);
      setUser({ ...user, image: upload.data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Image upload failed!');
    }
  };

  const signUp = async () => {
    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      alert('Please fill out all required fields!');
      return;
    }
    try {
      await axios.post('/user/signup', user);
      toast.success('Signed up successfully!');
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert(
        'Sign-up failed: ' + error.response?.data?.message || 'Unknown error'
      );
    }
    navigate('/');
  };
  const onLogin = () => {
    navigate('/');
  };
  const onDoctor = () => {
    navigate('/admin/doctor');
  };
  const onAdmin = () => {
    navigate('/admin/login');
  };
  const onAlready = () => {
    navigate('/');
  };
  return (
    <div className="user-signup">
      <div className="signup-form">
        <ToastContainer />
        <div className="logos">
          <i onClick={onDoctor} class="fa-solid fa-user-doctor"></i>
          <i onClick={onAdmin} class="fa-solid fa-shield-halved"></i>
        </div>

        <Input
          placeholder="First Name"
          onChange={e => onchange(e, 'firstname')}
        />
        <Input
          placeholder="Last Name"
          onChange={e => onchange(e, 'lastname')}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={e => onchange(e, 'email')}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={e => onchange(e, 'password')}
        />
        <Input placeholder="Role" value={user.role} readOnly />
        <Input type="file" onChange={e => onchange(e, 'image')} />

        <Input
          placeholder="Phone Number"
          onChange={e => onchange(e, 'phonenumber')}
        />
        <p onClick={onAlready}>I have already an account</p>
        <p className="loginlink" onClick={onLogin}>
          Login
        </p>
      </div>
      <div className="signup-btn">
        <Button onClick={signUp}>Sign Up</Button>
      </div>
    </div>
  );
};

export default UserSignUp;
