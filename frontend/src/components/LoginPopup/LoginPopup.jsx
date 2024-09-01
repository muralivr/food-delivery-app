import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

function LoginPopup({ setShowPopup }) {
  const [curState, setCurState] = useState("Login");
  const { url, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let newUrl = url;
    if (curState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const res = await axios.post(newUrl, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowPopup(false);
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);

      // Displaying error message in toast
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          {curState === "Login" ? <h2>Login</h2> : <h2>Sign Up</h2>}
          <img
            onClick={() => setShowPopup(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {curState === "Login" ? (
            <>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                required
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
            </>
          )}
        </div>
        {curState === "Login" ? (
          <button>Login</button>
        ) : (
          <button>Sign Up</button>
        )}

        {curState === "Login" ? (
          <p>
            Create A New Account?
            <span onClick={() => setCurState("Signup")}>Sign Up</span>
          </p>
        ) : (
          <>
            <div className="login-popup-condition">
              <input type="checkbox" required/>
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
            <p>
              Already Have An Account?
              <span onClick={() => setCurState("Login")}>Login</span>
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
