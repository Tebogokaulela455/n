import React, { useState } from 'react'
import "../partials/LoginPage.scss"
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://rented-in.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* GET JWT DATA FROM API */
      const loggedIn = await response.json()
      console.log(loggedIn); // Inspect the response
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        console.log("Login Successfull: Now Navigating To Home '/'")
        navigate("/")
      }

    } catch (err) {
      console.log("Login Failed", err.message)
    }
  }
  return (
    <div className="login-section">
      <div className="login-container">
        <form  className="login_form" onSubmit={handleSubmit}>
          <h2 className='login'>Login</h2>
          <hr className='loginHr' />
          <div className="input-field">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Enter your password</label>
          </div>
          <button className="register-button" type="submit">Log In</button>
          <div className="register-newUser">
            <p>Don't have an account? <a href="/register">register here</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage