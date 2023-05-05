import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function AdminPage() {

  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async (e) => {

    await fetch(
      `http://localhost:8080/doctors`,
      {
        method: "GET",
      }
    ) .then((res) => res.json())
    .then((data) => {
      setDoctors(data);
    });
  };

  const deleteDoctor = async (id) => {

    await fetch(`http://localhost:8080/doctor/delete?doctorId=${id}`,
    {
      method: "DELETE",
    });

    loadDoctors();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
            <th scope="col">NR.</th>
              <th scope="col">ID</th>
              <th scope="col">EMAIL</th>
              <th scope="col">NAME</th>
              <th scope="col">LOCATION ID</th>
              <th scope="col">LOCATION</th>
              <th scope="col">SHIFT START</th>
              <th scope="col">SHIFT END</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{doctor.doctor.id}</td>
                <td>{doctor.user.email}</td>
                <td>{doctor.user.name}</td>
                <td>{doctor.doctor.locationId}</td>
                <td>{doctor.doctor.location}</td>
                <td>{doctor.doctor.shiftStart}</td>
                <td>{doctor.doctor.shiftEnd}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/editDoctor`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteDoctor(doctor.doctor.id)}
                  >
                    Delete
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link className="btn btn-primary" to="/addDoctor">
            Add Doctor
          </Link>
       

          
      </div>
    </div>
  );
}
