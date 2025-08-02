import './userlogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import axios from '../../../Utils/axios';

const UserLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };

  const onLogin = async () => {
    if (!login.email || !login.password) {
      alert('Please fill in both email and password.');
      return;
    }
    try {
      const response = await axios.post('/user/login', login);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('ROLE', response.data.role);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  const onClick = () => {
    navigate('/user/signup');
  };
  const onAdminclick = () => {
    navigate('/admin/login');
  };

  return (
    <div className="user-login">
      <div className="user-login-form">
        <div className="heading">
          <h1>DOUGHILICIOUS</h1>
          <span>User</span>
        </div>
        <label>Email:</label>
        <Input
          aria-label="Email"
          value={login.email}
          onChange={e => onChange(e, 'email')}
        />
        <label>Password:</label>
        <Input
          type="password"
          aria-label="Password"
          value={login.password}
          onChange={e => onChange(e, 'password')}
        />
        <div className="login-btn-container">
          <button onClick={onLogin} className="login-button">
            Login
          </button>
          <p onClick={onClick}>Register?</p>
          <p>Forgot password?</p>
          <p onClick={onAdminclick}>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
