import React, { useState, useEffect } from 'react';
import '../App.scss';
import '../PageStyle/Orders.scss';
import '../PageStyle/Menu.scss';
import NavBar from './Navbar';
import { updateOrders } from '../Requests/requestApi';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [optionStatus, setOptionStatus] = useState('pending');
  const [styleButton, setStyleButton] = useState('Hidenn-Btn-Order-Deliver');
  // cambiar estilo a los botones de estados con onclick
  const [stylePending, setStylePending] = useState('Btn-pending-activated');
  const [stylePrepared, setStylePrepared] = useState('Btn-delivering');
  const [styleDelivered, setStyleDelivered] = useState('Btn-delivered');

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
      .then(() => {
        updateOrders(token)
          .then((result) => {
            console.log(result);
            setOrders(result);
          })
          .catch((e) => { console.log(e); });
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

  // al iniciar cargue con el boton pending activo
  // setStylePending('Btn-pending-activated');

  const onclickStatusDelivering = () => {
    setOptionStatus('delivering');
    setStylePrepared('Btn-delivering-activated');
    setStylePending('Btn-pending');
    setStyleDelivered('Btn-delivered');
    return setStyleButton('Btn-Card-Waiter-Deliver');
  };

  const onclickStatusPending = () => {
    setOptionStatus('pending');
    setStylePending('Btn-pending-activated');
    setStylePrepared('Btn-delivering');
    setStyleDelivered('Btn-delivered');
    return setStyleButton('Hidenn-Btn-Order-Deliver');
  };

  const onclickStatusDelivered = () => {
    setOptionStatus('delivered');
    setStyleDelivered('Btn-delivered-activated');
    setStylePending('Btn-pending');
    setStylePrepared('Btn-delivering');
    return setStyleButton('Hidenn-Btn-Order-Deliver');
  };

  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image-orders">
        <div className="Order-status-nav">
          <button className={stylePending} type="button" onClick={() => onclickStatusPending()}>Pendiente</button>
          <button className={stylePrepared} type="button" onClick={() => onclickStatusDelivering()}>Preparado</button>
          <button className={styleDelivered} type="button" onClick={() => onclickStatusDelivered()}>Entregado</button>
        </div>

        <div className="Orders-container">
          {ordersByStatus.map((order) => (
            // <div key={order.id} className="Order-card">
            // eslint-disable-next-line react/no-array-index-key
            <div key={order.id} className="Order-card">
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
              <button type="button" className={styleButton} onClick={() => putStatusOrder(order)}>Entregar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
