import React from "react";
import "./AppointmentBox.css";

const AppointmentBox = ({ appointment, onDelete, onUpdate, onComplete }) => {
  const { _id, date, time, description, doctorName, department } = appointment;

  return (
    <div className="appointment-box">
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Description: {description}</p>
      <p>Doctor's Name: {doctorName}</p>
      <p>Department: {department}</p>
      <button onClick={() => onComplete(_id)}>🗹 Done</button>
      <button onClick={() => onUpdate(_id)}>📝Edit</button>
      <button onClick={() => onDelete(_id)}>❌Delete</button>
    </div>
  );
};

export default AppointmentBox;
