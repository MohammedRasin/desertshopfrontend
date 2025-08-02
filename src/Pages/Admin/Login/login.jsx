import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import axios from '../../../Utils/axios';

const Login = () => {
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
      const response = await axios.post('/admin/login', login);
      localStorage.setItem('ID', response.data.id);
      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('ROLE', response.data.role);
      navigate('/adminlayout');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-form">
        <div className="heading">
          <h1>DOUGHILICIOUS</h1>
          <span>Admin</span>
        </div>
        <label>Email:</label>
        <Input
          aria-label="Email"
          value={login.email}
          onChange={e => {
            onChange(e, 'email');
          }}
        />
        <label>Password:</label>
        <Input
          type="password"
          aria-label="Password"
          value={login.password}
          onChange={e => {
            onChange(e, 'password');
          }}
        />
        <div className="login-btn-container">
          <button onClick={onLogin} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
