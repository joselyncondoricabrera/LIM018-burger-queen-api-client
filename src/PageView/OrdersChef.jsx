import React, { useState, useEffect } from 'react';
import '../App.scss';
import '../PageStyle/Orders.scss';
import NavBarChef from './NavbarChef';
import { updateOrders, getOrders } from '../Requests/requestApi';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [optionStatus, setOptionStatus] = useState('pending');
  const [styleButton, setStyleButton] = useState('Btn-Card-Chef-Ready');
  const [stylePending, setStylePending] = useState('Btn-pending-activated');
  const [stylePrepared, setStylePrepared] = useState('Btn-delivering');
  const [styleDuration, setStyleDuration] = useState('Duration-inactivated');
  const [styleInitialTime, setStyleInitialTime] = useState('InitialTime-activated');
  // Función request put de orders para cambiar status de pendiente a preparado

  const putStatusOrder = (order) => {
    const orderBodyUpdate = {
      userId: order.userId,
      client: order.client,
      products: order.products,
      status: 'delivering',
      dateEntry: order.dateEntry,
      id: order.id,
    };
    const initialHours = new Date(order.dateEntry).getHours();
    const initialMinutes = new Date(order.dateEntry).getMinutes();
    const actualHours = new Date().getHours();
    const actualMinutes = new Date().getMinutes();
    const finalHours = Math.abs(actualHours - initialHours);
    const finalMinutes = Math.abs(actualMinutes - initialMinutes);
    const timeMinutes = finalMinutes > 10 ? finalMinutes : `0${finalMinutes}`;
    const totalTime = `Duración: 0${finalHours}hr : ${timeMinutes}min`;
    console.log(totalTime);

    const orderId = order.id;
    localStorage.setItem(orderId, totalTime);

    const token = sessionStorage.getItem('token');
    updateOrders(order, token, orderBodyUpdate)
      .then(() => {
        getOrders(token)
          .then((result) => {
            setOrders(result);
          }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
  };
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getOrders(token)
      .then((result) => {
        setOrders(result);
        console.log(result);
      }).catch((error) => console.log(error));
  }, []);

  const onclickStatusPending = () => {
    setOptionStatus('pending');
    setStyleButton('Btn-Card-Chef-Ready');
    setStylePending('Btn-pending-activated');
    setStylePrepared('Btn-delivering');
    setStyleDuration('Duration-inactivated');
    setStyleInitialTime('InitialTime-activated');
  };

  const onclickStatusDelivering = () => {
    setOptionStatus('delivering');
    setStylePrepared('Btn-delivering-activated');
    setStylePending('Btn-pending');
    setStyleButton('Hidenn-Btn-Chef-Ready');
    setStyleDuration('Duration-activated');
    setStyleInitialTime('InitialTime-inactivated');
  };

  const ordersByStatus = orders.filter((e) => e.status === optionStatus);

  return (
    <div className="Background-menu">
      <NavBarChef />
      <div className="Background-image-orders">
        <div className="Order-status-nav">
          <button className={stylePending} type="button" onClick={() => onclickStatusPending()}>Pendiente</button>
          <button className={stylePrepared} type="button" onClick={() => onclickStatusDelivering()}>Preparado</button>
        </div>

        <div className="Orders-container">
          {ordersByStatus.map((order) => (
            <div key={order.id} className="Order-card">
              <h1 className={styleInitialTime}>
                {`Hora: ${new Date(order.dateEntry).getHours()}: ${new Date(order.dateEntry).getMinutes()}`}
              </h1>
              <h1 className={styleDuration}>{localStorage.getItem(order.id)}</h1>

              <h1 className="Client-name-order">{`Cliente:  ${order.client}`}</h1>
              <table className="Table-order">
                <thead>
                  <tr className="Row-head">
                    <th className="Items-products-table">Producto</th>
                    <th className="Items-qty-table">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((productOrder) => (
                    <tr key={productOrder.productId}>
                      <td className="Items-products-table">{productOrder.name}</td>
                      <td className="Items-qty-table">{productOrder.qty}</td>
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
