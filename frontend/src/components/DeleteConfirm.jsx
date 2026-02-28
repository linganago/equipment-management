import React from 'react';

export default function DeleteConfirm({ equipment, onConfirm, onClose }) {
  return (
    <>
      <div className="modal-header">
        <div><div className="modal-title">Delete Equipment</div></div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
      <div className="modal-body">
        <div className="alert alert-error">⚠️ This action cannot be undone.</div>
        <p style={{ fontSize: '13px', color: 'var(--text2)' }}>
          Are you sure you want to delete{' '}
          <strong style={{ color: 'var(--text)' }}>{equipment.name}</strong>?
          All associated maintenance records will also be deleted.
        </p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-ghost"  onClick={onClose}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>Delete Equipment</button>
      </div>
    </>
  );
}
