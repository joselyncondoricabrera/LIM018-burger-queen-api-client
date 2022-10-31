/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
// import Swal from 'sweetalert2';
import '../PageStyle/Users.scss';
import Select from 'react-select';
import { getUsers, postUsers } from '../Requests/requestApi';
import searchIcon from '../imagen/search.png';
import userIcon from '../imagen/user.png';
import NavBarAdmin from './NavbarAdmin';

export default function UsersAdmin() {
  const [styleModal, setStyleModal] = useState('Background-Modal-Users-inactivated');
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [valueRol, setValueRol] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const inputEmailModal = useRef('');
  const inputPasswordModal = useRef('');
  const inputRolModal = useRef('');

  const selectedUser = (user) => {
    setId(user.id);
    setEmail(user.email);
    setPassword(user.password);
    setRol(user.roles.admin ? 'admin' : !(user.roles.admin) && !(user.roles.chef) ? 'mesero' : 'cocinero');
    // quitar seleccion a las  filas de la tabla
    const rowTable = document.querySelectorAll('tr');
    rowTable.forEach((e, i) => {
      // no cuenta a la cabecera de la tabla, solo a las filas que contiene data
      if (i > 0) {
        e.classList.remove('Item-selected');
      }
    });
    // seleccionar la fila que se dio onclick
    document.querySelector(`.row${user.id}`).classList.add('Item-selected');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getUsers(token).then((res) => setUsers(res));
  }, [newEmail, newPassword, valueRol]);

  const openModal = () => {
    setStyleModal('Background-Modal-Users');
  };

  const onCancelAdd = () => {
    setStyleModal('Background-Modal-Users-inactivated');
    setNewEmail('');
    setNewPassword('');
    setValueRol('');
    inputEmailModal.current.value = '';
    inputPasswordModal.current.value = '';
    inputRolModal.current.value = '';
  };

  const onAddUser = () => {
    const token = sessionStorage.getItem('token');
    const usersBody = {
      email: newEmail,
      password: newPassword,
      roles: {
        // eslint-disable-next-line no-unneeded-ternary
        admin: valueRol === 'admin' ? true : false,
        // eslint-disable-next-line no-unneeded-ternary
        chef: valueRol === 'cocinero' ? true : false,
      },
    };
    postUsers(token, usersBody)
      .then((res) => {
        console.log(res);
        console.log(valueRol);
        setNewEmail('');
        setNewPassword('');
        setValueRol('');
        inputEmailModal.current.value = '';
        inputPasswordModal.current.value = '';
        inputRolModal.current.value = '';
      });

    setStyleModal('Background-Modal-Users-inactivated');
  };

  const onUpdateUser = (users) => {
    const token = sessionStorage.getItem('token');
    const userBodyUpdate = {
      email: newEmail,
      password: newPassword,
      roles: {
        // eslint-disable-next-line no-unneeded-ternary
        admin:us,
        chef: user.chef,
      },
    };
  };

  const selectChange = (e) => {
    setValueRol(e.value);
    console.log(valueRol);
  };

  const options = [
    { value: 'mesero', label: 'Mesero' },
    { value: 'cocinero', label: 'Cocinero' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <div className="Background-menu">
      <div className={styleModal}>
        <div className="Brackground-Form">
          <h1>Nuevo usuario</h1>
          <input type="text" ref={inputEmailModal} className="Input-Modal" onChange={(e) => setNewEmail(e.target.value)} placeholder="ingresa un correo" />
          <input type="text" ref={inputPasswordModal} className="Input-Modal" onChange={(e) => setNewPassword(e.target.value)} placeholder="ingresa una contraseña" />
          <Select className="Input-Modal" options={options} ref={inputRolModal} onChange={(e) => selectChange(e)} value={valueRol} />
          <div className="Background-buttons">
            <button className="Btn-delete-product" onClick={() => onCancelAdd()} type="button">Cancelar</button>
            <button className="Btn-update-product" onClick={() => onAddUser()} type="button">Agregar</button>
          </div>
        </div>
      </div>
      <NavBarAdmin />
      <div className="Background-image-Users">
        <div className="Background-search-table-users">
          <div className="Background-input-add-users">
            <div className="Container-input-users">
              <img src={searchIcon} className="Icon-search" alt="icon-search" />
              <input type="text" className="Input-search-users" placeholder="Buscar usuario" />
            </div>
            <button type="button" onClick={() => openModal()} className="Button-add-users">+ Agregar usuario</button>
          </div>
          <div className="Container-select-table-users">
            <table className="Table-users">
              <thead>
                <tr className="Row-head-table-users">
                  <th className="">ID</th>
                  <th className="">Email</th>
                  <th className="">Roles</th>
                </tr>
              </thead>
              <tbody>
                { users.map((user, i) => (
                // eslint-disable-next-line react/no-array-index-key
                  <tr key={i} className={`row${user.id}`} onClick={() => { selectedUser(user); }}>
                    <td className="Item-table id-table">{user.id}</td>
                    <td className="Item-table ">{user.email}</td>
                    <td className="Item-table">{user.roles.admin === true ? 'admin' : user.roles.admin === false && user.roles.chef === false ? 'mesero' : 'cocinero'}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        <div className="Background-info-users">
          <img src={userIcon} alt="images-user" className="Image-users-data" />
          <p className="Info-users">{`ID:  ${id}`}</p>
          <p className="Info-users">{`Email:  ${email}`}</p>
          <p className="Info-users">{`Contraseña:  ${password}`}</p>
          <p className="Info-users">{`Rol:  ${rol}`}</p>
          <div className="Background-buttons">
            <button className="Btn-delete-product" type="button">Eliminar</button>
            <button className="Btn-update-product" onClick={() => onUpdateUser()} type="button">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
