import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentBox from "./AppointmentBox";
import AppointmentForm from "./AppointmentForm";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [editAppointment, setEditAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get("http://localhost:5000/appointments")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch appointments");
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmed) return;

    axios
      .delete(`http://localhost:5000/appointments/${id}`)
      .then((res) => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete appointment");
      });
  };

  const handleUpdate = async (id, updatedAppointment) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/appointments/${id}`,
        updatedAppointment
      );
      console.log("Appointment updated:", response.data);
      setEditAppointment(null);
      fetchAppointments();
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  const handleEdit = (id) => {
    const appointmentToEdit = appointments.find(
      (appointment) => appointment._id === id
    );
    if (!appointmentToEdit) {
      console.error(`Appointment with ID ${id} not found`);
      return;
    }
    setEditAppointment(appointmentToEdit);
  };

  const handleComplete = (id) => {
    alert("Take care, Stay healthy");
    axios
      .delete(`http://localhost:5000/appointments/${id}`)
      .then((res) => {
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to delete appointment");
      });
  };

  const handleAddAppointment = (newAppointment) => {
    axios
      .post("http://localhost:5000/appointments", newAppointment)
      .then((res) => {
        fetchAppointments(); // Fetch appointments again after adding new appointment
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      {error && <div>Error: {error}</div>}
      {editAppointment ? (
        // Render AppointmentForm for editing if editAppointment is not null
        <AppointmentForm
          appointmentData={editAppointment}
          onAppointmentUpdate={handleUpdate}
          onAppointmentAdd={handleAddAppointment}
          // Pass handleUpdate function to AppointmentForm
        />
      ) : (
        // Render AppointmentBox for each appointment
        appointments.map((appointment) => (
          <AppointmentBox
            key={appointment._id}
            appointment={appointment}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onEdit={handleEdit} // Pass handleEdit function to AppointmentBox
          />
        ))
      )}
    </div>
  );
};

export default AppointmentsList;
