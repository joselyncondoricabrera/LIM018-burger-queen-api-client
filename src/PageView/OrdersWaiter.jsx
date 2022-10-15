import React, { useState, useEffect } from 'react';
import '../App.scss';
import '../PageStyle/Orders.scss';
import NavBar from './Navbar';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [optionStatus, setOptionStatus] = useState('pending');

  const putStatusOrder = (order) => {
    // setOrderUpdate(
    const orderBodyUpdate = {
      userId: order.userId,
      client: order.client,
      products: order.products,
      status: 'delivered',
      dateEntry: order.dateEntry,
      id: order.id,
    };
    // );
    // useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch(`http://localhost:3001/orders/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderBodyUpdate),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });

    fetch('http://localhost:3001/orders', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        setOrders(result);
      });

    // }, []);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:3001/orders', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        setOrders(result);
      });
  }, []);

  const ordersByStatus = orders.filter((e) => e.status === optionStatus);

  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image-Orders">
        <div className="Order-status-nav">
          <button className="Btn-pending" type="button" onClick={() => setOptionStatus('pending')}>Pendiente</button>
          <button className="Btn-delivering" type="button" onClick={() => setOptionStatus('delivering')}>Preparado</button>
          <button className="Btn-delivered" type="button" onClick={() => setOptionStatus('delivered')}>Entregado</button>
        </div>

        <div className="Orders-container">
          {ordersByStatus.map((order, i) => (
            // <div key={order.id} className="Order-card">
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="Order-card">
              <h1 className="Client-name-order">{order.client}</h1>
              <table className="Table-order">
                <thead>
                  <tr className="Row-head">
                    <th className="Items-products-table">Producto</th>
                    <th className="Items-products-table">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((productOrder) => (
                    <tr key={productOrder.productId}>
                      <td className="Items-products-table">{productOrder.name}</td>
                      <td className="Items-products-table">{productOrder.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" className="Btn-Card-Waiter-Deliver" onClick={() => putStatusOrder(order)}>Entregar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
