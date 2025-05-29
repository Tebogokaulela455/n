import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../partials/RegisterPage.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    profilePicture: null
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  console.log(formData)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((formData) => ({
      ...formData, // to collect & keep a copy of the data inputed
      [name]: name === "profilePicture" ? files[0] : value,
    }));
  };

  /* TO VERIFY IF THAT "password" INPUTED IS EQUAL TO "confirmPassword" */

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("https://rented-in.onrender.com/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        console.log("Registration successful, navigating to /login");
        navigate("/login");
      } else {
        // Log error response for debugging
        const errorData = await response.json();
        console.error("Registration failed with status:", response.status, errorData);
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }

  }


  // HTML 

  return (
    <div className="register">
      <div className="register_container">
        <div className="title">Registration</div>
        <hr />
        <div className="register_content">
          <form className="register_content_form" onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">{/* First Name */}
                <span className="details" >First Name</span>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required />
              </div>
              <div className="input-box">{/* Last Name */}
                <span className="details" >Last Name</span>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required />
              </div>
              <div className="input-box">{/* Email */}
                <span className="details" >Email</span>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
              </div>
              <div className="input-box">{/* Phone Number */}
                <span className="details" >Phone Number</span>
                <input type="string" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your number" required />
              </div>
              <div className="input-box">{/* Password */}
                <span className="details" >Password</span>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              </div>
              <div className="input-box">{/* Confirm Password */}
                <span className="details"  >Confirm Password</span>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                {!passwordMatch && (
                  <p style={{ color: "red" }}>Passwords do not match!</p> // TO INFORM THE USER THAT THE PASSWORDS DO NOT MATCH
                )}
              </div>
            </div>
            <div className="profile-picture">{/* profile-picture */}
              <input id='image' type="file" name="profilePicture" accept="image/*" style={{ display: "none" }} onChange={handleChange} required />
              <label htmlFor="image">
                <p>Upload your Photo here</p>
                <img src="/assets/upload-image.png" alt="" />
              </label>
            </div>
            {formData.profilePicture && (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt=""
                style={{ maxWidth: "80px", borderRadius:"40px", display: "block", margin: "5px auto 0", }} // styling for the profile picture
              />
            )}
            <div className="button">
              <button type="submit" disabled={!passwordMatch}>Register</button>
            </div>

            <div className='already-signedUP'>
              Already have an account? <a href="/login">log in here</a>
            </div>

          </form>

        </div>

      </div >
    </div >
  )
}

export default RegisterPage