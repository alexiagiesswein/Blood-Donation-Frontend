import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LOGIN_URL = "/user/login";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch(
        `http://localhost:8080${LOGIN_URL}?email=${email}&password=${pwd}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const role = data.role;
          const user_id=data.id;
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "doctor") {
            navigate(`/doctor/${user_id}`);
          } else if (role === "donor") {
            navigate(`/donor/${user_id}`);
          } else {
            throw new Error("Invalid login!");
          }
        })
        .catch((err) => {
          if (!err?.response) {
            setErrMsg("Invalid login");
          } else if (err.response.status === 400) {
            setErrMsg("Missing Username or Password");
          } else if (err.response.status === 401) {
            setErrMsg("Unauthorized");
          } else {
            setErrMsg("Login Failed");
          }
          errRef.current.focus();
        });
    } catch (err) {
      setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  return (
    <>
      <section  style={{
        backgroundColor: 'darkturquoise'}}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Login</h1>
        <form> 
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <a href="/register">Register Here</a>
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
