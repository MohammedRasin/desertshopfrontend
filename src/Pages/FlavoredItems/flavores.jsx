import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Switch,
  Skeleton,
  Rate,
  Modal,
  Input,
  Badge,
  Drawer,
  List,
  message,
} from 'antd';
import {
  MoonOutlined,
  SunOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import './FlavoredItems.css';

const FlavoredItems = () => {
  const { categoryId } = useParams();
  const [flavoredItems, setFlavoredItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem('cart')) || []
  );
  const [cartVisible, setCartVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fetchFlavors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/flavored/${categoryId}`
        );
        setFlavoredItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Error fetching flavored items:', error);
        message.error('Failed to load items. Please try again later.');
      }
      setLoading(false);
    };
    fetchFlavors();
  }, [categoryId]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    let updatedItems = flavoredItems;

    if (searchTerm) {
      updatedItems = updatedItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (onlyOffers) {
      updatedItems = updatedItems.filter(item => item.isOnOffer);
    }

    if (likedItems.length > 0) {
      updatedItems = updatedItems.filter(item => likedItems.includes(item._id));
    }

    setFilteredItems(updatedItems);
  }, [searchTerm, onlyOffers, likedItems, flavoredItems]);

  const addToCart = item => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    message.success(`${item.name} added to cart!`);
  };

  const removeFromCart = id => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
    message.success('Item removed from cart');
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`flavored-container ${darkMode ? 'dark' : ''}`}>
      <div className="nav-bar">
        <h1>Flavored Items</h1>
        <div className="actions">
          <Input
            placeholder="Search by name"
            className="search-bar"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Badge count={cart.length} onClick={() => setCartVisible(true)}>
            <Button icon={<ShoppingCartOutlined />} size="large" />
          </Badge>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <Switch
            checked={onlyOffers}
            onChange={() => setOnlyOffers(!onlyOffers)}
            checkedChildren="Offers"
            unCheckedChildren="All"
          />
        </div>
      </div>

      <div className="flavored-content">
        {loading ? (
          <Skeleton active />
        ) : (
          filteredItems.map(item => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flavored-box"
              key={item._id}
              onClick={() => {
                setSelectedItem(item);
                setModalVisible(true);
              }}
            >
              <img src={item.image} alt={item.name} className="flavored-img" />
              <div className="flavored-details">
                <h3>{item.name}</h3>
                <Rate disabled allowHalf defaultValue={item.rating} />
                <span className="price">₹{item.price}</span>
                <div className="btn-group">
                  <Button className="shop-btn">Buy Now</Button>
                  <Button
                    className="cart-btn"
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                  >
                    <ShoppingCartOutlined /> Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {selectedItem && (
        <Modal
          title={selectedItem.name}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="modal-img"
          />
          <p>{selectedItem.description}</p>
          <Rate disabled allowHalf defaultValue={selectedItem.rating} />
          <span className="price">₹{selectedItem.price}</span>
          <Button className="shop-btn">Buy Now</Button>
        </Modal>
      )}

      {/* CART DRAWER */}
      <Drawer
        title="Your Cart"
        placement="right"
        onClose={() => setCartVisible(false)}
        open={cartVisible}
      >
        <List
          dataSource={cart}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeFromCart(item._id)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img src={item.image} alt={item.name} className="cart-img" />
                }
                title={item.name}
                description={`₹${item.price} x ${item.quantity}`}
              />
            </List.Item>
          )}
        />
        <div className="cart-footer">
          <span className="total-price">Total: ₹{totalPrice.toFixed(2)}</span>
          <Button className="checkout-btn">Buy Now</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default FlavoredItems;
