import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function DoctorPage() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);

  useEffect(() => {
    loadDoctor();
    loadAppointments();
    loadAppointmentsToday();
  }, []);

  const loadDoctor = async (e) => {
    await fetch(`http://localhost:8080/doctor/get?doctorId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctor(data);
      });
  };

  const loadAppointments = async () => {
    await fetch(`http://localhost:8080/appointments?userId=${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      });
  };

  const loadAppointmentsToday = async () => {
    const current = new Date();
    const year = `${current.getFullYear()}`;
    let month = `${current.getMonth() + 1}`;
    if (month < 10) month = "0" + month;
    let day = `${current.getDate()}`;
    if (day < 10) day = "0" + day;

    const date = `${year}-${month}-${day}`;
    await fetch(
      `http://localhost:8080/appointment/today?doctorId=${id}&date=${date}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTodaysAppointments(data);
      });
  };

  const confirmAppointment = async (id, donatedMl) => {
    await fetch(
      `http://localhost:8080/appointment/confirm?id=${id}&ml=${donatedMl}`,
      {
        method: "PUT",
      }
    );

    loadAppointments();
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
              <th scope="col">LOCATION ID</th>
              <th scope="col">LOCATION</th>
              <th scope="col">SHIFT START</th>
              <th scope="col">SHIFT END</th>
            </tr>
          </thead>
          <tbody>
            {doctor.doctor && (
              <tr>
                <td>{doctor.doctor.id}</td>
                <td>{doctor.user.email}</td>
                <td>{doctor.user.name}</td>
                <td>{doctor.doctor.locationId}</td>
                <td>{doctor.doctor.location}</td>
                <td>{`${parseInt(doctor.doctor.shiftStart) + ":00"}`}</td>
                <td>{`${parseInt(doctor.doctor.shiftEnd) + ":00"}`}</td>
              </tr>
            )}
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
              <th scope="col">TIME</th>
              <th scope="col">DONATED ML</th>
              <th scope="col">DONOR ID</th>
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
                <td>{`${
                  appointment.timeMinutes !== 0
                    ? parseInt(appointment.timeMinutes / 60) +
                      ":" +
                      (appointment.timeMinutes % 60).toString().padStart(2, "0")
                    : "00"
                }`}</td>
                <td>{appointment.donatedMl}</td>
                <td>{appointment.donorId}</td>
                <td>
                  {appointment.donatedMl ? (
                    "Confirmed"
                  ) : (
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Donated Ml"
                        value={appointment.tempDonatedMl || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setAppointments((prevAppointments) =>
                            prevAppointments.map((prevAppointment) =>
                              prevAppointment.id === appointment.id
                                ? { ...prevAppointment, tempDonatedMl: value }
                                : prevAppointment
                            )
                          );
                        }}
                      />
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          confirmAppointment(
                            appointment.id,
                            appointment.tempDonatedMl
                          );
                          setAppointments((prevAppointments) =>
                            prevAppointments.map((prevAppointment) =>
                              prevAppointment.id === appointment.id
                                ? {
                                    ...prevAppointment,
                                    donatedMl: appointment.tempDonatedMl,
                                    tempDonatedMl: null,
                                  }
                                : prevAppointment
                            )
                          );
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 style={{ textAlign: "center", color: "blue" }}>
          Today's Appoiontments
        </h1>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">NR.</th>
              <th scope="col">ID</th>
              <th scope="col">BLOOD TYPE</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME IN MINUTES</th>
              <th scope="col">DONATED ML</th>
              <th scope="col">DONOR ID</th>
            </tr>
          </thead>

          <tbody>
            {todaysAppointments.map((todaysAppointment, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{todaysAppointment.id}</td>
                <td>{todaysAppointment.bloodType}</td>
                <td>{todaysAppointment.date}</td>
                <td>{`${
                  todaysAppointment.timeMinutes !== 0
                    ? parseInt(todaysAppointment.timeMinutes / 60) +
                      ":" +
                      (todaysAppointment.timeMinutes % 60).toString().padStart(2, "0")
                    : "00"
                }`}</td>
                <td>{todaysAppointment.donatedMl}</td>
                <td>{todaysAppointment.donorId}</td>
                <td>
                  {todaysAppointment.donatedMl ? (
                    "Confirmed"
                  ) : (
                    <div>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Donated Ml"
                        value={todaysAppointment.tempDonatedMl || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setTodaysAppointments((prevAppointments) =>
                            prevAppointments.map((prevAppointment) =>
                              prevAppointment.id === todaysAppointment.id
                                ? { ...prevAppointment, tempDonatedMl: value }
                                : prevAppointment
                            )
                          );
                        }}
                      />
                      <button
                        className="btn btn-success mx-2"
                        onClick={() => {
                          confirmAppointment(
                            todaysAppointment.id,
                            todaysAppointment.tempDonatedMl
                          );
                          setTodaysAppointments((prevAppointments) =>
                            prevAppointments.map((prevAppointment) =>
                              prevAppointment.id === todaysAppointment.id
                                ? {
                                    ...prevAppointment,
                                    donatedMl: todaysAppointment.tempDonatedMl,
                                    tempDonatedMl: null,
                                  }
                                : prevAppointment
                            )
                          );
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1></h1>
        <Link className="btn btn-primary" to="/">
          Back to login
        </Link>
      </div>
    </div>
  );
}
