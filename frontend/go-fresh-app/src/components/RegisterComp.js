import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    role_id: 2, // default: Customer
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);
    // send data to backend API
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 text-success">
                GoFresh Registration
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
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
                    name="first_name"
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
                    name="last_name"
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
                    name="phone_number"
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
                    name="password"
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
                    name="confirm_password"
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
                    name="role_id"
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
