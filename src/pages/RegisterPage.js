import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validName, setValidName] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [name, setName] = useState("");

  const [bloodType, setBloodType] = useState("");

  const [address, setAddress] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleBloodType = (e) => {
    setBloodType(e);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    if (!v1) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      fetch(
        `http://localhost:8080/user/register?email=${email}&password=${pwd}&confirmPassword=${matchPwd}&name=${name}&bloodType=${bloodType}&address=${address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then(() => {
          navigate("/");
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
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !email ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must contain @.
            <br />
            Must end in .smth. Try .com or .ro.
          </p>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <p></p>
          <DropdownButton
            id="dropdown-basic-button"
            title="Blood Type"
            aria-expanded="true"
            onSelect={handleBloodType}
          >
            <Dropdown.Item eventKey="0+">0+</Dropdown.Item>
            <Dropdown.Item eventKey="0-">0-</Dropdown.Item>
            <Dropdown.Item eventKey="A+">A+</Dropdown.Item>
            <Dropdown.Item eventKey="A-">A-</Dropdown.Item>
            <Dropdown.Item eventKey="B+">B+</Dropdown.Item>
            <Dropdown.Item eventKey="B-">B-</Dropdown.Item>
            <Dropdown.Item eventKey="AB+">AB+</Dropdown.Item>
            <Dropdown.Item eventKey="AB-">AB-</Dropdown.Item>
          </DropdownButton>

          <input
            type="text"
            id="bloodType"
            onChange={(e) => setBloodType(e.target.value)}
            value={bloodType}
            required
          />

          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />

          <button disabled={!validName || !validMatch ? true : false}>
            <h1> </h1>
            Sign Up
          </button>
        </form>
        <p>
          Already registered?
          <br />
          <span className="line">
            <a href="/">Login</a>
          </span>
        </p>
      </section>
    </>
  );
};

export default Register;
