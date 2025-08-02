import './home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Switch } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const Home = () => {
  const [cake, setCake] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:5000/api/base');
      setCake(response.data);
    };
    getData();
  }, []);

  const handleClick = categoryId => {
    navigate(`/flavors/${categoryId}`);
  };

  const filteredCakes = cake.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`home-container ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">Doughlicious</div>
        <ul className="nav-links">
          <li>
            <button onClick={() => navigate('/menu')}>Offers</button>
          </li>
          <li>
            <button onClick={() => navigate('/customize')}>Customize</button>
          </li>
          <li>
            <button onClick={() => navigate('/cart')}>Cart</button>
          </li>
          <li>
            <button onClick={() => navigate('/contact')}>Contact Us</button>
          </li>
        </ul>
        {/* Dark Mode Toggle */}
        <div className="switch">
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </div>
      </nav>

      {/* Background Image */}
      <div className="container">
        <img src="BCIMG.webp" alt="Background" />
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <Input
          type="text"
          placeholder="Search for cakes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Render Cakes */}
      <div className="cakes-list">
        {filteredCakes.map(item => (
          <div
            className="box"
            key={item._id}
            onClick={() => handleClick(item._id)}
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
