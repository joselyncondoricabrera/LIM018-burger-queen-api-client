import React, { useState, useEffect } from 'react';
import '../PageStyle/Menu.scss';
import NavBar from './Navbar';
// import cafeAmericano from '../imagen/cafe-americano.png';
// import cafeLeche from '../imagen/cafe-con-leche.png';
// import jugoFrutas from '../imagen/jugo-de-frutas.png';
// import sandwich from '../imagen/sandwich.png';

export default function Menu() {
  const [products, setProducts] = useState([]);
  // const [client, setClient] = useState('');
  // const orderData = {
  //   userId: '3',
  //   client: { client }.client,
  // };
  const token = sessionStorage.getItem('token');
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

  // const getProducts = () => {

  useEffect(() => {
    fetch('http://localhost:3001/products', {
      headers: {
      // eslint-disable-next-line quote-props
        'authorization': `Bearer ${token}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        setProducts(result);
        console.log(result);
      });
  }, []);

  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <h2 className="Title">Menú</h2>

        <div className="Container-all-menu">

          <div className="Menu-options-container">
            <div className="Menu-options">Almuerzo y cena</div>
            <div className="Menu-options">Desayuno</div>
          </div>

          <div className="Each-image">
            { products.map((product, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="Imagen-container">
                <h1 key={product.id}>{product.price}</h1>
                <picture className="Image">
                  <img key={product.id} src={product.image} alt="menu-cafe" />
                </picture>
                <div className="Image-menu-name">
                  <button type="button">+</button>
                  <p key={product.id}>{product.name}</p>
                  <button type="button">-</button>
                </div>
              </div>
            ))}

            {/* <div className="Images-menu-container">
              <div className="Imagen-container">
                <picture className="Image">
                  <img src={cafeLeche} alt="menu-cafe" />
                </picture>
                <div className="Image-menu-name">
                  <button type="button">+</button>
                  <p>Café Americano</p>
                  <button type="button">-</button>
                </div>
              </div>
            </div>

            <div className="Images-menu-container">
              <div className="Imagen-container">
                <picture className="Image">
                  <img src={jugoFrutas} alt="menu-cafe" />
                </picture>
                <div className="Image-menu-name">
                  <button type="button">+</button>
                  <p>Café Americano</p>
                  <button type="button">-</button>
                </div>
              </div>
            </div>

            <div className="Images-menu-container">
              <div className="Imagen-container">
                <picture className="Image">
                  <img src={sandwich} alt="menu-cafe" />
                </picture>
                <div className="Image-menu-name">
                  <button type="button">+</button>
                  <p>Café Americano</p>
                  <button type="button">-</button>
                </div>
              </div>
            </div> */}

          </div>

          <div className="Order-table">
            { /* <input type="text" placeholder="Nombre del cliente" onChange={(e)
            => setClient(e.target.value)} />
            <button type="button" onClick={postOrder}> Agregar</button>
            <h4>{client}</h4> */}
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
