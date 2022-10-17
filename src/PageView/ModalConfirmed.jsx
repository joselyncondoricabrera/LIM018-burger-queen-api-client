import React, { useState } from 'react';
import '../PageStyle/Modals.scss';

export default function ModalConfirmed() {
  const [changeStyle, setChangeStyle] = useState('Container-modal');
  // cambiar css para ocultar modal

  const hiddenModal = () => {
    setChangeStyle('Hidden-modal');
  };

  return (
    <div className={changeStyle}>
      <div className="Modal-confirmed">
        <h1 className="Mesage-modal"> Envío de orden correcto!!!</h1>
        <button type="button" className="Btn-accept-modal" onClick={hiddenModal}>Aceptar</button>
      </div>
    </div>
  );
}
