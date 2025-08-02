import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './Pages/Home/home';
import Home from './Pages/Home/home';
import { CartProvider } from './Pages/Cartcontext/cartcontext';
// import Cart from './components/cart';
import FlavoredItems from './Pages/FlavoredItems/flavores';
import Login from './Pages/Admin/Login/login';
import Signup from './Pages/User/UserSignup/signup';
import UserLogin from './Pages/User/UserLogin/userlogin';
import AddBaseCategory from './Pages/Admin/categoryAdd/categoryadd';
import ListCategories from './Pages/Admin/categotyList/categorylist';
import AdminLayout from './components/AdminLayout/adminlayout';
import AddFlavoredItem from './Pages/Admin/AddFaloverd/addflavored';
import ListFlavoredItem from './Pages/Admin/ListFlavored/listflavored';
import ContactUs from './Pages/Contact Us/contact';
import OrderForm from './Pages/Order/order';

const App = () => {
  return (
    <div className="app-container">
      <CartProvider>
        <Routes>
          {/* <Route path="/" element={<UserLogin />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/flavors/:categoryId" element={<FlavoredItems />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/adminlayout" element={<AdminLayout />} />

          <Route path="/admin/base" element={<AddBaseCategory />} />
          <Route path="/admin/baselist" element={<ListCategories />} />
          <Route path="/admin/flavor" element={<AddFlavoredItem />} />
          <Route path="/admin/flavorlist" element={<ListFlavoredItem />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
      </CartProvider>
    </div>
  );
};

export default App;
