import React, { useState, useEffect } from 'react';
import '../PageStyle/Menu.scss';
import NavBar from './Navbar';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [optionProducts, setOptionProducts] = useState('Desayuno');
  const [client, setClient] = useState('');
  const [nameProduct, setNameProduct] = useState([]);

  const sessionStorageCall = () => {
    const userInfo = sessionStorage.getItem('userData');
    const userObject = JSON.parse(userInfo);
    return userObject;
  };

  const postOrder = () => {
    const userData = sessionStorageCall();
    const orderData = {
      userId: userData.userId,
      client: { client }.client,
    };
    const { token } = sessionStorageCall();
    // const token = sessionStorage.getItem('token');
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }).then((res) => res.json()).then((resp) => console.log(resp));
  };

  useEffect(() => {
    const { token } = sessionStorageCall();
    // const token = sessionStorage.getItem('token');
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

  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <h2 className="Title">Menú</h2>
        <div className="Container-all-menu">

          <div className="Menu-options-container">
            <button className="Menu-options" type="button" onClick={() => setOptionProducts('Almuerzo y cena')}>Almuerzo y cena</button>
            <button type="button" className="Menu-options" onClick={() => setOptionProducts('Desayuno')}>Desayuno</button>
          </div>

          <div className="Image-products-container">
            { optionMenu.map((product) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={product.id} className="product-card">
                <h1 className="Price-product">{product.price}</h1>
                <picture className="Image">
                  <img src={product.image} alt="menu-cafe" className="Image-product" />
                </picture>
                <div className="Image-menu-name">
                  <button type="button" className="Btn-cantidad-plus">+</button>
                  <button className="Name-product" onClick={() => setNameProduct(() => [...nameProduct, { name: product.name, price: product.price }])} type="button">{product.name}</button>
                  <button type="button" className="Btn-cantidad-minus">-</button>
                </div>
              </div>
            ))}

          </div>

          <div className="Order-table-container">
            <input className="Client-Name" type="text" placeholder="Nombre del cliente" onChange={(e) => setClient(e.target.value)} />
            {/* <button type="button"> + Nueva orden  </button> */}
            <h4 className="Client">{client}</h4>

            <table className="Table-order">
              <thead>
                <tr className="Row-head">
                  <th className="Items-products-table">Producto</th>
                  <th className="Items-products-table">Cant.</th>
                  <th className="Items-products-table">Import.</th>
                </tr>
              </thead>
              <tbody>
                {nameProduct.map((product, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={i}>
                    <td className="Items-products-table">{product.name}</td>
                    <td className="Items-products-table">1</td>
                    <td className="Items-products-table">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="button" onClick={postOrder}>Listo</button>
          </div>

        </div>
      </div>
    </div>
  );
}
