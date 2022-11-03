/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import NavbarAdmin from './NavbarAdmin';
import '../PageStyle/Products.scss';
import searchIcon from '../imagen/search.png';
import { getProducts, postProducts, putProducts } from '../Requests/requestApi';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [nameNewProduct, setNameNewProduct] = useState('');
  const [priceNewProduct, setPriceNewProduct] = useState('');
  const [typeNewProduct, setTypeNewProduct] = useState('');
  const inputNameProduct = useRef('');
  const inputPriceProduct = useRef('');
  const selectTypeProduct = useRef('');

  // cambiar estilos para modal de agregar nuevo producto
  const [changeStyleModal, setChangeStyleModal] = useState('Hidden-modal');
  // ocultar select
  const [hiddenSelect, setHiddenSelect] = useState('Select-library');
  // mensaje de span
  const [spanMessage, setSpanMessage] = useState('Ningún archivo selec.');
  // titulo del modal
  const [titleModal, setTitleModal] = useState('');
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
    setTitleModal('Nuevo Producto');
    setChangeStyleModal('Container-modal-add-product');
    // ocultar el select de tipo de producto
    setHiddenSelect('Hidden-select');
  };

  const selectedProduct = (prod) => {
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
    inputNameProduct.current.value = '';
    inputPriceProduct.current.value = '';
  };

  // guardar nuevo producto
  const saveProduct = () => {
    if (nameNewProduct === '' || priceNewProduct === '' || imageSelection === '') {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'LLenar todo los campos',
        icon: 'warning',
        showCancelButton: false,
      });
    } else {
      // capturar fecha del sistema
      const today = new Date();
      const productData = {
        name: nameNewProduct,
        price: Number(priceNewProduct),
        image: imageSelection,
        type: typeNewProduct,
        dateEntry: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
      };

      const tokens = sessionStorage.getItem('token');
      postProducts(tokens, productData)
        .then(() => {
          setChangeStyleModal('Hidden-modal');
          setNameNewProduct('');
          setPriceNewProduct('');
          inputNameProduct.current.value = '';
          inputPriceProduct.current.value = '';
        });
    }
  };

  const updateProduct = () => {
    console.log(productSelection);
    // mostrar datos en los input
    inputNameProduct.current.value = productSelection.name;
    inputPriceProduct.current.value = productSelection.price;
    selectTypeProduct.current.value = productSelection.type;

    setTitleModal('Modificar Producto');
    setHiddenSelect('Hidden-select');
    setChangeStyleModal('Container-modal-add-product');

    // peticion modificar
    const modifiedProduct = {
      id: productSelection.id,
      name: productSelection.name,
      price: productSelection.price,
      image: productSelection.image,
      type: productSelection.type,
      dateEntry: productSelection.dateEntry,
    };
    const tokens = sessionStorage.getItem('token');
    putProducts(productSelection.id, tokens, modifiedProduct)
      .then((res) => { console.log(res); });
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
    setSpanMessage(event.target.files[0].name);
    // Devuelve un objeto llamado FileList no instanciable
    const { files } = event.currentTarget;
    // Leamos por ejemplo solo el primer archivo:
    readAsBase64(files[0]).then((fileInBase64) => {
      // console.log(fileInBase64);
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
      });
  }, [nameNewProduct, priceNewProduct, imageSelection]);

  return (
    <div className="Background-menu">
      <NavbarAdmin />
      {/* container del modal para agregar nuevo producto */}
      <div className={changeStyleModal}>
        <div className="modal-add-product">
          <h2>{titleModal}</h2>
          <input className="Input-name-product" type="text" ref={inputNameProduct} placeholder=" Ingrese nombre del producto" onChange={(e) => setNameNewProduct(e.target.value)} />
          <input className="Input-price-product" type="text" ref={inputPriceProduct} placeholder=" Ingrese precio" onChange={(e) => setPriceNewProduct(e.target.value)} />
          <Select className="Select-library" options={options} ref={selectTypeProduct} onChange={(e) => setTypeNewProduct(e.value)} defaultValue={{ label: 'Seleccione tipo de producto....', value: 'empty' }} />
          <div className="Container-input-span">
            <label className="Container-input-file" htmlFor="inputFileImagen">
              Seleccionar archivo
              <input id="inputFileImagen" className="Input-file-images" type="file" accept="image/png, image/jpeg" onChange={(e) => onChangeInputFile(e)} />
            </label>
            <span className="Span-message-file">{spanMessage}</span>
          </div>

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
            <Select className={hiddenSelect} options={options} onChange={selectionTypeProduct} defaultValue={{ label: 'Tipo de producto....', value: 'empty' }} />

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
            <button className="Btn-update-product" onClick={updateProduct} type="button">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
