import React, { useState } from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import '../PageStyle/Menu.scss';

export default function NavBar() {
  const navigate = useNavigate();
  // activar botones del navbar
  const [moduleMenu, setModuleMenu] = useState('Module-activated');
  const [moduleOrders, setModuleOrders] = useState('Module-inactivated');

  const changeModuleMenu = () => {
    setModuleMenu('Module-activated');
    setModuleOrders('Module-inactivated');
    navigate('/Menu');
  };

  const changeModuleOrders = (e) => {
    e.preventDefault();
    setModuleOrders('Module-activated');
    setModuleMenu('Module-inactivated');
    navigate('/Orders');
  };

  return (
    <div className="Container-navbar">
      <button type="button" className={moduleMenu} onClick={() => changeModuleMenu()}>Menú</button>
      <button type="button" className={moduleOrders} onClick={(e) => changeModuleOrders(e)}>Ordenes</button>
      <button type="button" className="Btn-logOut" onClick={() => { navigate('/'); }}>Salir</button>
    </div>
  );
}
