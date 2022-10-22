import React from 'react';
// import {
//   useNavigate,
// } from 'react-router-dom';
import NavBarAdmin from './NavbarAdmin';

export default function UsersAdmin() {
  return (
    <div className="Background-menu">
      <NavBarAdmin />
      <div className="Background-image">
        <div>
          <div>
            <picture>
              {/* <img /> */}
            </picture>
            <input />
            <button type="button">
              <p>+</p>
              <p>Agregar usuario</p>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
