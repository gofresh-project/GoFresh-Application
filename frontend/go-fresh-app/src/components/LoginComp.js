
import { useState } from "react";


export default function LoginComp() {

const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    console.log("button clicked")
    e.preventDefault(); // VERY IMPORTANT
    console.log(email+": "+password)
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername: email,
          password: password
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // Example: token handling
      //localStorage.setItem("token", data.token);

      // Redirect based on role
      if(data) {
         console.log(data.role.roleName);
         if(data.role.roleName === "Customer") {
            
         }
         else if(data.role.roleName === "Vendor") {

         }
         else if(data.role.roleName === "Admin") {

         }

      }
      else {
          //show invalid msg
      }
     /* if (role === "Admin") window.location.href = "/admin";
      else if (role === "Vendor") window.location.href = "/vendor";
      else window.location.href = "/customer";*/

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="login-title">Login Form</h1>

        <form className="login-form">

          <div className="form-group">
            <label>Email / Username</label>
            <input type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" />
            <label>Show Password</label>
          </div>

          {/*<div className="form-group">
            <label>Login As</label>
            <select>
              <option>Customer</option>
              <option>Admin</option>
              <option>Vendor</option>
            </select>
          </div> */}

          <div className="checkbox-group">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>

          <button type="button" onClick={handleSubmit}  className="login-btn">Login</button>

          <div className="login-link">
            <a href="#">Forgot Password?</a>
          </div>

          <div className="login-link">
            New User? <a href="/register">Register</a>
          </div>

        </form>
      </div>
    </div>
  );
}
