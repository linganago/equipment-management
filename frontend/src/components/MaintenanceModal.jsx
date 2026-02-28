import React, { useState } from 'react';
import { formatDate, todayStr } from '../utils/helpers';

export default function MaintenanceModal({ equipment, maintenanceLogs, onClose, onAddLog }) {
  const logs = maintenanceLogs
    .filter((l) => l.equipmentId === equipment.id)
    .sort((a, b) => new Date(b.maintenanceDate) - new Date(a.maintenanceDate));

  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({ maintenanceDate: todayStr(), notes: '', performedBy: '' });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleAdd = async () => {
    const e = {};
    if (!form.maintenanceDate)      e.maintenanceDate = 'Date is required';
    if (!form.performedBy.trim())   e.performedBy     = 'Performed by is required';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      await onAddLog(equipment.id, form);
      setShowForm(false);
      setForm({ maintenanceDate: todayStr(), notes: '', performedBy: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-header">
        <div>
          <div className="modal-title">Maintenance History</div>
          <div className="modal-sub">{equipment.name}</div>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>

      <div className="modal-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text3)' }}>
            {logs.length} record{logs.length !== 1 ? 's' : ''}
          </span>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm((s) => !s)}>
            {showForm ? '— Cancel' : '+ Log Maintenance'}
          </button>
        </div>

        {showForm && (
          <div className="log-form-box">
            <div className="log-form-title">📋 New Maintenance Log</div>
            <div className="alert alert-info">
              ℹ️ Adding this log will automatically set status to <strong>Active</strong> and update last cleaned date.
            </div>
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label">Maintenance Date *</label>
                <input type="date" className="input" value={form.maintenanceDate} max={todayStr()} onChange={(e) => set('maintenanceDate', e.target.value)} />
                {errors.maintenanceDate && <span className="field-error">{errors.maintenanceDate}</span>}
              </div>
              <div className="input-group">
                <label className="input-label">Performed By *</label>
                <input className="input" placeholder="Technician name" value={form.performedBy} onChange={(e) => set('performedBy', e.target.value)} />
                {errors.performedBy && <span className="field-error">{errors.performedBy}</span>}
              </div>
              <div className="input-group form-full">
                <label className="input-label">Notes</label>
                <textarea className="input" rows={3} placeholder="Describe what was done..." value={form.notes} onChange={(e) => set('notes', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleAdd} disabled={loading}>
                {loading ? 'Saving...' : '✓ Add Log'}
              </button>
            </div>
          </div>
        )}

        {logs.length === 0 && !showForm ? (
          <div className="empty-state">
            <div className="empty-icon">🔧</div>
            <div className="empty-text">No maintenance records yet</div>
            <div className="empty-sub">Log the first maintenance event above</div>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="history-item">
              <div className="history-date">📅 {formatDate(log.maintenanceDate)}</div>
              <div className="history-notes">
                {log.notes || <em style={{ color: 'var(--text3)' }}>No notes recorded</em>}
              </div>
              <div className="history-by">👤 {log.performedBy}</div>
            </div>
          ))
        )}
      </div>

      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
      </div>
    </>
  );
}
