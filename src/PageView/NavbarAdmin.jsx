import React, { useState } from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import '../PageStyle/Menu.scss';

export default function NavBarAdmin() {
  const navigate = useNavigate();
  // activar botones del navbar
  const [moduleUsers, setModuleUsers] = useState('Module-activated');
  const [moduleProducts, setModuleProducts] = useState('Module-inactivated');

  const changeModuleUsers = () => {
    setModuleUsers('Module-activated');
    setModuleProducts('Module-inactivated');
    navigate('/Users');
  };

  const changeModuleProducts = (e) => {
    e.preventDefault();
    setModuleProducts('Module-activated');
    setModuleUsers('Module-inactivated');
    navigate('/Products');
  };

  return (
    <div>
      <button type="button" className={moduleUsers} onClick={() => changeModuleUsers()}>Usuarios</button>
      <button type="button" className={moduleProducts} onClick={(e) => changeModuleProducts(e)}>Productos</button>
      <button type="button" className="Btn-logOut" onClick={() => { navigate('/'); }}>Salir</button>
    </div>
  );
}
