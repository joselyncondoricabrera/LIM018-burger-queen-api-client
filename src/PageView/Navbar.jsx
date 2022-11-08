/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import '../PageStyle/Menu.scss';

export default function NavBar(props) {
  const navigate = useNavigate();

  const changeModuleMenu = () => {
    navigate('/Menu');
  };

  const changeModuleOrders = (e) => {
    e.preventDefault();
    navigate('/Orders');
  };

  return (
    <div className="Container-navbar">
      <button type="button" className={props.estilosMenu} onClick={() => changeModuleMenu()}>Menú</button>
      <button type="button" className={props.estilosOrden} onClick={(e) => changeModuleOrders(e)}>Ordenes</button>
      <button type="button" className="Btn-logOut" onClick={() => { navigate('/'); }}>Salir</button>
    </div>
  );
}
