import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddDoctor() {
  let navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    email: "",
    pwd: "",
    name: "",
    locationId: "",
    shiftStart: "",
    shiftEnd: "",
  });

  const { email, pwd, name, locationId, shiftStart, shiftEnd } = doctor;

  const onInputChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/doctor/add?email=${email}&password=${pwd}&name=${name}&locationId=${locationId}&shiftStart=${shiftStart}&shiftEnd=${shiftEnd}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
        navigate("/admin");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Doctor</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter password"
                name="pwd"
                value={pwd}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Location ID" className="form-label">
                Location ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter location id"
                name="locationId"
                value={locationId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Shift Start" className="form-label">
                Shift Start
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter shift start"
                name="shiftStart"
                value={shiftStart}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Shift End" className="form-label">
                Shift End
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter shift end"
                name="shiftEnd"
                value={shiftEnd}
                onChange={(e) => onInputChange(e)}
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
              to="/admin"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
