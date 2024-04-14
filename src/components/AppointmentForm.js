import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppointmentForm = ({ appointmentData, onAppointmentAdd }) => {
  const initialDate =
    appointmentData && appointmentData.date ? appointmentData.date : "";
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(
    appointmentData && appointmentData.time ? appointmentData.time : ""
  );
  const [description, setDescription] = useState(
    appointmentData && appointmentData.description
      ? appointmentData.description
      : ""
  );
  const [doctorName, setDoctorName] = useState(
    appointmentData && appointmentData.doctorName
      ? appointmentData.doctorName
      : ""
  );
  const [department, setDepartment] = useState(
    appointmentData && appointmentData.department
      ? appointmentData.department
      : ""
  );
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = { date, time, description, doctorName, department };

    axios
      .post("http://localhost:5000/appointments", newAppointment)
      .then((res) => {
        setSuccessMessage("Appointment scheduled successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 3000);

        // Call onAppointmentAdd function to add the new appointment to the list
        onAppointmentAdd(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>
        {appointmentData && appointmentData._id
          ? "Edit Appointment"
          : "Schedule New Appointment"}
      </h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Doctor's Name:</label>
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          required
        />
        <label>Department:</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          <option value="General">General</option>
          <option value="Surgery">Surgery</option>
          <option value="Radiology">Radiology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Gynaecology">Gynaecology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="ENT">ENT</option>
          <option value="Dental">Dental</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">
          {appointmentData && appointmentData._id
            ? "Update Appointment"
            : "Schedule Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
