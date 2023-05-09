import React, {useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditDonor() {

    let navigate = useNavigate();
    const { id,password,name,address, bloodType,userId } = useParams();

  const [donor, setDonor] = useState({
    id: id,
    password: password,
    name: name,
    address: address,
    bloodType: bloodType,
    userId: userId,

  });


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDonor((prevDonor) => ({
      ...prevDonor,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/donor/edit?donorId=${donor.id}&password=${donor.password}&name=${donor.name}&address=${donor.address}&bloodType=${donor.bloodType}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDonor(data);
        navigate(`/donor/${userId}`);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit your account</h2>

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
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={donor.password}
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
                value={donor.name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={donor.address}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Blood Type" className="form-label">
                Blood Type
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter blood type"
                name="bloodType"
                value={donor.bloodType}
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
