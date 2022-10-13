import React from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import '../App.scss';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <button type="button" className="Module-menu Module" onClick={() => { navigate('/Menu'); }}>Menú</button>
      <button type="button" className="Module-orders Module" onClick={() => { navigate('/Orders'); }}>Ordenes</button>
      <button type="button" className="Btn-logOut" onClick={() => { navigate('/'); }}>Salir</button>
    </div>
  );
}
