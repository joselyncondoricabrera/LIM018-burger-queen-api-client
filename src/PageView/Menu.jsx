import React, { useState, useEffect } from 'react';
import '../PageStyle/Menu.scss';
import NavBar from './Navbar';

const { Buffer } = require('buffer/');

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [productsOrder, setProductsOrder] = useState([]);
  const [optionProducts, setOptionProducts] = useState('Desayuno');
  const [nameClient, setNameClient] = useState('');

  const token = sessionStorage.getItem('token');
  function parseJwt(jwt) {
    return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
  }

  const postOrder = () => {
    const orderData = {
      userId: parseJwt(token).userId,
      client: nameClient,
      products: productsOrder.map((product) => ({ productId: product.id, qty: product.quantity })),
    };
      // console.log(orderData);

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
    const tokens = sessionStorage.getItem('token');
    fetch('http://localhost:3001/products', {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokens}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  const optionMenu = products.filter((e) => e.type === optionProducts);

  // productos unicos según id (no repetidos)
  const uniqueProduct = (id) => {
    const unique = productsOrder.find((obj) => obj.id === id);
    return unique;
  };
  // función del boton +
  const onAddProduct = (product) => {
    if (uniqueProduct(product.id)) {
      setProductsOrder(productsOrder.map((prod) => {
        if (prod.id === product.id) {
          const item = prod;
          item.quantity += 1;
          item.price = product.price * item.quantity;
        }
        return prod;
      }));
    } else setProductsOrder([...productsOrder, { ...product, quantity: 1 }]);
  };

  const onRemoveProduct = (product) => {
    if (uniqueProduct(product.id)) {
      setProductsOrder(productsOrder.map((prod) => {
        if (prod.id === product.id) {
          const item = prod;
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.price -= product.price;
          }
        }
        return prod;
      }));
    } else setProductsOrder([...productsOrder, { ...product, quantity: 1 }]);
  };

  // eslint-disable-next-line no-unused-vars
  let totalAmount = 0;
  productsOrder.forEach((product) => {
    const item = product;
    totalAmount += item.price;
  });

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
            {optionMenu.map((product) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={product.id} className="product-card">
                <h1 className="Price-product">{product.price}</h1>
                <picture className="Image">
                  <img src={product.image} alt="menu-cafe" className="Image-product" />
                </picture>
                <div className="Image-menu-name">
                  <button key={product.name} type="button" className="Btn-cantidad-plus" onClick={() => onAddProduct(product)}>+</button>
                  <p className="Name-product">{product.name}</p>
                  <button type="button" className="Btn-cantidad-minus" onClick={() => onRemoveProduct(product)}> - </button>
                </div>
              </div>
            ))}

          </div>

          <div className="Order-table-container">
            <input className="Client-Name" type="text" placeholder="Nombre del cliente" onChange={(e) => setNameClient(e.target.value)} />
            {/* <button type="button"> + Nueva orden  </button> */}
            <h4 className="Client">{nameClient}</h4>

            <table className="Table-order">
              <thead>
                <tr className="Row-head">
                  <th className="Items-products-table">Producto</th>
                  <th className="Items-products-table">Cant.</th>
                  <th className="Items-products-table">Import.</th>
                </tr>
              </thead>
              <tbody>
                {productsOrder.map((product, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={i}>
                    <td className="Items-products-table">{product.name}</td>
                    <td className="Items-products-table">{product.quantity}</td>
                    <td className="Items-products-table">{product.price}</td>
                  </tr>
                ))}
                <tr>
                  <td> </td>
                  <td className="Items-products-table">total</td>
                  <td className="Items-products-table">{totalAmount}</td>
                </tr>
              </tbody>
            </table>

            <button type="button" onClick={postOrder}>Enviar Orden</button>
          </div>

        </div>
      </div>
    </div>
  );
}
