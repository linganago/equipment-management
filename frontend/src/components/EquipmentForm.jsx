import React, { useState } from 'react';
import { validateActiveStatus, daysSince, todayStr } from '../utils/helpers';

export default function EquipmentForm({ initialData, onSave, onClose, types }) {
  const isEdit = !!initialData?.id;

  const [form, setForm] = useState({
    name:            initialData?.name            || '',
    typeId:          initialData?.typeId           || '',
    status:          initialData?.status           || 'Inactive',
    lastCleanedDate: initialData?.lastCleanedDate  || '',
  });
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState('');
  const [loading,  setLoading]  = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name   = 'Name is required';
    if (!form.typeId)        e.typeId  = 'Type is required';
    if (!form.status)        e.status  = 'Status is required';
    const activeErr = validateActiveStatus(form.status, form.lastCleanedDate);
    if (activeErr)           e.status  = activeErr;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await onSave({ ...form, typeId: parseInt(form.typeId), id: initialData?.id });
    } catch (err) {
      setApiError(err.message || 'Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const days  = daysSince(form.lastCleanedDate);
  const hint  = !form.lastCleanedDate ? '' : days === 0 ? 'Today' : `${days} day${days !== 1 ? 's' : ''} ago`;
  const hintColor = days > 30 ? 'var(--amber)' : 'var(--green)';

  return (
    <>
      <div className="modal-header">
        <div>
          <div className="modal-title">{isEdit ? 'Edit Equipment' : 'Add New Equipment'}</div>
          <div className="modal-sub">{isEdit ? `Updating: ${initialData.name}` : 'Fill in the details below'}</div>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>

      <div className="modal-body">
        {apiError && <div className="alert alert-error">⚠️ {apiError}</div>}

        <div className="form-grid">
          {/* Name */}
          <div className="input-group form-full">
            <label className="input-label">Equipment Name *</label>
            <input
              className="input"
              placeholder="e.g. Air Compressor Unit A"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          {/* Type */}
          <div className="input-group">
            <label className="input-label">Equipment Type *</label>
            <select className="input" value={form.typeId} onChange={(e) => set('typeId', e.target.value)}>
              <option value="">Select type...</option>
              {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            {errors.typeId && <span className="field-error">{errors.typeId}</span>}
          </div>

          {/* Status */}
          <div className="input-group">
            <label className="input-label">Status *</label>
            <select className="input" value={form.status} onChange={(e) => set('status', e.target.value)}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
            {errors.status && <span className="field-error">{errors.status}</span>}
          </div>

          {/* Last Cleaned Date */}
          <div className="input-group form-full">
            <label className="input-label">Last Cleaned Date</label>
            <input
              type="date"
              className="input"
              value={form.lastCleanedDate}
              max={todayStr()}
              onChange={(e) => set('lastCleanedDate', e.target.value)}
            />
            {hint && (
              <span className="field-hint" style={{ color: hintColor }}>
                {hint}{days > 30 ? ' — ⚠️ Cannot set Active' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Equipment'}
        </button>
      </div>
    </>
  );
}
