import React from 'react';
import './Toast.css';

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <span className="toast-icon">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <div>
            <div className="toast-text">{t.message}</div>
            {t.sub && <div className="toast-sub">{t.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
