import React, { useState, useCallback } from 'react';
import './App.css';

import Sidebar          from './components/Sidebar';
import Modal            from './components/Modal';
import EquipmentForm    from './components/EquipmentForm';
import MaintenanceModal from './components/MaintenanceModal';
import DeleteConfirm    from './components/DeleteConfirm';
import ToastContainer   from './components/Toast';
import EquipmentPage    from './pages/EquipmentPage';
import MaintenancePage  from './pages/MaintenancePage';
import { useToast }     from './hooks/useToast';
import { MOCK_TYPES, MOCK_EQUIPMENT, MOCK_MAINTENANCE } from './services/mockData';

// To connect to Spring Boot backend: replace useState initial values
// with API calls from './services/api' and remove mock data imports.

let nextId     = 6;
let nextMaintId = 5;

export default function App() {
  const [equipment,   setEquipment]   = useState(MOCK_EQUIPMENT);
  const [maintenance, setMaintenance] = useState(MOCK_MAINTENANCE);
  const [types]                       = useState(MOCK_TYPES);

  const [modal,        setModal]        = useState(null);
  const [activeNav,    setActiveNav]    = useState('equipment');
  const [search,       setSearch]       = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType,   setFilterType]   = useState('all');

  const { toasts, showToast } = useToast();

  const closeModal = () => setModal(null);

  // ── Save (Add or Edit) ────────────────────────────────────────────────────
  const handleSaveEquipment = useCallback(async (data) => {
    if (data.id) {
      // Edit
      setEquipment((prev) => prev.map((e) => (e.id === data.id ? { ...e, ...data } : e)));
      showToast('Equipment updated', 'success', data.name);
    } else {
      // Add
      const newEq = { ...data, id: nextId++ };
      setEquipment((prev) => [...prev, newEq]);
      showToast('Equipment added', 'success', data.name);
    }
    closeModal();
  }, [showToast]);

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = useCallback((eq) => {
    setEquipment((prev)   => prev.filter((e) => e.id !== eq.id));
    setMaintenance((prev) => prev.filter((m) => m.equipmentId !== eq.id));
    showToast('Equipment deleted', 'success', eq.name);
    closeModal();
  }, [showToast]);

  // ── Add Maintenance Log ───────────────────────────────────────────────────
  const handleAddMaintenanceLog = useCallback((equipmentId, log) => {
    const newLog = { id: nextMaintId++, equipmentId, ...log };
    setMaintenance((prev) => [...prev, newLog]);

    // Business Rule: auto-set status=Active + update lastCleanedDate
    setEquipment((prev) =>
      prev.map((e) =>
        e.id === equipmentId
          ? { ...e, status: 'Active', lastCleanedDate: log.maintenanceDate }
          : e
      )
    );

    showToast('Maintenance logged', 'success', 'Status auto-set to Active');

    // Update modal so the re-opened view reflects the new status
    const updated = equipment.find((e) => e.id === equipmentId);
    setModal({
      type: 'maintenance',
      data: { ...updated, status: 'Active', lastCleanedDate: log.maintenanceDate },
    });
  }, [equipment, showToast]);

  // ── Top-bar subtitle ──────────────────────────────────────────────────────
  const topbarSub =
    activeNav === 'equipment'
      ? `${equipment.length} registered`
      : `${maintenance.length} total records`;

  return (
    <div className="app">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        overdueCount={equipment.filter((e) => {
          if (!e.lastCleanedDate) return true;
          const diff = new Date() - new Date(e.lastCleanedDate + 'T00:00:00');
          return Math.floor(diff / 86400000) > 30;
        }).length}
      />

      <main className="main">
        {/* Top bar */}
        <div className="topbar">
          <div>
            <div className="topbar-title">
              {activeNav === 'equipment' ? 'Equipment Registry' : 'Maintenance Logs'}
            </div>
            <div className="topbar-sub">{topbarSub}</div>
          </div>
          <span className="chip">
            🕐 {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        {/* Page content */}
        <div className="content">
          {activeNav === 'equipment' && (
            <EquipmentPage
              equipment={equipment}
              maintenance={maintenance}
              types={types}
              search={search}          setSearch={setSearch}
              filterStatus={filterStatus} setFilterStatus={setFilterStatus}
              filterType={filterType}  setFilterType={setFilterType}
              onAdd={()       => setModal({ type: 'form',        data: null })}
              onEdit={(eq)    => setModal({ type: 'form',        data: eq   })}
              onDelete={(eq)  => setModal({ type: 'delete',      data: eq   })}
              onViewMaintenance={(eq) => setModal({ type: 'maintenance', data: eq })}
            />
          )}
          {activeNav === 'maintenance' && (
            <MaintenancePage maintenance={maintenance} equipment={equipment} types={types} />
          )}
        </div>
      </main>

      {/* Modals */}
      {modal && (
        <Modal onClose={closeModal} large={modal.type === 'maintenance'}>
          {modal.type === 'form' && (
            <EquipmentForm
              initialData={modal.data}
              onSave={handleSaveEquipment}
              onClose={closeModal}
              types={types}
            />
          )}
          {modal.type === 'maintenance' && (
            <MaintenanceModal
              equipment={modal.data}
              maintenanceLogs={maintenance}
              onClose={closeModal}
              onAddLog={handleAddMaintenanceLog}
            />
          )}
          {modal.type === 'delete' && (
            <DeleteConfirm
              equipment={modal.data}
              onConfirm={() => handleDelete(modal.data)}
              onClose={closeModal}
            />
          )}
        </Modal>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  );
}