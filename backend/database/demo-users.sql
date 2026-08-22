USE hospital_db;

INSERT INTO patients
    (name, age, gender, phone, email, address, blood_group, date_of_birth)
SELECT
    'Test Patient', 30, 'Male', '9876543210', 'patient@test.com',
    'Hospital Address', 'O+', '1996-01-01'
WHERE NOT EXISTS (
    SELECT 1 FROM patients WHERE email = 'patient@test.com'
);

INSERT INTO users
    (email, password, role, patient_id)
SELECT
    'patient@test.com', 'Patient@123', 'Patient', patient_id
FROM patients
WHERE email = 'patient@test.com'
  AND NOT EXISTS (
      SELECT 1 FROM users WHERE email = 'patient@test.com'
  );

INSERT INTO users
    (email, password, role)
SELECT
    'admin@test.com', 'Admin@123', 'Admin'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'admin@test.com'
);

SELECT user_id, email, role, patient_id, doctor_id
FROM users
WHERE email IN ('admin@test.com', 'patient@test.com');
