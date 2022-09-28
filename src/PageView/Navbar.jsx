import React from 'react';
import {
  Link,
} from 'react-router-dom';
import '../App.scss';

export default function NavBar() {
  return (
    <div>
      <button type="button" className="Module-menu Module"><Link className="Options" to="/Menu">Menú</Link></button>
      <button type="button" className="Module-orders Module"><Link className="Options" to="/Orders">Ordenes</Link></button>
      <button type="button" className="Btn-logOut"><Link className="Options" to="/">Salir</Link></button>
    </div>
  );
}
