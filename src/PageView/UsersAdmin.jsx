/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
// import Swal from 'sweetalert2';
import '../PageStyle/Users.scss';
import Select from 'react-select';
import {
  deleteUser, getUsers, postUsers, updateUsers,
} from '../Requests/requestApi';
import searchIcon from '../imagen/search.png';
import userIcon from '../imagen/user.png';
import NavBarAdmin from './NavbarAdmin';

export default function UsersAdmin() {
  const [styleModal, setStyleModal] = useState('Background-Modal-Users-inactivated');
  const [styleModalDelete, setStyleModalDelete] = useState('Background-Modal-Users-inactivated');
  const [users, setUsers] = useState([]);
  const [valueRol, setValueRol] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const inputEmailModal = useRef('');
  const inputPasswordModal = useRef('');
  const inputRolModal = useRef('');
  const [titleModal, setTitleModal] = useState('');
  const [btnModalText, setBtnModalText] = useState('');
  const [usersChanged, setUsersChanged] = useState(false);
  const [userSelection, setUserSelection] = useState('');

  const selectedUser = (index) => {
    setUserSelection(index);
    // quitar seleccion a las  filas de la tabla
    const rowTable = document.querySelectorAll('tr');
    rowTable.forEach((e, i) => {
      // no cuenta a la cabecera de la tabla, solo a las filas que contiene data
      if (i > 0) {
        e.classList.remove('Item-selected');
      }
    });
    // seleccionar la fila que se dio onclick
    document.querySelector(`.row${users[index].id}`).classList.add('Item-selected');
    console.log(index);
    console.log(users[index].id);
    setUsersChanged(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getUsers(token).then((res) => setUsers(res));
  }, [newEmail, newPassword, valueRol, usersChanged]);

  const openModalAdd = () => {
    setStyleModal('Background-Modal-Users');
    setTitleModal('Agregar Usuario');
    setBtnModalText('Agregar');
  };

  const openModalUpdate = () => {
    setStyleModal('Background-Modal-Users');
    setTitleModal('Actualizar Usuario');
    setBtnModalText('Actualizar');
  };

  const openModalDelete = () => {
    setStyleModalDelete('Background-Modal-Users');
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

  const onCancelDelete = () => {
    setStyleModalDelete('Background-Modal-Users-inactivated');
    setUsersChanged(true);
  };

  const onAddUpdateUser = () => {
    if (titleModal === 'Agregar Usuario') {
      console.log('Agregando usuario');
      const token = sessionStorage.getItem('token');
      const usersBody = {
        email: newEmail,
        password: newPassword,
        roles: {
          // eslint-disable-next-line no-unneeded-ternary
          admin: valueRol === 'admin' ? true : false,
          // eslint-disable-next-line no-unneeded-ternary
          chef: valueRol === 'chef' ? true : false,
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
          setStyleModal('Background-Modal-Users-inactivated');
        });
    } else {
      console.log('Actualizando usuario');
      const token = sessionStorage.getItem('token');
      const userBodyUpdate = {
        email: newEmail,
        password: newPassword,
        roles: {
        // eslint-disable-next-line no-unneeded-ternary
          admin: valueRol === 'admin' ? true : false,
          // eslint-disable-next-line no-unneeded-ternary
          chef: valueRol === 'chef' ? true : false,
        },
      };
      console.log(valueRol);
      console.log(userBodyUpdate);
      console.log(users[userSelection].id);
      updateUsers(users[userSelection].id, token, userBodyUpdate)
        .then((res) => {
          console.log(res);
          setNewEmail('');
          setNewPassword('');
          setValueRol('');
          inputEmailModal.current.value = '';
          inputPasswordModal.current.value = '';
          inputRolModal.current.value = '';
          setStyleModal('Background-Modal-Users-inactivated');
        });
    }
  };

  const onDeleteUser = () => {
    const token = sessionStorage.getItem('token');
    console.log(users[userSelection].id);
    deleteUser(users[userSelection].id, token)
      .then(() => {
        setStyleModalDelete('Background-Modal-Users-inactivated');
        setUsersChanged(true);
        setUserSelection('');
      });
  };

  // const selectChange = (e) => {
  //   setValueRol(e.value);
  //   console.log(valueRol);
  // };

  const options = [
    { value: 'mesero', label: 'Mesero' },
    { value: 'chef', label: 'Cocinero' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <div className="Background-menu">
      <div className={styleModal}>
        <div className="Brackground-Form">
          <h2>{titleModal}</h2>
          <input type="text" ref={inputEmailModal} className="Input-Modal" onChange={(e) => setNewEmail(e.target.value)} placeholder="ingresa un correo" />
          <input type="text" ref={inputPasswordModal} className="Input-Modal" onChange={(e) => setNewPassword(e.target.value)} placeholder="ingresa una contraseña" />
          <Select className="Input-Modal" options={options} ref={inputRolModal} onChange={(e) => setValueRol(e.value)} defaultValue={{ label: 'Seleccione un rol....', value: 'empty' }} />
          <div className="Background-buttons">
            <button className="Btn-update-product" onClick={() => onAddUpdateUser()} type="button">{btnModalText}</button>
            <button className="Btn-delete-product" onClick={() => onCancelAdd()} type="button">Cancelar</button>
          </div>
        </div>
      </div>
      <div className={styleModalDelete}>
        <div className="Brackground-Modal-Delete">
          <h2>Eliminar usuario</h2>
          <p className="Modal-Delete-Text">¿Está seguro que desea eliminar el usuario?</p>
          <div className="Background-buttons">
            <button className="Btn-delete-product" onClick={() => onDeleteUser()} type="button">Eliminar</button>
            <button className="Btn-update-product" onClick={() => onCancelDelete()} type="button">Cancelar</button>
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
            <button type="button" onClick={() => openModalAdd()} className="Button-add-users">+ Agregar usuario</button>
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
                  <tr key={i} className={`row${user.id}`} onClick={() => { selectedUser(i); }}>
                    <td className="Item-table id-table">{user.id}</td>
                    <td className="Item-table ">{user.email}</td>
                    <td className="Item-table">{user.roles.admin === true ? 'admin' : user.roles.admin === false && user.roles.chef === false ? 'mesero' : 'cocinero'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {userSelection === '' ? null : (
          <div className="Background-info-users">
            <img src={userIcon} alt="images-user" className="Image-users-data" />
            <p className="Info-users">{`ID:  ${users[userSelection].id}`}</p>
            <p className="Info-users">{`Email:  ${users[userSelection].email}`}</p>
            <p className="Info-users">{`Contraseña:  ${users[userSelection].password}`}</p>
            <p className="Info-users">{`Rol:  ${users[userSelection].roles.admin === true ? 'admin' : users[userSelection].roles.admin === false && users[userSelection].roles.chef === false ? 'mesero' : 'cocinero'}`}</p>
            <div className="Background-buttons">
              <button className="Btn-delete-product" type="button" onClick={() => openModalDelete()}>Eliminar</button>
              <button className="Btn-update-product" onClick={() => openModalUpdate()} type="button">Actualizar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
