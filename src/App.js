import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddDoctor from "./components/doctors/AddDoctor";
import EditDoctor from "./components/doctors/EditDoctor";
import RegisterPage from "./pages/RegisterPage";
import DonorPage from "./pages/DonorPage";
import DoctorPage from "./pages/DoctorPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/donor" element={<DonorPage />} />
          <Route exact path="/doctor" element={<DoctorPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/addDoctor" element={<AddDoctor />} />
          <Route exact path="/editDoctor" element={<EditDoctor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
