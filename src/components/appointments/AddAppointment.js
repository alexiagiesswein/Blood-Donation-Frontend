import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function AddAppointment() {

  let navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);


  const { locationId, id, bloodType, userId, location } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [time, setTime] = useState("");
  const [times, setTimes] = useState([]);
  const [doctorId, setDoctorId] = useState("");


  const [appointment, setAppointment] = useState({
    bloodType: "",
    date: "",
    time: "",
    doctorId: "",
  });

  const {date} = appointment;

  const loadDoctors = async (e) => {

    await fetch(
      `http://localhost:8080/doctor?locationId=${locationId}`,
      {
        method: "GET",
      }
    ) .then((res) => res.json())
    .then((data) => {
      setDoctors(data);
    });
  };


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
    loadTimes(doctorId, value);
    
  };

  const loadTimes = async (doctorId,date) => {
    await fetch(
      `http://localhost:8080/appointment/getHours?doctorId=${doctorId}&date=${date}`,
      {
        method: "GET",
      }
    ) .then(async (res) => await res.json())
    .then((data) => {
      setTimes(data);
    });
  };

  const handleDoctor = (e) => {
    setDoctorId(e);
  };

  const handleTimes = (time) => {
    setTime(time);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/appointment/add?doctorId=${doctorId}&donorId=${id}&time=${date + " " + time}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setAppointment(data);
        navigate(`/donor/${userId}`);
      });
  };




  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4" style={{ textAlign: "center", color: "blue" }}>Make an appointment</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <input
                type={"text"}
                className="form-control"
                name="location"
                value={location}
              />
            </div>
            <p></p>
            <DropdownButton
            id="dropdown-basic-button"
            title="Doctor"
            aria-expanded="true"
            onSelect={handleDoctor}
          >
            {doctors && doctors.map((doctor) => ( <Dropdown.Item style={{color: "black",}} key={doctor.doctor.id} eventKey={doctor.doctor.id}>{doctor.doctor.id}</Dropdown.Item>))}
            
          </DropdownButton>

            <div className="mb-3">
              <label htmlFor="Doctor ID" className="form-label">
                Doctor ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter doctor id"
                name="doctorId"
                value={doctorId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Date" className="form-label">
                Date
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter date"
                name="date"
                value={date}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <p></p>
            <DropdownButton
            id="dropdown-basic-button"
            title="Time"
            aria-expanded="true"
            onSelect={handleTimes}
          >
            {times && times.map((time) => ( <Dropdown.Item style={{color: "black",}} key={time} eventKey={time}>{time}</Dropdown.Item>))}
            
          </DropdownButton>

            <div className="mb-3">
              <label htmlFor="Time" className="form-label">
                Time
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter time"
                name="time"
                value={time}
                onChange={(e) => onInputChange(e)}
                step={60}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Blood type" className="form-label">
                Blood type
              </label>
              <input
                type={"text"}
                className="form-control"
                name="bloodType"
                value={bloodType}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <p></p>
            <Link
              style={{
                color: "darkred",
              }}
              className="btn btn-outline-danger "
              to={`/donor/${userId}`}
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
