import React from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import '../App.scss';

export default function NavBarChef() {
  const navigate = useNavigate();

  return (
    <div>
      <button type="button" className="Module-activated">Ordenes</button>
      <button type="button" className="Btn-logOut" onClick={() => { navigate('/'); }}>Salir</button>
    </div>
  );
}
