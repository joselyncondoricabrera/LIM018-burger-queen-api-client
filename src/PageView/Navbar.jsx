import React, { useState } from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import '../PageStyle/Menu.scss';

export default function NavBar() {
  const navigate = useNavigate();
  // activar botones del navbar
  const [moduleMenu, setModuleMenu] = useState('Module-menu-activated');
  const [moduleOrders, setModuleOrders] = useState('Module-orders');

  const changeModuleMenu = () => {
    setModuleMenu('Module-menu-activated');
    setModuleOrders('Module-orders');
    navigate('/Menu');
  };

  const changeModuleOrders = (e) => {
    e.preventDefault();
    setModuleOrders('Module-orders-activated');
    setModuleMenu('Module-menu');
    navigate('/Orders');
  };

  return (
    <div>
      <button type="button" className={moduleMenu} onClick={() => changeModuleMenu()}>Menú</button>
      <button type="button" className={moduleOrders} onClick={(e) => changeModuleOrders(e)}>Ordenes</button>
      <button type="button" className="Btn-logOut" onClick={() => { navigate('/'); }}>Salir</button>
    </div>
  );
}
