import React, { useMemo } from 'react';
import StatusBadge from '../components/StatusBadge';
import { formatDate, daysSince } from '../utils/helpers';
import './EquipmentPage.css';

export default function EquipmentPage({
  equipment, maintenance, types,
  search, setSearch,
  filterStatus, setFilterStatus,
  filterType, setFilterType,
  onAdd, onEdit, onDelete, onViewMaintenance,
}) {
  const today = new Date();

  const filtered = useMemo(() => equipment.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchType   = filterType   === 'all' || e.typeId === parseInt(filterType);
    return matchSearch && matchStatus && matchType;
  }), [equipment, search, filterStatus, filterType]);

  const stats = useMemo(() => ({
    total:       equipment.length,
    active:      equipment.filter((e) => e.status === 'Active').length,
    maintenance: equipment.filter((e) => e.status === 'Under Maintenance').length,
    overdue:     equipment.filter((e) => daysSince(e.lastCleanedDate) > 30).length,
  }), [equipment]);

  const getTypeName = (typeId) => types.find((t) => t.id === typeId)?.name || '—';

  return (
    <>
      {/* Stats */}
      <div className="stats-row">
        {[
          ['Total Equipment',    stats.total,       'All registered', 'var(--accent)'],
          ['Active',             stats.active,      'Operational',    'var(--green)' ],
          ['Under Maintenance',  stats.maintenance, 'Being serviced', 'var(--amber)' ],
          ['Overdue Cleaning',   stats.overdue,     '> 30 days',      'var(--red)'   ],
        ].map(([label, val, note, color]) => (
          <div key={label} className="stat-card" style={{ borderTop: `2px solid ${color}` }}>
            <div className="stat-label">{label}</div>
            <div className="stat-value" style={{ color }}>{val}</div>
            <div className="stat-note">{note}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="input"
              placeholder="Search equipment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input"
            style={{ width: 'auto', minWidth: '140px' }}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            {types.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          {(search || filterStatus !== 'all' || filterType !== 'all') && (
            <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setFilterStatus('all'); setFilterType('all'); }}>
              ✕ Clear
            </button>
          )}
        </div>
        <button className="btn btn-primary" onClick={onAdd}>+ Add Equipment</button>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Last Cleaned</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6">
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-text">No equipment found</div>
                    <div className="empty-sub">Try adjusting your search or filters</div>
                  </div>
                </td></tr>
              ) : filtered.map((eq) => {
                const days    = daysSince(eq.lastCleanedDate);
                const overdue = days > 30;
                const logs    = maintenance.filter((m) => m.equipmentId === eq.id).length;
                return (
                  <tr key={eq.id}>
                    <td>
                      <div className="eq-name">{eq.name}</div>
                      <div className="eq-meta">ID #{eq.id} · {logs} maintenance log{logs !== 1 ? 's' : ''}</div>
                    </td>
                    <td><span className="chip">{getTypeName(eq.typeId)}</span></td>
                    <td><StatusBadge status={eq.status} /></td>
                    <td>{formatDate(eq.lastCleanedDate)}</td>
                    <td>
                      <span className="age-chip" style={{ color: overdue ? 'var(--red)' : days > 20 ? 'var(--amber)' : 'var(--green)' }}>
                        {days === Infinity ? 'Never' : `${days}d`}{overdue ? ' ⚠️' : ''}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-ghost btn-sm btn-icon" title="View Maintenance" onClick={() => onViewMaintenance(eq)}>🔧</button>
                        <button className="btn btn-ghost btn-sm btn-icon" title="Edit"             onClick={() => onEdit(eq)}>✏️</button>
                        <button className="btn btn-danger btn-sm btn-icon" title="Delete"          onClick={() => onDelete(eq)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span className="table-count">Showing {filtered.length} of {equipment.length} equipment</span>
          <span className="chip">
            Updated: {today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </>
  );
}
