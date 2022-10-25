/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import NavbarAdmin from './NavbarAdmin';
import '../PageStyle/Products.scss';
import searchIcon from '../imagen/search.png';
import { getProducts } from '../Requests/requestApi';

export default function ProductsAdmin() {
  const [product, setProduct] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [dateEntry, setDateEntry] = useState('');
  const [image, setImage] = useState('');

  // // seleccionar el producto
  const options = [
    { value: 'Desayuno', label: 'Desayuno' },
    { value: 'Almuerzo y cena', label: 'Almuerzo y cena' },
    { value: 'Bebidas', label: 'Bebidas' },
  ];

  // mostrar en la tabla por tipo de producto
  const selectionTypeProduct = (e) => {
    const tokens = sessionStorage.getItem('token');
    getProducts(tokens)
      .then((result) => {
        const productsSelect = result.filter((pro) => pro.type === e.value);
        console.log(productsSelect);
        setProduct(productsSelect);
      });
  };

  const selectedProduct = (prod) => {
    setId(prod.id);
    setName(prod.name);
    setPrice(prod.price);
    setType(prod.type);
    setDateEntry(prod.dateEntry);
    setImage(prod.image);

    // quitar seleccion a las  filas de la tabla
    const rowTable = document.querySelectorAll('tr');
    rowTable.forEach((e, i) => {
      // no cuenta a la cabecera de la tabla, solo a las filas que contiene data
      if (i > 0) {
        e.classList.remove('Item-selected');
      }
    });
    // seleccionar la fila que se dio onclick
    document.querySelector(`.row${prod.id}`).classList.add('Item-selected');
  };

  // mostrar data de productos al cargar la pagina
  useEffect(() => {
    const tokens = sessionStorage.getItem('token');
    getProducts(tokens)
      .then((result) => {
        setProduct(result);
        console.log(product);
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
            {/* <div className="Content-select">
              <select name="select" className="Select-type-product">
                <option className="Option-type-product" value="value1">Desayuno</option>
                <option className="Option-type-product" value="value2">Almuerzo y cena</option>
                <option className="Option-type-product" value="value3">Bebidas</option>
              </select>
            </div> */}
            <Select className="Select-library" options={options} onChange={selectionTypeProduct} defaultValue={{ label: 'Seleccione tipo de producto....', value: 'empty' }} />

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
          <p className="Info-product">
            {' '}
            <b>Id:</b>
            {' '}
            {`${id}`}
          </p>
          <p className="Info-product">{`Nombre : ${name}`}</p>
          <p className="Info-product">{`Precio: ${price}`}</p>
          <p className="Info-product">{`Tipo: ${type}`}</p>
          <p className="Info-product">{`Fecha de entrada: ${dateEntry}`}</p>

          <div className="Background-buttons">
            <button className="Btn-delete-product" type="button">Eliminar</button>
            <button className="Btn-update-product" type="button">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
