/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
import '../PageStyle/Users.scss';
import { getUsers } from '../Requests/requestApi';
import searchIcon from '../imagen/search.png';
import userIcon from '../imagen/user.png';
// import { postUsers } from '../Requests/requestApi';

import NavBarAdmin from './NavbarAdmin';

export default function UsersAdmin() {
  const [styleModal, setStyleMdal] = useState('Background-Modal-Users-inactivated');
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [value, setValue] = useState('');

  const selectedUser = (user) => {
    setId(user.id);
    setEmail(user.email);
    setPassword(user.password);
    setRol(user.roles.admin ? 'admin' : !(user.roles.admin) && !(user.roles.chef) ? 'mesero' : 'cocinero');
    document.querySelector(`.row${user.id}`).classList.remove('Item-selected');
    document.querySelector(`.row${user.id}`).classList.add('Item-selected');
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getUsers(token).then((res) => setUsers(res));
  }, []);

  const onAddUser = () => {
    setStyleMdal('Background-Modal-Users');
  };
  // const onAddUser = () => {
  // const token = sessionStorage.getItem('token');
  // const usersBody = {
  //   email: emailUser,
  //   password: '123456',
  //   roles: {
  //     admin: false,
  //     chef: false,
  //   },
  // };
  // console.log(usersBody);
  // postUsers(token, usersBody);
  // console.log('aqui va la request post de users y un setUsers');
  // };

  const selectChange = (e) => {
    setValue(e.target.value);
  };
  console.log(value);
  return (
    <div className="Background-menu">
      <div className={styleModal}>
        <div>
          <h1>Nuevo usuario</h1>
          <input type="text" placeholder="ingresa un correo" />
          <input type="text" placeholder="ingresa una contraseña" />
          <select onChange={(e) => selectChange(e)} value={value}>
            <option name="rol">escoge un rol</option>
            <option name="rol" value="mesero">mesero</option>
            <option name="rol" value="cocinero">cocinero</option>
            <option name="rol" value="cocinero">admin</option>
          </select>
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
            <button type="button" onClick={() => onAddUser()} className="Button-add-users">+ Agregar usuario</button>
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
                    <td className="Item-table">{user.roles.admin ? 'admin' : !(user.roles.admin) && !(user.roles.chef) ? 'mesero' : 'cocinero'}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>

        <div className="Background-info-users">
          <img src={userIcon} alt="images-user" className="Image-users-data" />
          <p className="Info-users">{`Id: ${id}`}</p>
          <p className="Info-users">{`Email: ${email}`}</p>
          <p className="Info-users">{`Contraseña: ${password}`}</p>
          <p className="Info-users">{`Rol: ${rol}`}</p>
        </div>
      </div>
    </div>
  );
}
