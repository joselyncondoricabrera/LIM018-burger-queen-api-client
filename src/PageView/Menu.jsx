import React, { useState, useEffect } from 'react';
import '../PageStyle/Menu.scss';
import NavBar from './Navbar';
import Modal from './Modal';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [optionProducts, setOptionProducts] = useState('Desayuno');
  // const [client, setClient] = useState('');
  // const orderData = {
  //   userId: '3',
  //   client: { client }.client,
  // };
  // const postOrder = () => {
  //   fetch('http://localhost:3001/orders', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // eslint-disable-next-line quote-props
  //       'authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(orderData),
  //   });
  // };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    fetch('http://localhost:3001/products', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  const optionMenu = products.filter((e) => e.type === optionProducts);
  const newOrder = () => (<Modal />);
  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <h2 className="Title">Menú</h2>
        {/* <Modal /> */}
        <div className="Container-all-menu">

          <div className="Menu-options-container">
            <button className="Menu-options" type="button" onClick={() => setOptionProducts('Almuerzo y cena')}>Almuerzo y cena</button>
            <button type="button" className="Menu-options" onClick={() => setOptionProducts('Desayuno')}>Desayuno</button>
          </div>

          <div className="Image-products-container">
            { optionMenu.map((product, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="product-card">
                <h1 className="Price-product">{product.price}</h1>
                <picture className="Image">
                  <img src={product.image} alt="menu-cafe" className="Image-product" />
                </picture>
                <div className="Image-menu-name">
                  <button type="button" className="Btn-cantidad-plus">+</button>
                  <p className="Name-product">{product.name}</p>
                  <button type="button" className="Btn-cantidad-minus">-</button>
                </div>
              </div>
            ))}

          </div>

          <div className="Order-table">
             <input type="text" placeholder="Nombre del cliente" onChange={(e) => setClient(e.target.value)} /> */}
            <button type="button" onClick={newOrder}> + Nueva orden  </button>
             <h4>{client}</h4>
            <div>
              <div>
                <h5>Items</h5>
                <p>Café Americano</p>
                <p>Café con leche</p>
                <p>Sandwich de jamón y queso</p>
              </div>

              <div>
                <h5>Cant.</h5>
                <p>1</p>
                <p>2</p>
                <p>1</p>
              </div>
              <div>
                <h5>Imp.</h5>
                <p>$5.00</p>
                <p>$14.00</p>
                <p>$7.00</p>
              </div>
            </div>
            <button type="button">Listo</button>
          </div>

        </div>
      </div>
    </div>
  );
}
