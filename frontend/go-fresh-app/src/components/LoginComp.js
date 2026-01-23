
export default function LoginComp() {
  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="login-title">Login Form</h1>

        <form className="login-form">

          <div className="form-group">
            <label>Email / Username</label>
            <input type="email" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" />
            <label>Show Password</label>
          </div>

          <div className="form-group">
            <label>Login As</label>
            <select>
              <option>Customer</option>
              <option>Admin</option>
              <option>Vendor</option>
            </select>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" />
            <label>Remember Me</label>
          </div>

          <button className="login-btn">Login</button>

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
