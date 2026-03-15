import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
      console.error("Login failed", err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { emailId, password, firstName, lastName, age },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data);
      console.error("Sign Up failed", err.message);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>

          <fieldset className="fieldset w-full">
            <label className="fieldset-legend">Email:</label>
            <input
              type="text"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
                setError("");
              }}
              className="input"
              placeholder="mail@site.com"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <label className="fieldset-legend">Password:</label>
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="input"
              placeholder="Password"
            />
          </fieldset>

          {!isLogin && (
            <>
              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">First Name:</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="input"
                  placeholder="Your first name"
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">Last Name:</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="input"
                  placeholder="Your last name"
                />
              </fieldset>
              <fieldset className="fieldset w-full">
                <label className="fieldset-legend">Age:</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  className="input"
                  placeholder="Age"
                />
              </fieldset>
            </>
          )}

          <div className="text-red-500">{error}</div>

          <div className="card-actions my-4">
            <button className="btn btn-primary" onClick={isLogin ? handleLogin : handleSignUp}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <p
            className="cursor-pointer underline text-cyan-400"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
