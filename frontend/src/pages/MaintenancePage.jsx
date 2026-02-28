import React from 'react';
import { formatDate } from '../utils/helpers';

export default function MaintenancePage({ maintenance, equipment, types }) {
  const sorted = [...maintenance].sort((a, b) => new Date(b.maintenanceDate) - new Date(a.maintenanceDate));
  const getTypeName = (typeId) => types.find((t) => t.id === typeId)?.name || '—';

  return (
    <>
      <div className="page-header">
        <div className="page-title">All Maintenance Logs</div>
        <div className="page-desc">Complete history across all equipment</div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Date</th>
              <th>Performed By</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan="4">
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <div className="empty-text">No maintenance logs yet</div>
                  <div className="empty-sub">Logs will appear here when added from the Equipment view</div>
                </div>
              </td></tr>
            ) : sorted.map((log) => {
              const eq = equipment.find((e) => e.id === log.equipmentId);
              return (
                <tr key={log.id}>
                  <td>
                    <div style={{ fontWeight: '600' }}>{eq?.name || 'Deleted equipment'}</div>
                    {eq && <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{getTypeName(eq.typeId)}</div>}
                  </td>
                  <td><span className="chip">{formatDate(log.maintenanceDate)}</span></td>
                  <td style={{ color: 'var(--accent2)', fontWeight: '500' }}>{log.performedBy}</td>
                  <td style={{ color: 'var(--text2)', maxWidth: '300px' }}>
                    {log.notes || <em style={{ color: 'var(--text3)' }}>No notes</em>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-footer">
          <span className="table-count">{maintenance.length} total log{maintenance.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </>
  );
}
