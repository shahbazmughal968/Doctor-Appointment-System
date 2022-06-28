import { useState, useEffect } from "react";
import classes from "./AllApointment.module.css";
const AllAppointments = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [pendingApointment, setPendingApointment] = useState([]);
  const [doneApointment, setDoneApointment] = useState([]);

  const listOfAppointments = async () => {
    const response = await fetch(
      "https://react-app-7bde4-default-rtdb.firebaseio.com/appointment.json"
    );
    const data = await response.json();
    let loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        patient_name: data[key].patient_name,
        patient_age: data[key].patient_Age,
        appointment_Date: data[key].appointment_Date,
        appointment_status:data[key].appointment_status,
        doctor_id: data[key].doctor_id,
        doctor_name: data[key].doctor_name,
      });
    }
    const pendingAppointmentCount=loadedData.filter((count)=>count.appointment_status === 'Pending')
    const doneAppointmentCount=loadedData.filter((count)=>count.appointment_status === 'Done')
    setPendingApointment(pendingAppointmentCount.length);
    setDoneApointment(doneAppointmentCount.length);
    setAppointmentList(loadedData);
  };
  useEffect(() => {
    listOfAppointments();
  });
  return (
    <>
      <h1 className="text-center shadow rounded-pill  text-light w-25 m-auto p-3 my-3">
        All Appointment
      </h1>
      <div className="row w-50 m-auto">
        <div className="col-4 w-auto shadow rounded-pill text-light mx-2">
          <span className="fw-bold fs-5">Total Appointments :</span>
          <span className="fs-5">{appointmentList.length}</span>
        </div>
        <div className="col-4  w-auto shadow rounded-pill text-light mx-2">
          <span className="fw-bold fs-5">Total Pending Appointments :</span>
          <span className="fs-5">{pendingApointment}</span>
        </div>
        <div className="col-4  w-auto shadow rounded-pill text-light mx-2">
          <span className="fw-bold fs-5">Total Done Appointments :</span>
          <span className="fs-5">{doneApointment}</span>
        </div>
      </div>
      <div className="w-75 m-auto">
        {appointmentList.map((item) => (
          <span
            key={item.id}
            className={`card p-3 shadow  ${classes.listCard}`}
          >
            <span>
              <p className="fw-bold  shadow rounded-pill text-light p-2 text-center">
                Appointment with Doctor {item.doctor_name}
              </p>
              <br />
              <span className="fw-bold ">Patient Name: </span>
              {item.patient_name}
            </span>
            <br />
            <span>
              <span className="fw-bold ">Patient Name: </span>
              {item.patient_age}
            </span>
            <br />
            <span>
              <span className="fw-bold ">Patient Name: </span>
              {item.appointment_Date}
            </span>
          </span>
        ))}
      </div>
    </>
  );
};
export default AllAppointments;
