import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState([]);
  const [dermatologyCount, setDermatologyCount] = useState("");
  const [emergencyMedicineCount, setEmergencyMedicineCount] = useState("");
  const [familyMedicineCount, setFamilyMedicineCount] = useState("");
  const [heartSpecialistCount,setHeartSpecialistCount]=useState('');
  const [diagnosticRadiologyCount,setDiagnosticRadiologyCount]=useState('');
  const [clinicalImmunologyCount,setClinicalImmunologyCount]=useState('');
  const [cardiovascularCount,setCardiovascularCount]=useState('');
  const [gastroenterologyCount,setGastroenterologyCount]=useState('');
  const [generalInternalMedicineCount,setGeneralInternalMedicineCount]=useState('');
  const [generalSurgeryCount,setGeneralSurgeryCount]=useState(''); 






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
    setDoctorData(loadedData);
    const DermatologyCount = loadedData.filter(
      (user) => user.speciality === "Dermatology"
    );
    const EmergencyMedicineCount = loadedData.filter(
      (user) => user.speciality === "Emergency medicine"
    );
    const FamilyMedicineCount = loadedData.filter(
      (user) => user.speciality === "Family medicine"
    );
    const HeartSpecialistCount = loadedData.filter(
      (user) => user.speciality === "heart specialist"
    );
    const DiagnosticRadiologyCount = loadedData.filter(
      (user) => user.speciality === "Diagnostic Radiology"
    );
    const ClinicalImmunologyCount = loadedData.filter(
      (user) => user.speciality === "Clinical Immunology"
    );
    const CardiovascularCount = loadedData.filter(
      (user) => user.speciality === "Cardiovascular"
    );
    const GastroenterologyCount = loadedData.filter(
      (user) => user.speciality === "Gastroenterology"
    );
    const GeneralInternalMedicineCount = loadedData.filter(
      (user) => user.speciality === "General Internal Medicine"
    );
    const GeneralSurgeryCount = loadedData.filter(
      (user) => user.speciality === "General Surgery"
    );
    setDermatologyCount(DermatologyCount.length);
    setEmergencyMedicineCount(EmergencyMedicineCount.length);
    setFamilyMedicineCount(FamilyMedicineCount.length);
    setHeartSpecialistCount(HeartSpecialistCount.length);
    setDiagnosticRadiologyCount(DiagnosticRadiologyCount.length);
    setClinicalImmunologyCount(ClinicalImmunologyCount.length);
    setCardiovascularCount(CardiovascularCount.length)
    setGastroenterologyCount(GastroenterologyCount.length)
    setGeneralInternalMedicineCount(GeneralInternalMedicineCount.length)
    setGeneralSurgeryCount(GeneralSurgeryCount.length);
  };
  useEffect(() => {
    fetchDoctorData();
  });
  return (
    <>
      <div
        className=" row mx-3  
    my-3 d-flex justify-content-center py-2"
      >
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Dermatologist :</span>
          <span className="fs-5">{dermatologyCount}</span>
        </div>
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Emergency Medicine :</span>
          <span className="fs-5">{emergencyMedicineCount}</span>
        </div>

        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Family Medicine :</span>
          <span className="fs-5">{familyMedicineCount}</span>
        </div>
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Heart Specialist :</span>
          <span className="fs-5">{heartSpecialistCount}</span>
        </div>
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Diagnostic Radiologist :</span>
          <span className="fs-5">{diagnosticRadiologyCount}</span>
        </div>
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Clinical Immunologist :</span>
          <span className="fs-5">{clinicalImmunologyCount}</span>
        </div>

        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Cardiovascular :</span>
          <span className="fs-5">{cardiovascularCount}</span>
        </div>
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of Gastroenterologist :</span>
          <span className="fs-5">{gastroenterologyCount}</span>
        </div>

        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of General Internal Medicine :</span>
          <span className="fs-5">{generalInternalMedicineCount}</span>
        </div>
        <div className="col-2 text-light w-auto border rounded-pill m-1">
          <span className="fw-bold">No of General Surgery :</span>
          <span className="fs-5">{generalSurgeryCount}</span>
        </div>
      </div>
      <h1 className="text-center border border-light text-light rounded-pill w-50 m-auto p-2"> Welcome to Doctor Booking Portal</h1>
      {doctorData.map((item) => (
        <span key={item.id} className={`card p-3 shadow  ${classes.doctorCard}`}>
          <span>
            <span className="fw-bold ">Name: </span>
            {item.name}
          </span>
          <br />
          <span>
            <span className="fw-bold ">Age:</span>
            {item.age}
          </span>
          <br />
          <span>
            <span className="fw-bold ">Email: </span>
            {item.email}
          </span>
          <br />
          <span>
            <span className="fw-bold ">Speciality: </span>
            {item.speciality}
          </span>
          <br />
          <span className="">
            <span className="fw-bold ">Fee: </span>
            {item.fee}
          </span>
          <br />
          <button
            className="shadow rounded-pill mt-3"
            onClick={() => {
              navigate("../book-appointment", { replace: true });
              props.setDoctorData(item);
            }}
          >
            Book an Appoinment
          </button>
        </span>
      ))}
    </>
  );
};
export default Home;