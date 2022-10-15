import React, { useState, useEffect } from 'react';
import '../App.scss';
import '../PageStyle/Orders.scss';
import NavBarChef from './NavbarChef';

// function ButtonOrdersCard(props) {
//   const { status, btnFunction } = props;
//   if (status === 'pending') {
// eslint-disable-next-line max-len
//     return (<button type="button" className="Btn-Card-Chef-Ready" onClick={() => btnFunction}>Preparado</button>);
//   }
// }

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [optionStatus, setOptionStatus] = useState('pending');
  const [styleButton, setStyleButton] = useState('Btn-Card-Chef-Ready');
  // const [orderByStatus, setOrderByStatus] = useState([]);
  // Función request put de orders para cambiar status de pendiente a preparado

  const putStatusOrder = (order) => {
    // setOrderUpdate(
    const orderBodyUpdate = {
      userId: order.userId,
      client: order.client,
      products: order.products,
      status: 'delivering',
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

  const onclickStatusPending = () => {
    setOptionStatus('pending');
    if (optionStatus === 'pending') {
      return setStyleButton('Btn-Card-Chef-Ready');
    } return setStyleButton('Hidenn-Btn-Chef-Ready');
  };

  const ordersByStatus = orders.filter((e) => e.status === optionStatus);

  return (
    <div className="Background-menu">
      <NavBarChef />
      <div className="Background-image-orders">
        <div className="Order-status-nav">
          <button className="Btn-pending" type="button" onClick={() => onclickStatusPending()}>Pendiente</button>
          <button className="Btn-delivering" type="button" onClick={() => setOptionStatus('delivering')}>Preparado</button>
        </div>

        <div className="Orders-container">
          {ordersByStatus.map((order) => (
            // <div key={order.id} className="Order-card">
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
              <button type="button" className={styleButton} onClick={() => putStatusOrder(order)}>Preparado</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
