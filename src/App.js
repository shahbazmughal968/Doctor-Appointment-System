import './App.css';
import {Route,Routes} from 'react-router-dom'
import Layout from '../src/layout/Layout'
import Home from './components/home/Home'
import BookAppointment from './components/book-appointment/BookAppointment'
import AllApointments from './components/all-appointments/AllAppointments'
function App() {


  return (
    <Layout>
    <Routes>
      <Route index element={<Home/>}/>
     <Route path='home' element={<Home />}/>
     <Route path='all-appointments' element={<AllApointments />}/>
     <Route path="doctor/:doctorId" element={<BookAppointment />}/>
    </Routes>
    </Layout>
  );
}

export default App;
