const API_BASE_URL = "http://localhost:8080/api";

export const fetchPatients = async () => {
  const response = await fetch(`${API_BASE_URL}/patients`);

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
};

export const fetchDoctors = async () => {
  const response = await fetch(`${API_BASE_URL}/doctors`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
};

export const fetchAppointments = async () => {
  const response = await fetch(`${API_BASE_URL}/appointments`);

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return response.json();
};

export const fetchMedicalRecords = async () => {
  const response = await fetch(`${API_BASE_URL}/medical-records`);

  if (!response.ok) {
    throw new Error("Failed to fetch medical records");
  }

  return response.json();
};

export const fetchPrescriptions = async () => {
  const response = await fetch(`${API_BASE_URL}/prescriptions`);

  if (!response.ok) {
    throw new Error("Failed to fetch prescriptions");
  }

  return response.json();
};

export const fetchBills = async () => {
  const response = await fetch(`${API_BASE_URL}/bills`);

  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }

  return response.json();
};


// ==========================================
// UPDATE APPOINTMENT STATUS
// ==========================================

export const updateAppointmentStatus = async (
  appointmentId,
  status
) => {
  const response = await fetch(
    `${API_BASE_URL}/appointments/${appointmentId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update appointment status");
  }

  return response.json();
};


// ==========================================
// UPDATE BILL STATUS
// ==========================================

export const updateBillStatus = async (
  billId,
  status
) => {
  const response = await fetch(
    `${API_BASE_URL}/bills/${billId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update bill status");
  }

  return response.json();
};