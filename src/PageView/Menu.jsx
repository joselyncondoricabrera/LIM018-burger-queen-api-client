import React, { useState, useEffect } from 'react';
import '../PageStyle/Menu.scss';
// eslint-disable-next-line import/no-unresolved
import swal from 'sweetalert';
import NavBar from './Navbar';
import trashIcon from '../imagen/deleteItem.png';
// import ModalConfirmed from './ModalConfirmed';

const { Buffer } = require('buffer/');

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [productsOrder, setProductsOrder] = useState([]);
  const [optionProducts, setOptionProducts] = useState('Desayuno');
  const [nameClient, setNameClient] = useState('');
  // cambiar estilo a los botones de opcion segun tipo
  const [styleTypeDrinks, setStyleTypeDrinks] = useState('Menu-options');
  const [styleTypeBreakfast, setStyleTypeBreakfast] = useState('Change-style-activated-button');
  const [styleTypeLunchDinner, setstyleTypeLunchDinner] = useState('Menu-options');
  // mostrar modal o ocultar
  // const [showModal, setShowModal] = useState(false);

  const token = sessionStorage.getItem('token');
  function parseJwt(jwt) {
    return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
  }

  const postOrder = () => {
    const orderData = {
      userId: parseJwt(token).userId,
      client: nameClient,
      products: productsOrder.map((productOrder) => {
        // eslint-disable-next-line max-len
        const product = { name: productOrder.name, productId: productOrder.id, qty: productOrder.quantity };
        return product;
      }),
    };

    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }).then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        // setShowModal(true);
        // limpiar productsOrder

        // show alert
        swal({
          title: 'Confirmación de envío',
          text: 'Se guardó correctamente la orden',
          icon: 'success',
          button: 'Aceptar',
        });
      });
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

  //  Filtrar por tipo de producto para mostrar en el contenedor de imagenes
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

  // eliminar la fila de una tabla de pedido
  const deleteItemProduct = (pro) => {
    setProductsOrder(productsOrder.filter((product) => product.id !== pro.id));
  };

  // cambiar css y mostrar imagenes
  const changeOptionDrink = () => {
    setStyleTypeDrinks('Change-style-activated-button');
    setStyleTypeBreakfast('Menu-options');
    setstyleTypeLunchDinner('Menu-options');
    setOptionProducts('Bebidas');
  };
  const changeOptionBreakfast = () => {
    setStyleTypeBreakfast('Change-style-activated-button');
    setStyleTypeDrinks('Menu-options');
    setstyleTypeLunchDinner('Menu-options');
    setOptionProducts('Desayuno');
  };
  const changeOptionLunchDinner = () => {
    setstyleTypeLunchDinner('Change-style-activated-button');
    setStyleTypeBreakfast('Menu-options');
    setStyleTypeDrinks('Menu-options');
    setOptionProducts('Almuerzo y cena');
  };

  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <div className="Container-all-menu">

          <div className="Menu-options-container">
            <button type="button" className={styleTypeDrinks} onClick={changeOptionDrink}>Bebidas</button>
            <button type="button" className={styleTypeLunchDinner} onClick={changeOptionLunchDinner}>Almuerzo y cena</button>
            <button type="button" className={styleTypeBreakfast} onClick={changeOptionBreakfast}>Desayuno</button>
          </div>

          <div className="Image-products-container">
            {optionMenu.map((product) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={product.id} className="product-card">
                <h1 className="Price-product">
                  $
                  {product.price}
                </h1>
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
            <input className="Client-name" type="text" placeholder="Nombre del cliente" onChange={(e) => setNameClient(e.target.value)} />
            <h4 className="Client">{`Cliente:  ${nameClient}`}</h4>

            <table className="Table-order">
              <thead>
                <tr className="Row-head">
                  <th className="Items-products-table">Producto</th>
                  <th className="Items-products-table">Cant.</th>
                  <th className="Items-products-table">Import.</th>
                  <th className="Items-delete-product-table"> </th>
                </tr>
              </thead>
              <tbody>
                {productsOrder.map((product, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={i}>
                    <td className="Name-items-product">{product.name}</td>
                    <td className="Items-products-table">{product.quantity}</td>
                    <td className="Items-products-table">{product.price}</td>
                    <td>
                      <button className="Btn-delete-item-product" type="button" onClick={() => deleteItemProduct(product)}>
                        <img src={trashIcon} alt="button-delete" className="Image-button-delete" />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td> </td>
                  <th className="Items-products-table">total</th>
                  <td className="Items-products-table">{totalAmount}</td>
                </tr>
              </tbody>
            </table>

            <button type="button" className="Btn-send-order" onClick={postOrder}>Enviar Orden</button>
          </div>
          {/* {
            showModal ? <ModalConfirmed /> : null
          } */}
        </div>
      </div>
    </div>
  );
}
