import React from "react";
import "./App.css";
import AppointmentsList from "./components/AppointmentsList";
import AppointmentForm from "./components/AppointmentForm";

function App() {
  return (
    <div className="App">
      <h1>Appointment scheduling system for Elderly</h1>
      <AppointmentForm />
      <AppointmentsList />
    </div>
  );
}

export default App;
