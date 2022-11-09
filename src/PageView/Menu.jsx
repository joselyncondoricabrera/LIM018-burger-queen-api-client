import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageStyle/Menu.scss';
import Swal from 'sweetalert2';
import NavBar from './Navbar';
import { postOrders, getProducts } from '../Requests/requestApi';
import trashIcon from '../imagen/deleteItem.png';

const { Buffer } = require('buffer/');

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [productsOrder, setProductsOrder] = useState([]);
  const [optionProducts, setOptionProducts] = useState('Desayuno');
  const [nameClient, setNameClient] = useState('');
  const [styleTypeDrinks, setStyleTypeDrinks] = useState('Menu-options');
  const [styleTypeBreakfast, setStyleTypeBreakfast] = useState('Change-style-activated-button');
  const [styleTypeLunchDinner, setstyleTypeLunchDinner] = useState('Menu-options');
  const inputClientName = useRef('');

  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  function parseJwt(jwt) {
    return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
  }

  const postOrder = () => {
    if (productsOrder.length === 0) {
      Swal.fire({
        title: 'No hay productos en la orden',
        text: 'Añadir productos a la orden',
        icon: 'warning',
        showCancelButton: false,
      });
    } else if (nameClient === '') {
      Swal.fire({
        title: 'Cliente no registrado',
        text: 'Ingresar nombre del cliente',
        icon: 'warning',
        showCancelButton: false,
      });
    } else {
      const orderData = {
        userId: parseJwt(token).userId,
        client: nameClient,
        products: productsOrder.map((productOrder) => {
          // eslint-disable-next-line max-len
          const product = { name: productOrder.name, productId: productOrder.id, qty: productOrder.quantity };
          return product;
        }),
      };

      postOrders(token, orderData)
        .then((resp) => {
          console.log(resp);
          // limpiar productsOrder
          setProductsOrder([]);
          setNameClient('');
          inputClientName.current.value = '';
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Orden enviada a cocina',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/Orders');
          // setPropStyleOrden('Module-activated');
          // setPropStyleMenu('Module-inactivated');
        });
    }
  };

  useEffect(() => {
    const tokens = sessionStorage.getItem('token');
    getProducts(tokens)
      .then((result) => {
        console.log('getProducts', result);
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
    }
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

  const addClientName = (e) => {
    setNameClient(e.target.value);
  };

  // cambiar css y mostrar imagenes
  const changeOptionDrink = () => {
    setStyleTypeDrinks('Change-style-activated-button');
    setStyleTypeBreakfast('Menu-options');
    setstyleTypeLunchDinner('Menu-options');
    setOptionProducts('Bebidas');
  };
  const changeOptionBreakfast = () => {
    console.log('mis productos', products);
    setStyleTypeBreakfast('Change-style-activated-button');
    setStyleTypeDrinks('Menu-options');
    setstyleTypeLunchDinner('Menu-options');
    setOptionProducts('Desayuno');
  };
  const changeOptionLunchDinner = () => {
    console.log('mis productos dinner', products);
    setstyleTypeLunchDinner('Change-style-activated-button');
    setStyleTypeBreakfast('Menu-options');
    setStyleTypeDrinks('Menu-options');
    setOptionProducts('Almuerzo y cena');
  };

  return (
    <div className="Background-menu">
      <NavBar estilosMenu="Module-activated" estilosOrden="Module-inactivated" />
      <div className="Background-image">
        <div className="Container-all-menu">

          <div className="Menu-options-container">
            <button data-testid="btn-drink" type="button" className={styleTypeDrinks} onClick={changeOptionDrink}>Bebidas</button>
            <button data-testid="btn-lunch-dinner" type="button" className={styleTypeLunchDinner} onClick={changeOptionLunchDinner}>Almuerzo y cena</button>
            <button data-testid="btn-breakfast" type="button" className={styleTypeBreakfast} onClick={changeOptionBreakfast}>Desayuno</button>
          </div>

          <div className="Image-products-container">
            {optionMenu.map((product) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={product.id} className="product-card">
                <h1 className="Price-product">
                  s/
                  {product.price}
                </h1>
                <picture className="Image">
                  <img data-testid={`image-products-${product.id}`} src={product.image} alt="menu-cafe" className="Image-product" />
                </picture>
                <div className="Image-menu-name">
                  <button key={product.name} data-testid={`btn-add-product-${product.id}`} type="button" className="Btn-cantidad-plus" onClick={() => onAddProduct(product)}>+</button>
                  <p className="Name-product">{product.name}</p>
                  <button type="button" data-testid={`btn-remove-product-${product.id}`} className="Btn-cantidad-minus" onClick={() => onRemoveProduct(product)}> - </button>
                </div>
              </div>
            ))}

          </div>

          <div className="Order-table-container">
            <input data-testid="input-name-client" className="Client-name" type="text" ref={inputClientName} placeholder="Nombre del cliente" onChange={(e) => addClientName(e)} />
            <h4 data-testid="subtitle-Client" className="Client">{`Cliente: ${nameClient}`}</h4>

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
                {productsOrder.map((product) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={product.id} className="Row-body">
                    <td data-testid={`name-product-${product.id}`} className="Name-items-product">{product.name}</td>
                    <td data-testid={`quantity-product-${product.id}`} className="Items-products-table">{product.quantity}</td>
                    <td data-testid={`price-product-${product.id}`} className="Items-products-table">{product.price}</td>
                    <td>
                      <button data-testid={`delete-product-${product.id}`} className="Btn-delete-item-product" type="button" onClick={() => deleteItemProduct(product)}>
                        <img src={trashIcon} alt="button-delete" className="Image-button-delete" />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td> </td>
                  <th className="Items-products-table">total</th>
                  <td className="Items-products-table">{`S/${totalAmount}.0`}</td>
                </tr>
              </tbody>
            </table>
            <button data-testid="btn-send-order" type="button" className="Btn-send-order" onClick={postOrder}>Enviar Orden</button>
          </div>
        </div>
      </div>
    </div>
  );
}
