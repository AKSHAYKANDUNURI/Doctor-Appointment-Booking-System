import { useState } from 'react'
import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom'
import LoginForm from './assets/Components/LoginForm'
import RegisterForm from './assets/Components/RegisterForm'
import AppointmentForm from './assets/Components/AppointmentForm'
import DoctorSlotChecking from './assets/Components/DoctorSlotChecking'
function App() {

  return (
    <>
     <Router>
        <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/appointmentform' element={<AppointmentForm/>}/>
        <Route path='/doctorslot' element={<DoctorSlotChecking/>}/>


        </Routes>
      </Router> 
       
    </>
  )
}

export default App
