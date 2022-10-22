import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.scss';

import Login from './PageView/Login';
import Menu from './PageView/Menu';
import Orders from './PageView/OrdersWaiter';
import OrdersChef from './PageView/OrdersChef';
import UsersAdmin from './PageView/UsersAdmin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/OrdersChef" element={<OrdersChef />} />
        <Route path="/OrdersChef" element={<UsersAdmin />} />
        {/* <Route path="/OrdersChef" element={<ProductsAdmin />} /> */}
      </Routes>
    </Router>
  );
}
