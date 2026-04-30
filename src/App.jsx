import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientRegistration from './pages/PatientRegistration';
import Appointments from './pages/Appointments';
import Queue from './pages/Queue';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientFile from './pages/PatientFile';
import Pharmacy from './pages/Pharmacy';
import Lab from './pages/Lab';
import Insurance from './pages/Insurance';
import Billing from './pages/Billing';
import Cashier from './pages/Cashier';
import Finance from './pages/Finance';
import NurseStation from './pages/NurseStation';
import ChiefDashboard from './pages/ChiefDashboard';
import Users from './pages/Users';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/"                       element={<Dashboard />} />
          <Route path="/registration"           element={<PatientRegistration />} />
          <Route path="/appointments"           element={<Appointments />} />
          <Route path="/queue"                  element={<Queue />} />
          <Route path="/doctor"                 element={<DoctorDashboard />} />
          <Route path="/doctor/patient/:id"     element={<PatientFile />} />
          <Route path="/chief"                  element={<ChiefDashboard />} />
          <Route path="/nurse"                  element={<NurseStation />} />
          <Route path="/pharmacy"               element={<Pharmacy />} />
          <Route path="/lab"                    element={<Lab />} />
          <Route path="/insurance"              element={<Insurance />} />
          <Route path="/billing"                element={<Billing />} />
          <Route path="/cashier"                element={<Cashier />} />
          <Route path="/finance"                element={<Finance />} />
          <Route path="/users"                  element={<Users />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
