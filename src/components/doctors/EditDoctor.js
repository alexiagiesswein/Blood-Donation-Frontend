import React, {useState} from "react";
import { Link, useNavigate,useParams } from "react-router-dom";


export default function EditDoctor() {

    let navigate = useNavigate();
    const { id,email,password,name,locationId,shiftStart,shiftEnd } = useParams();

  const [doctor, setDoctor] = useState({
    id: id,
    email: email,
    password: password,
    name: name,
    locationId: locationId,
    shiftStart: shiftStart,
    shiftEnd: shiftEnd

  });


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/doctor/edit?email=${doctor.email}&password=${doctor.password}&name=${doctor.name}&locationId=${doctor.locationId}&shiftStart=${doctor.shiftStart}&shiftEnd=${doctor.shiftEnd}&id=${id}`,
      {
        method: "PUT",
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
          <h2 className="text-center m-4">Edit Doctor</h2>

          <div className="mb-3">
              <label htmlFor="ID" className="form-label">
                ID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter id"
                name="id"
                value={id}
                onChange={(e) => onInputChange(e)}
              />
            </div>

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
                value={doctor.email}
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
                name="password"
                value={doctor.password}
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
                value={doctor.name}
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
                value={doctor.locationId}
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
                value={doctor.shiftStart}
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
                value={doctor.shiftEnd}
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
