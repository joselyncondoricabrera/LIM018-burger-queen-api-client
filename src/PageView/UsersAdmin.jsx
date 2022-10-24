import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
import '../PageStyle/Users.scss';
import { getUsers } from '../Requests/requestApi';
// import { postUsers } from '../Requests/requestApi';
// import {
//   useNavigate,
// } from 'react-router-dom';
import NavBarAdmin from './NavbarAdmin';

export default function UsersAdmin() {
  // const [emailUser, setEmailUser] = useState('');
  // const [styleModal, setStyleMdal] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    getUsers(token).then((res) => setUsers(res));
  }, []);

  const onAddUser = () => {
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
  };

  return (
    <div className="Background-menu">
      {/* <div className="Background-Modal-Users">
        <div>
          <h1>Nuevo usuario</h1>
          <input type="text" placeholder="ingresa un correo" />
          <input type="text" placeholder="ingresa una contraseña" />
          <select>
            <option name="rol">escoge un rol</option>
            <option name="rol">mesero</option>
            <option name="rol">cocinero</option>
          </select>
        </div>
      </div> */}
      <NavBarAdmin />
      <div className="Background-image-orders">
        <div>
          <div className="Search-Add-Users">
            <picture>
              {/* <img /> */}
            </picture>
            <input />
            <button type="button" className="Add-Users" onClick={() => onAddUser()}>
              <p className="Btn-Add-Plus">+</p>
              <p className="Btn-Add-Text">Agregar usuario</p>
            </button>
          </div>
          <div>
            <table className="Table-Users">
              <thead>
                <tr className="Row-head">
                  <th className="Items-users-table">ID</th>
                  <th className="Items-users-table">Email</th>
                  <th className="Items-users-table">Rol</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td> </td>
                  <td><input type="text" placeholder="ingresa un correo" /></td>
                  <td><input type="text" placeholder="ingresa una contraseña" /></td>
                </tr> */}
                {users.map((user, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={i}>
                    <td className="Name-items-product">{user.id}</td>
                    <td className="Items-products-table">{user.email}</td>
                    <td className="Items-products-table">{user.roles.admin === false && user.roles.chef === false ? 'mesero' : 'cocinero'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            {/* <img src="" /> */}
            <tr key={i}>
                    <td className="Name-items-product">{user.id}</td>
                    <td className="Items-products-table">{user.email}</td>
                    <td className="Items-products-table">{user.roles.admin === false && user.roles.chef === false ? 'mesero' : 'cocinero'}</td>
                  </tr>
                ))}
          </div>
        </div>

      </div>

    </div>
  );
}
