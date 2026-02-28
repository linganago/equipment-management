import React from 'react';
import './Modal.css';

export default function Modal({ children, onClose, large = false }) {
  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal ${large ? 'modal-lg' : ''}`}>
        {children}
      </div>
    </div>
  );
}
