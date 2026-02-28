import React from 'react';
import './StatusBadge.css';

export default function StatusBadge({ status }) {
  const cls =
    status === 'Active'            ? 'badge-active'      :
    status === 'Inactive'          ? 'badge-inactive'    :
    status === 'Under Maintenance' ? 'badge-maintenance' : '';

  return <span className={`badge ${cls}`}>{status}</span>;
}
