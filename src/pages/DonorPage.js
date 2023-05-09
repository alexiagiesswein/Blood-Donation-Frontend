import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function DonorPage() {

  const { id } = useParams();
  const navigate = useNavigate();


  const [donor, setDonor] = useState([]);
  const [centers, setCenters] = useState([]);
  const [appointments, setAppointments] = useState([]);

  
  useEffect(() => {
    loadDonor();
    loadCenters();
    loadAppointments();
    
  }, []);

  const loadDonor = async (e) => {
    await fetch(`http://localhost:8080/donor/get?donorId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDonor(data);
       
      });
      
  };

  const loadCenters = async (e) => {
    
    await fetch(`http://localhost:8080/locations`, {
      method: "GET",
    })
      .then( (res) =>  res.json())
      .then((data) => {
        setCenters(data);
      });
  };

  const loadAppointments = async () => {
    const donorId = localStorage.getItem("donorId");
     if (!donorId) return;
    
    await fetch(`http://localhost:8080/appointments?donorId=${donor.donor && donor.donor.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      });
    

    if (donor && donor.donor.id) {
      localStorage.setItem("donorId", donor.donor.id);
    }
  };


  const cancelAppointment = async (id) => {
    await fetch(`http://localhost:8080/appointment/cancel?id=${id}`, {
      method: "DELETE",
    });

    loadAppointments();
  };

  const deleteDonor = async (id) => {
    await fetch(`http://localhost:8080/donor/delete?donorId=${id}`, {
      method: "DELETE",
    }).then(navigate("/"));

  };


  return (
    <div className="container">
      <div className="py-4">
        <h1 style={{ color: "darkturquoise" }}> WELCOME TO YOUR ACCOUNT</h1>

        <h1 style={{ textAlign: "center", color: "blue" }}>Your details</h1>
        <table className="table border shadow">
          <thead>
            
            <tr>
              <th scope="col">ID</th>
              <th scope="col">EMAIL</th>
              <th scope="col">NAME</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">BLOOD TYPE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            { donor.donor &&
              <tr>
                <td>{donor.donor.id}</td>
                <td>{donor.user.email}</td>
                <td>{donor.user.name}</td>
                <td>{donor.donor.address}</td>
                <td>{donor.donor.bloodType}</td>

                <td>
                  <Link className="btn btn-primary mx-2" to={`/editDonor/${id}/${donor.donor.id}/${donor.user.password}/${donor.user.name}/${donor.donor.address}/${donor.donor.bloodType}`}>
                    Edit Account
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteDonor(donor.donor.id)}
                  >
                    {" "}
                    Delete Account{" "}
                    
                  </button>
                </td>
              </tr>
            }
          </tbody>
        </table>

        <h1 style={{ textAlign: "center", color: "blue" }}>Locations</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">NR.</th>
              <th scope="col">ID</th>
              <th scope="col">ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {centers.map((center, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{center.id}</td>
                <td>{center.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1 style={{ textAlign: "center", color: "blue" }}>Appointments</h1>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">NR.</th>
              <th scope="col">ID</th>
              <th scope="col">BLOOD TYPE</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME IN MINUTES</th>
              <th scope="col">DONATED ML</th>
              <th scope="col">DOCTOR ID</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{appointment.id}</td>
                <td>{appointment.bloodType}</td>
                <td>{appointment.date}</td>
                <td>{appointment.timeMinutes}</td>
                <td>{appointment.donatedMl}</td>
                <td>{appointment.doctorId}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link className="btn btn-primary" to="/addAppointment">
          Add Appointment
        </Link>
        <h1></h1>
        <Link className="btn btn-primary" to="/">
          Back to login
        </Link>
      </div>
    </div>
  );
}
