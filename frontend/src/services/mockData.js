const today = new Date();
const daysAgo = (d) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - d);
  return dt.toISOString().split('T')[0];
};

export const MOCK_TYPES = [
  { id: 1, name: 'Electrical' },
  { id: 2, name: 'Mechanical' },
  { id: 3, name: 'HVAC' },
  { id: 4, name: 'IT Equipment' },
  { id: 5, name: 'Safety' },
];

export const MOCK_EQUIPMENT = [
  { id: 1, name: 'Air Compressor Unit A',     typeId: 2, status: 'Active',           lastCleanedDate: daysAgo(5)  },
  { id: 2, name: 'HVAC Controller North Wing', typeId: 3, status: 'Active',           lastCleanedDate: daysAgo(12) },
  { id: 3, name: 'Server Rack R-04',           typeId: 4, status: 'Inactive',         lastCleanedDate: daysAgo(45) },
  { id: 4, name: 'Fire Suppression Panel',     typeId: 5, status: 'Under Maintenance',lastCleanedDate: daysAgo(20) },
  { id: 5, name: 'Main Electrical Panel',      typeId: 1, status: 'Active',           lastCleanedDate: daysAgo(8)  },
];

export const MOCK_MAINTENANCE = [
  { id: 1, equipmentId: 1, maintenanceDate: daysAgo(5),  notes: 'Replaced air filter, lubricated bearings.',         performedBy: 'John Smith'    },
  { id: 2, equipmentId: 2, maintenanceDate: daysAgo(12), notes: 'Calibrated thermostat, cleaned coils.',              performedBy: 'Maria Garcia'  },
  { id: 3, equipmentId: 5, maintenanceDate: daysAgo(8),  notes: 'Inspected circuit breakers, tested connections.',    performedBy: 'David Lee'     },
  { id: 4, equipmentId: 4, maintenanceDate: daysAgo(20), notes: 'Routine inspection of sprinkler heads.',             performedBy: 'Sarah Johnson' },
];
