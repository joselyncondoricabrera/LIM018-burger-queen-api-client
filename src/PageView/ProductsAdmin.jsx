/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import NavbarAdmin from './NavbarAdmin';
import '../PageStyle/Products.scss';
import searchIcon from '../imagen/search.png';
import { getProducts, postProducts } from '../Requests/requestApi';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  // const [id, setId] = useState('');
  // const [name, setName] = useState('');
  // const [price, setPrice] = useState('');
  // const [type, setType] = useState('');
  // const [dateEntry, setDateEntry] = useState('');
  // const [image, setImage] = useState('');
  const [nameNewProduct, setNameNewProduct] = useState('');
  const [priceNewProduct, setPriceNewProduct] = useState('');
  const inputNameProduct = useRef('');
  const inputPriceProduct = useRef('');
  const inputImageProduct = useRef('');
  // cambiar estilos para modal de agregar nuevo producto
  const [changeStyleModal, setChangeStyleModal] = useState('Hidden-modal');
  // ocultar select
  const [hiddenSelect, setHiddenSelect] = useState('Select-library');

  // capturar url de la imagen
  // eslint-disable-next-line no-unused-vars
  const [imageSelection, setImageSelection] = useState('');

  // producto seleccionado
  const [productSelection, setProductSelection] = useState(
    {
      id: '', name: '', price: '', type: '', dateEntry: '', image: '',
    },
  );

  // opciones del select
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
        setProducts(productsSelect);
      });
  };

  // función para agregar nuevos productos al db.json
  const addNewproduct = () => {
    setChangeStyleModal('Container-modal-add-product');
    setHiddenSelect('Hidden-select');
  };

  const selectedProduct = (prod) => {
    // setId(prod.id);
    // setName(prod.name);
    // setPrice(prod.price);
    // setType(prod.type);
    // setDateEntry(prod.dateEntry);
    // setImage(prod.image);

    setProductSelection(
      {
        id: prod.id, name: prod.name, price: prod.price, type: prod.type, dateEntry: prod.dateEntry, image: prod.image,
      },
    );

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

  // cancelar el modal de agregar producto
  const cancelModal = () => {
    setChangeStyleModal('Hidden-modal');
  };
  const saveProduct = () => {
    // const input = document.querySelector('input[type=file]');
    // console.log(input.value);
    const productData = {
      // id: '14',
      name: nameNewProduct,
      price: priceNewProduct,
      image: imageSelection,
      type: 'dz',
    };
    console.log('product', nameNewProduct);
    console.log('price', priceNewProduct);
    console.log(productData);
    const tokens = sessionStorage.getItem('token');
    postProducts(tokens, productData)
      .then((res) => {
        console.log(res);
        setChangeStyleModal('Hidden-modal');
        setNameNewProduct('');
        setPriceNewProduct('');
        inputNameProduct.current.value = '';
        inputPriceProduct.current.value = '';
        inputImageProduct.current.value = '';
      });
  };

  // promesa que leer el archivo seleccionado
  const readAsBase64 = (fileBlob) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (ev) => {
      console.log('cargo la imagen', ev.target.result);
      resolve(ev.target.result);
    };

    fileReader.onerror = (e) => {
      reject(e);
    };

    fileReader.readAsDataURL(fileBlob);
  });

  const onChangeInputFile = (event) => {
    console.log(event.target.files[0]);
    // Devuelve un objeto llamado FileList no instanciable
    const { files } = event.currentTarget;
    // Leamos por ejemplo solo el primer archivo:
    readAsBase64(files[0]).then((fileInBase64) => {
      console.log(fileInBase64);
      setImageSelection(fileInBase64);
    }).catch((e) => {
      console.error(e);
    });
  };

  // mostrar data de productos al cargar la pagina
  useEffect(() => {
    const tokens = sessionStorage.getItem('token');
    getProducts(tokens)
      .then((result) => {
        setProducts(result);
        console.log(result);
      });
  }, [nameNewProduct, priceNewProduct, imageSelection]);

  return (
    <div className="Background-menu">
      <NavbarAdmin />
      {/* container del modal para agregar nuevo producto */}
      <div className={changeStyleModal}>
        <div className="modal-add-product">
          <h2>Nuevo Producto</h2>
          <input className="Input-name-product" type="text" ref={inputNameProduct} placeholder=" Ingrese nombre del producto" onChange={(e) => setNameNewProduct(e.target.value)} />
          <input className="Input-price-product" type="text" ref={inputPriceProduct} placeholder=" Ingrese precio" onChange={(e) => setPriceNewProduct(e.target.value)} />
          <input className="Input-file-images" type="file" ref={inputImageProduct} accept="image/png, image/jpeg" onChange={(e) => onChangeInputFile(e)} />
          <div className="Container-buttons-modal">
            <button className="Button-save-product" type="button" onClick={saveProduct}>Guardar</button>
            <button className="Button-cancel" type="button" onClick={cancelModal}>Cancelar</button>
          </div>
        </div>
      </div>

      <div className="Background-products">
        <div className="Background-search-table-products">
          <div className="Background-input-add-product">
            <div className="Container-input-product">
              <img src={searchIcon} className="Icon-product" alt="icon-search" />
              <input type="text" className="Input-search-product" placeholder="Buscar producto" />
            </div>
            <button type="button" className="Button-add-product" onClick={addNewproduct}>Agregar Producto</button>
          </div>
          <div className="Container-select-table-products">
            {/* <div className="Content-select">
              <select name="select" className="Select-type-product">
                <option className="Option-type-product" value="value1">Desayuno</option>
                <option className="Option-type-product" value="value2">Almuerzo y cena</option>
                <option className="Option-type-product" value="value3">Bebidas</option>
              </select>
            </div> */}
            <Select className={hiddenSelect} options={options} onChange={selectionTypeProduct} defaultValue={{ label: 'Seleccione tipo de producto....', value: 'empty' }} />

            <table className="Table-products">
              <thead>
                <tr className="Row-head-table-product">
                  <th className="">Id</th>
                  <th className="">Nombre</th>
                  <th className="">Precio</th>
                </tr>
              </thead>
              <tbody>
                { products.map((prod, i) => (
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
          <img src={productSelection.image} alt="images-product" className="Image-product-data" />
          <p className="Info-product">
            {' '}
            <b>Id:</b>
            {' '}
            {`${productSelection.id}`}
          </p>
          <p className="Info-product">{`Nombre : ${productSelection.name}`}</p>
          <p className="Info-product">{`Precio: ${productSelection.price}`}</p>
          <p className="Info-product">{`Tipo: ${productSelection.type}`}</p>
          <p className="Info-product">{`Fecha de entrada: ${productSelection.dateEntry}`}</p>

          <div className="Background-buttons">
            <button className="Btn-delete-product" type="button">Eliminar</button>
            <button className="Btn-update-product" type="button">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
