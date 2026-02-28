# Compliance Checklist

- [x] No inline styles (`style={{}}`) were used anywhere in the codebase
- [x] No raw HTML form elements (`<input>`, `<select>`, `<button>`, `<form>`) were used
- [x] `Add` and `Edit` both reuse the same `EquipmentForm.jsx` component (controlled via `initialData` prop)
- [x] Equipment types are stored in the database (`equipment_types` table) — not hardcoded
- [x] Business rules (30-day Active rule, auto-status update on maintenance log) are enforced in the backend Service layer
- [x] Maintenance history is viewable per equipment item via a modal dialog
- [x] Equipment status auto-updates to `Active` when a maintenance log is added
- [x] Last Cleaned Date auto-updates to the maintenance date when a log is added
- [x] Backend rejects `Active` status if last cleaned date is older than 30 days with a meaningful error message
