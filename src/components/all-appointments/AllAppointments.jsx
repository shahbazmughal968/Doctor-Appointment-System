import { useState, useEffect } from "react";
import classes from "./AllApointment.module.css";
import profile from '../../profile.png'

const AllAppointments = () => {
  // code for  the declaration of use States start from here
  const [appointmentList, setAppointmentList] = useState([]);
  const [pendingApointment, setPendingApointment] = useState([]);
  const [doneApointment, setDoneApointment] = useState([]);
  // code for  the declaration of use States end's from here

  // code for  getting appointments data start from here
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
  // code for  getting appointments data end's from here


  // code for  useEffect to get appointment  data on every refresh start from here
  useEffect(() => {
    listOfAppointments();
  });
  // code for  useEffect to get appointment  data on every refresh end's from here



  return (
    <>

      <h1 className={`text-center shadow rounded-pill  text-light w-25 m-auto p-3 my-3 ${classes.bg}`}>
        All Appointment
      </h1>

  {/* // code for  display appointments status start from here */}
      <div className="row w-50 m-auto">
        <div className={`col-4 w-auto shadow rounded-pill text-light mx-2 ${classes.bg}`}>
          <span className="fw-bold fs-5">Total Appointments :</span>
          <span className="fs-5">{appointmentList.length}</span>
        </div>
        <div className={`col-4  w-auto shadow rounded-pill text-light mx-2 ${classes.bg}`}>
          <span className="fw-bold fs-5">Total Pending Appointments :</span>
          <span className="fs-5">{pendingApointment}</span>
        </div>
        <div className={`col-4  w-auto shadow rounded-pill text-light mx-2 ${classes.bg}`}>
          <span className="fw-bold fs-5">Total Done Appointments :</span>
          <span className="fs-5">{doneApointment}</span>
        </div>
      </div>
  {/* // code for  display appointments status end's from here */}


  {/* // code for  display all  appointments data start from here */}

      <div className="w-75 m-auto">
        {appointmentList.map((item) => (
          <span
            key={item.id}
            className={`card p-4 shadow text-light  ${classes.listCard}`}
          >
            <span>
              <p className={`fw-bold  shadow rounded-pill text-light p-2 text-center ${classes.bg}`}>
                Appointment with Doctor {item.doctor_name}
              </p>
              <br />
              <span>
            <span className={`fw-bold ${classes.imageSpan}`}>
              <img src={profile} alt="" />
            </span>
          </span>
              <span className="fw-bold ">Patient Name: </span>
              {item.patient_name}
            </span>
            <br />
            <span>
              <span className="fw-bold ">Patient Age: </span>
              {item.patient_age}
            </span>
            <br />
            <span>
              <span className="fw-bold ">Appointment Date: </span>
              {item.appointment_Date}
            </span>
          </span>
        ))}
      </div>
  {/* // code for  display all  appointments data end's from here */}

    </>
  );
};
export default AllAppointments;
