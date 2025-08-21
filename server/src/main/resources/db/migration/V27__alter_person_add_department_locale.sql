-- Add department_name and locale to persons
ALTER TABLE persons
ADD COLUMN IF NOT EXISTS department_name VARCHAR(100) NULL AFTER phone_number,
ADD COLUMN IF NOT EXISTS locale VARCHAR(8) NULL AFTER department_name;

CREATE INDEX IF NOT EXISTS ix_person_department ON persons (department_name);

CREATE INDEX IF NOT EXISTS ix_person_locale ON persons (locale);