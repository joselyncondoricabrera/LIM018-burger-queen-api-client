import React from 'react';
import '../App.scss';
import NavBar from './Navbar';

export default function Orders() {
  return (
    <div className="Background-menu">
      <NavBar />
      <div className="Background-image">
        <h2 className="Title">Lista de ordenes</h2>
      </div>
    </div>
  );
}
