-- Equipment Management System - PostgreSQL Schema

CREATE TABLE equipment_types (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE equipment (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(200) NOT NULL,
  type_id           INT REFERENCES equipment_types(id),
  status            VARCHAR(50) CHECK (status IN ('Active', 'Inactive', 'Under Maintenance')),
  last_cleaned_date DATE
);

CREATE TABLE maintenance_logs (
  id               SERIAL PRIMARY KEY,
  equipment_id     INT REFERENCES equipment(id) ON DELETE CASCADE,
  maintenance_date DATE NOT NULL,
  notes            TEXT,
  performed_by     VARCHAR(200) NOT NULL
);

-- Seed equipment types
INSERT INTO equipment_types (name) VALUES
  ('Electrical'),
  ('Mechanical'),
  ('HVAC'),
  ('IT Equipment'),
  ('Safety');
