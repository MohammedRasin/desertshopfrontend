import { useState } from 'react';
import { Layout, Menu, Dropdown, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './adminlayout.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleTheme = checked => setDarkMode(checked);

  const handleMenuClick = path => {
    navigate(path);
  };

  const handleLogout = () => {
    message.success('Logged out successfully');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      key: '1',
      icon: <PlusOutlined />,
      label: 'Add Base Category',
      onClick: () => handleMenuClick('/admin/base'),
    },
    {
      key: '2',
      icon: <UnorderedListOutlined />,
      label: 'Base Category List',
      onClick: () => handleMenuClick('/admin/baselist'),
    },
    {
      key: '3',
      icon: <PlusOutlined />,
      label: 'Add Flavored Item',
      onClick: () => handleMenuClick('/admin/flavor'),
    },
    {
      key: '4',
      icon: <UnorderedListOutlined />,
      label: 'Flavored Item List',
      onClick: () => handleMenuClick('/admin/flavorlist'),
    },
  ];

  const adminMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        minHeight: '100vh',
        transition: 'all 0.3s',
        background: darkMode ? '#141414' : '#fff',
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={darkMode ? 'dark' : 'light'}
      >
        <div
          className="logo"
          style={{ height: 32, margin: 16, color: darkMode ? '#fff' : '#000' }}
        >
          Admin Panel
        </div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
            background: darkMode ? '#1f1f1f' : '#fff',
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={toggleCollapse}
              style={{ fontSize: 18 }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={toggleCollapse}
              style={{ fontSize: 18 }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <Dropdown overlay={adminMenu} placement="bottomRight">
              <UserOutlined style={{ fontSize: 18 }} />
            </Dropdown>
          </div>
        </Header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Content
            style={{
              margin: '16px',
              padding: 16,
              minHeight: 280,
              background: darkMode ? '#1f1f1f' : '#fff',
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
        </motion.div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
