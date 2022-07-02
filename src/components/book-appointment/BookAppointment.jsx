import classes from "./BookAppointment.module.css";
import useInput from "../../hooks/CustomHook";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const BookAppointment = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  // code for  the declaration of use States start from here
  const [doctorData, setDoctorData] = useState([]);
  const [patientCount, setPatientCount] = useState(true);
  const [pendingPatients, setPendingpatients] = useState("");
  const [doneApointment, setDoneApointment] = useState([]);
  // code for  the declaration of use States end's from here

  // code for  the setting input fields start from here
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputhasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredAge,
    isValid: enteredAgeIsValid,
    hasError: ageInputhasError,
    inputChangeHandler: ageChangeHandler,
    inputBlurHandler: ageBlurHandler,
    reset: resetAgeInput,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputhasError,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
  } = useInput((value) => value.trim() !== "");
  // code for  the setting input fields end's from here

  // code for  the fetching doctor data and set in useState start from here
  const fetchDoctorData = async () => {
    const response = await fetch(
      "https://react-app-7bde4-default-rtdb.firebaseio.com/doctors.json"
    );
    const data = await response.json();

    let loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        name: data[key].name,
        age: data[key].age,
        email: data[key].email,
        speciality: data[key].speciality,
        fee: data[key].fee,
      });
    }
    const matchData = loadedData.filter((user) => user.id === params.doctorId);
    setDoctorData(matchData[0]);
  };
  // code for  the fetching doctor data and set in useState start from here

  // code for  the fetching appointments data for specfic doctor and set in useState start from here
  const appointment_count = async () => {
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
        appointment_status: data[key].appointment_status,
        doctor_id: data[key].doctor_id,
        doctor_name: data[key].doctor_name,
      });
    }
    const matchData = loadedData.filter(
      (user) =>
        user.doctor_id === params.doctorId &&
        user.appointment_status === "Pending"
    );
    const appointmentDoneCount = loadedData.filter(
      (count) =>
        count.appointment_status === "Done" &&
        count.doctor_id === params.doctorId
    );

    setPendingpatients(matchData.length);
    setDoneApointment(appointmentDoneCount.length);

    if (matchData.length === 2 || matchData.length > 2) {
      setPatientCount(false);
    }
  };
  // code for  the fetching appointments data for specfic doctor and set in useState end's from here

  // code for  useEffect to get doctor data and statues on every refresh start from here
  useEffect(() => {
    appointment_count();
    fetchDoctorData();
  });
  // code for  useEffect to get doctor data and statues on every refresh end's from here

  // code for  booking appointment start from here
  const onFormSubmithandler = async (event) => {
    event.preventDefault();
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
        appointment_status: data[key].appointment_status,
        doctor_id: data[key].doctor_id,
        doctor_name: data[key].doctor_name,
      });
    }
    const matchData = loadedData.filter(
      (patient) => patient.patient_name === enteredName && patient.appointment_status === "Pending"
    );
    if (matchData.length > 0) {
      alert(
        "Dear Patient you already have appointment with doctor " +
          matchData[0].doctor_name +
          " on " +
          matchData[0].appointment_Date
      );
      resetNameInput("");
      resetAgeInput("");
      resetDateInput("");
    } else {
      if (!enteredNameIsValid || !enteredAgeIsValid || !enteredDateIsValid) {
        alert("Please fill all required patient data");
      } else {
        fetch(
          "https://react-app-7bde4-default-rtdb.firebaseio.com/appointment.json",
          {
            method: "POST",
            headers: { "Content-Type": "application.json" },
            body: JSON.stringify({
              patient_name: enteredName,
              patient_Age: enteredAge,
              appointment_Date: enteredDate,
              appointment_status: "Pending",
              doctor_id: doctorData.id,
              doctor_name: doctorData.name,
            }),
          }
        );
        navigate("../all-appointments", { replace: true });
        resetNameInput("");
        resetAgeInput("");
        resetDateInput("");
      }
    }
  };
  // code for  booking appointment end's from here

  return (
    <>
      {/* // code for  display doctor data start from here */}

      <h1 className="text-center my-3 text-light">
        Book Your Appointment With Doctor {doctorData.name}
      </h1>
      <div className="row w-50 m-auto mb-5 d-flex justify-content-center">
        <div
          className={`col-3 text-center w-auto  rounded-pill text-light shadow ${classes.docInfoBg}`}
        >
          <p className="fw-bold fs-5 d-inline">Email :</p>
          <p className="d-inline">{doctorData.email}</p>
        </div>
        <div
          className={`col-3 text-center w-auto  rounded-pill text-light shadow ${classes.docInfoBg}`}
        >
          <p className="fw-bold fs-5 d-inline">Speciality :</p>
          <p className="d-inline">{doctorData.speciality}</p>
        </div>
        <div
          className={`col-3 text-center w-auto  rounded-pill text-light shadow ${classes.docInfoBg}`}
        >
          <p className="fw-bold fs-5 d-inline">Fee :</p>
          <p className="d-inline">{doctorData.fee}</p>
        </div>
        <div
          className={`col-3 text-center w-auto  rounded-pill text-light shadow ${classes.docInfoBg}`}
        >
          <p className="fw-bold fs-5 d-inline">Pending Patients :</p>
          <p className="d-inline">{pendingPatients}</p>
        </div>
        <div
          className={`col-3 text-center w-auto  rounded-pill text-light shadow ${classes.docInfoBg}`}
        >
          <p className="fw-bold fs-5 d-inline">Total Earning :</p>
          <p className="d-inline">
            {Number(doneApointment) * Number(doctorData.fee)}
          </p>
        </div>
      </div>
      {/* // code for  display doctor data end's from here */}

      {/* // code for  display appointment form start from here */}
      {patientCount && (
        <form
          className={`w-25 m-auto card p-3 shadow ${classes.bg}`}
          onSubmit={onFormSubmithandler}
        >
          <h2 className="m-auto mb-3 text-light">Patient Appointment Form</h2>
          <input
            className="w-75 m-auto p-3 mb-3 rounded-pill shadow "
            type="text"
            placeholder="Name"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputhasError && (
            <p className="text-danger w-75 m-auto">
              Please enter a patient name
            </p>
          )}
          <input
            className="w-75 m-auto p-3 mb-3 rounded-pill shadow "
            type="number"
            placeholder="Age"
            value={enteredAge}
            onChange={ageChangeHandler}
            onBlur={ageBlurHandler}
          />
          {ageInputhasError && (
            <p className="text-danger w-75 m-auto">
              Please enter a patient age
            </p>
          )}

          <input
            className="w-75 m-auto p-3 mb-3 rounded-pill shadow "
            type="date"
            placeholder="Age"
            value={enteredDate}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          {dateInputhasError && (
            <p className="text-danger w-75 m-auto">
              Please enter a appointment date
            </p>
          )}

          <button
            className="btn shadow w-75 m-auto fs-5 fw-bold text-light rounded-pill shadow  mb-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}

      {!patientCount && (
        <h1
          className={`text-center  rounded-pill shadow text-light w-50 m-auto p-3 ${classes.docInfoBg}`}
        >
          Patient Count is Full
        </h1>
      )}
      {/* // code for  display appointment form end's from here */}
    </>
  );
};
export default BookAppointment;
