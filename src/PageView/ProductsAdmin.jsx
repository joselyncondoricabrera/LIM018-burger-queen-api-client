/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import NavbarAdmin from './NavbarAdmin';
import '../PageStyle/Products.scss';
import searchIcon from '../imagen/search.png';
// import producto from '../imagen/cafe-americano.png';
import { getProducts } from '../Requests/requestApi';

export default function ProductsAdmin() {
  const [product, setProduct] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [dateEntry, setDateEntry] = useState('');
  const [image, setImage] = useState('');
  // const [changeStyle, setChangeStyle] = useState('');
  // // seleccionar el producto
  const selectedProduct = (prod) => {
    console.log('seleccionaste');
    console.log(prod);
    setId(prod.id);
    setName(prod.name);
    setPrice(prod.price);
    setType(prod.type);
    setDateEntry(prod.dateEntry);
    setImage(prod.image);
    // setChangeStyle('Item-selected');
    document.querySelector(`.row${prod.id}`).classList.remove('Item-selected');
    document.querySelector(`.row${prod.id}`).classList.add('Item-selected');
    console.log(document.querySelector(`.row${prod.id}`));
  };

  // mostrar data de productos al cargar la pagina
  useEffect(() => {
    const tokens = sessionStorage.getItem('token');
    getProducts(tokens)
      .then((result) => {
        setProduct(result);
      });
  }, []);

  return (
    <div className="Background-menu">
      <NavbarAdmin />
      <div className="Background-products">
        <div className="Background-search-table-products">
          <div className="Background-input-add-product">
            <div className="Container-input-product">
              <img src={searchIcon} className="Icon-product" alt="icon-search" />
              <input type="text" className="Input-search-product" placeholder="Buscar producto" />
            </div>
            <button type="button" className="Button-add-product">Agregar Producto</button>
          </div>
          <div className="Container-select-table-products">
            <div className="Content-select">
              <select name="select" className="Select-type-product">
                <option className="Option-type-product" value="value1">Desayuno</option>
                <option className="Option-type-product" value="value2">Almuerzo y cena</option>
                <option className="Option-type-product" value="value3">Bebidas</option>
              </select>
            </div>

            <table className="Table-products">
              <thead>
                <tr className="Row-head-table-product">
                  <th className="">Id</th>
                  <th className="">Nombre</th>
                  <th className="">Precio</th>
                </tr>
              </thead>
              <tbody>
                { product.map((prod, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={i} className={`row${prod.id}`} onClick={() => { selectedProduct(prod); }}>
                    <td className="Item-table id-table">{prod.id}</td>
                    <td className="Item-table ">{prod.name}</td>
                    <td className="Item-table">{prod.price}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        <div className="Background-info-product">
          <img src={image} alt="images-product" className="Image-product-data" />
          <p className="Info-product">{`Id: ${id}`}</p>
          <p className="Info-product">{`Nombre : ${name}`}</p>
          <p className="Info-product">{`Precio: ${price}`}</p>
          <p className="Info-product">{`Tipo: ${type}`}</p>
          <p className="Info-product">{`Fecha de entrada: ${dateEntry}`}</p>
        </div>
      </div>
    </div>
  );
}
