import { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
    roleId: 2
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "roleId" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
        console.log("button clicked")


    // 1️⃣ Frontend validation
    if (formData.passwordHash !== formData.confirmPassword) {

      alert("Passwords do not match");
      return;
    }

    // 2️⃣ Payload sent to backend
    const payload = {
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,  
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      passwordHash: formData.passwordHash,
      role: {
        roleId: formData.roleId
      }
    };

    try {
      // 3️⃣ API call
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("User Registered Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
       <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 text-success">
                GoFresh Registration
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <label className="col-md-4 col-form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* First Name */}
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    placeholder="Enter first name"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    placeholder="Enter last name"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Enter phone number"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="passwordHash"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm password"
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Role */}
                <div className="mb-4">
                  <label className="form-label">Role</label>
                  <select
                    name="roleId"
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option value={2}>Customer</option>
                    <option value={3}>Seller</option>
                    <option value={1}>Admin</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Register
                </button>
              </form>

              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
