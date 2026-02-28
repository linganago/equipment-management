import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// ─── Equipment ────────────────────────────────────────────────────────────────
export const getAllEquipment = () => api.get('/equipment');
export const createEquipment = (data) => api.post('/equipment', data);
export const updateEquipment = (id, data) => api.put(`/equipment/${id}`, data);
export const deleteEquipment = (id) => api.delete(`/equipment/${id}`);

// ─── Equipment Types ──────────────────────────────────────────────────────────
export const getEquipmentTypes = () => api.get('/equipment-types');

// ─── Maintenance ──────────────────────────────────────────────────────────────
export const addMaintenanceLog = (data) => api.post('/maintenance', data);
export const getMaintenanceByEquipment = (equipmentId) =>
  api.get(`/equipment/${equipmentId}/maintenance`);

// ─── Error helper ─────────────────────────────────────────────────────────────
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data) return String(error.response.data);
  return error.message || 'Something went wrong';
};

export default api;
