import './App.css';
import {Route,Routes} from 'react-router-dom'
import Layout from '../src/layout/Layout'
import Home from './components/home/Home'
import BookAppointment from './components/book-appointment/BookAppointment'
import AllApointments from './components/all-appointments/AllAppointments'
import DoctorPage from './components/doctor-page/DoctorPage'
import { useState } from 'react';
function App() {
  const [doctorData,setDoctorData]=useState([]);

  return (
    <Layout>
    <Routes>
      <Route index element={<Home/>}/>
     <Route path='home' element={<Home setDoctorData={setDoctorData}/>}/>
     <Route path='book-appointment' element={<BookAppointment doctorData={doctorData}/>}/>
     <Route path='all-appointments' element={<AllApointments />}/>
     <Route path="doctor/:doctorId" element={<BookAppointment doctorData={doctorData}/>}/>
    </Routes>
    </Layout>
  );
}

export default App;
