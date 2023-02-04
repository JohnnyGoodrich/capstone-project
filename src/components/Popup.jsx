import React from 'react';
import Popup from 'reactjs-popup';

const Modal = () => (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      {close=>(
        <div>
             
        </div>
      )} 
    </Popup>
  );
  export default Modal