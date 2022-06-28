import classes from "./BookAppointment.module.css";
import useInput from "../../hooks/CustomHook";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookAppointment = (props) => {
  const navigate=useNavigate();
  var fees=Number(props.doctorData.fee);
const [patientCount,setPatientCount]=useState(true);
const [pendingPatients,setPendingpatients]=useState('');
const [doneApointment, setDoneApointment] = useState([]);
var done=Number(doneApointment);
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

  const appointment_count = async() =>{
    const response =await fetch('https://react-app-7bde4-default-rtdb.firebaseio.com/appointment.json');
    const data =await response.json();
    let loadedData = [];
    for(const key in data)
    {
        loadedData.push({
            id:key,
            patient_name:data[key].patient_name,
            patient_age:data[key].patient_Age,
            appointment_Date:data[key].appointment_Date,
            appointment_status:data[key].appointment_status,
            doctor_id:data[key].doctor_id,
            doctor_name:data[key].doctor_name,
        })
    }
    const matchData=loadedData.filter((user)=> user.doctor_id === props.doctorData.id && user.appointment_status==='Pending');
    const appointmentDoneCount = loadedData.filter((count)=>count.appointment_status === 'Done' && count.doctor_id === props.doctorData.id)
    setPendingpatients(matchData.length);
    setDoneApointment(appointmentDoneCount.length);
   
    if(matchData.length === 2 || matchData.length > 2)
    {
setPatientCount(false);

    }
  }
  useEffect(()=>{
    appointment_count();
  })



  const onFormSubmithandler = async (event) => {
    event.preventDefault();
    const response =await fetch('https://react-app-7bde4-default-rtdb.firebaseio.com/appointment.json');
    const data =await response.json();
    let loadedData = [];
    for(const key in data)
    {
        loadedData.push({
            id:key,
            patient_name:data[key].patient_name,
            patient_age:data[key].patient_Age,
            appointment_Date:data[key].appointment_Date,
            appointment_status:data[key].appointment_status,
            doctor_id:data[key].doctor_id,
            doctor_name:data[key].doctor_name,
        })
    }
    const matchData= loadedData.filter((patient)=>patient.patient_name === enteredName);
    if(matchData.length > 0)
    {
        alert('Dear Patient you already have appointment with doctor ' + matchData[0].doctor_name + " on " + matchData[0].appointment_Date);
        resetNameInput('');
        resetAgeInput('');
        resetDateInput('')
    }
    else{
        if(!enteredNameIsValid || !enteredAgeIsValid || !enteredDateIsValid)
        {
            alert('Please fill all required patient data');
            
        }
        else{
            fetch(
                "https://react-app-7bde4-default-rtdb.firebaseio.com/appointment.json",
                {
                  method: "POST",
                  headers: { "Content-Type": "application.json" },
                  body: JSON.stringify({
                    patient_name:enteredName,
                    patient_Age:enteredAge,
                    appointment_Date:enteredDate,
                    appointment_status:'Pending',
                    doctor_id:props.doctorData.id,
                    doctor_name:props.doctorData.name,
                    
                  }),
                }
              );
              navigate("../all-appointments", { replace: true });        
              resetNameInput('');
              resetAgeInput('');
              resetDateInput('')
        }
    }
    
   

  };
  return (
    <>
      <h1 className="text-center my-3 text-light">
        Book Your Appointment With Doctor {props.doctorData.name}
      </h1>
      <div className="row w-50 m-auto mb-5 d-flex justify-content-center">
        <div className="col-3 text-center w-auto  rounded-pill text-light shadow ">
          <p className="fw-bold fs-5 d-inline">Email :</p>
          <p className="d-inline">{props.doctorData.email}</p>
        </div>
        <div className="col-3 text-center w-auto  rounded-pill text-light shadow ">
          <p className="fw-bold fs-5 d-inline">Speciality :</p>
          <p className="d-inline">{props.doctorData.speciality}</p>
        </div>
        <div className="col-3 text-center w-auto  rounded-pill text-light shadow ">
          <p className="fw-bold fs-5 d-inline">Fee :</p>
          <p className="d-inline">{props.doctorData.fee}</p>
        </div> 
        <div className="col-3 text-center w-auto  rounded-pill text-light shadow ">
          <p className="fw-bold fs-5 d-inline">Pending Patients :</p>
          <p className="d-inline">{pendingPatients}</p>
        </div>
        <div className="col-3 text-center w-auto  rounded-pill text-light shadow">
          <p className="fw-bold fs-5 d-inline">Total Earning :</p>
          <p className="d-inline">{Number(doneApointment) * Number(props.doctorData.fee)}</p>
        </div>
      </div>

    {patientCount &&  <form
        className={`w-25 m-auto card p-3 shadow ${classes.bg}`}
        onSubmit={onFormSubmithandler}
      >
        <h2 className="m-auto mb-3 text-light">Patient Appointment Form</h2>
        <input
          className="w-75 m-auto p-3 mb-3 rounded-pill shadow border"
          type="text"
          placeholder="Name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        <input
          className="w-75 m-auto p-3 mb-3 rounded-pill shadow border"
          type="number"
          placeholder="Age"
          value={enteredAge}
          onChange={ageChangeHandler}
          onBlur={ageBlurHandler}
        />
        <input
          className="w-75 m-auto p-3 mb-3 rounded-pill shadow border"
          type="date"
          placeholder="Age"
          value={enteredDate}
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
        />
        <button
          className="btn shadow w-75 m-auto fs-5 fw-bold text-light rounded-pill shadow border mb-3"
          type="submit"
        >
          Submit
        </button>
      </form>}
     {!patientCount && <h1 className="text-center border border-dark rounded-pill bg-dark text-light w-50 m-auto p-3">Patient Count is Full</h1>}
    </>
  );
};
export default BookAppointment;
