import React from 'react';
import './Sidebar.css';

export default function Sidebar({ activeNav, setActiveNav, filterStatus, setFilterStatus, overdueCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">⚙️</div>
          <div>
            <div className="logo-text">EMS</div>
            <div className="logo-sub">Equipment Manager</div>
          </div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Main</div>
        {[
          { key: 'equipment',   icon: '🗄️', label: 'Equipment'    },
          { key: 'maintenance', icon: '🔧', label: 'Maintenance'  },
        ].map(({ key, icon, label }) => (
          <div
            key={key}
            className={`nav-item ${activeNav === key ? 'active' : ''}`}
            onClick={() => setActiveNav(key)}
          >
            <span className="nav-icon">{icon}</span> {label}
          </div>
        ))}
      </div>

      <div className="nav-section" style={{ marginTop: '16px' }}>
        <div className="nav-label">Filter by Status</div>
        {[
          { val: 'all',               icon: '🔵', label: 'All'          },
          { val: 'Active',            icon: '🟢', label: 'Active'       },
          { val: 'Inactive',          icon: '⚫', label: 'Inactive'     },
          { val: 'Under Maintenance', icon: '🟡', label: 'Maintenance'  },
        ].map(({ val, icon, label }) => (
          <div
            key={val}
            className={`nav-item ${filterStatus === val ? 'active' : ''}`}
            onClick={() => { setFilterStatus(val); setActiveNav('equipment'); }}
          >
            <span className="nav-icon">{icon}</span> {label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '0 12px' }}>
        <div className="overdue-card">
          <div className="overdue-label">OVERDUE CLEANING</div>
          <div className="overdue-value">{overdueCount}</div>
          <div className="overdue-sub">&gt;30 days since last clean</div>
        </div>
      </div>
    </aside>
  );
}
