import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddDoctor from "./components/doctors/AddDoctor";
import EditDoctor from "./components/doctors/EditDoctor";
import RegisterPage from "./pages/RegisterPage";
import DonorPage from "./pages/DonorPage";
import DoctorPage from "./pages/DoctorPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import EditDonor from "./components/donors/EditDonor";
import AddAppointment from "./components/appointments/AddAppointment";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/donor/:id" element={<DonorPage />} />
          <Route exact path="/doctor" element={<DoctorPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/addDoctor" element={<AddDoctor />} />
          <Route exact path="/editDoctor/:id/:email/:password/:name/:locationId/:shiftStart/:shiftEnd" element={<EditDoctor />} />
          <Route exact path="/editDonor/:userId/:id/:password/:name/:address/:bloodType" element={<EditDonor />} />
          <Route exact path="/addAppointment" element={<AddAppointment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
