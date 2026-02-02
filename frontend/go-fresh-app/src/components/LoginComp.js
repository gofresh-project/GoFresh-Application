import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginComp() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Validate user data structure
          if (userData && (userData.userId || userData.username)) {
            console.log("User already logged in, redirecting...", userData);
            
            // Redirect based on role
            redirectBasedOnRole(userData);
            return;
          } else {
            // Invalid user data, clear it
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        localStorage.removeItem("user");
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Helper function to redirect based on role
  const redirectBasedOnRole = (userData) => {
    if (userData?.role?.roleName) {
      const role = userData.role.roleName;
      if (role === "Customer") {
        navigate("/home", { replace: true });
      } else if (role === "Vendor") {
        navigate("/vendor", { replace: true });
      } else if (role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } else {
      // No role specified, redirect to home
      navigate("/home", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!emailOrUsername.trim() || !password.trim()) {
      setError("Email/Username and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername: emailOrUsername.trim(),
          password: password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      
      // Redirect based on role
      redirectBasedOnRole(data);
      window.location.reload();

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  // Handle manual logout if user wants to login as different user
  const handleLoginAsDifferentUser = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Reload to clear any cached state
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is already logged in (after auth check)
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData && (userData.userId || userData.username)) {
        return (
          <div className="login-page">
            <div className="login-container">
              <h1 className="login-title">Already Logged In</h1>
              <div className="already-logged-in">
                <p>You are already logged in as:</p>
                <div className="user-info">
                  <p><strong>Name:</strong> {userData.firstName || userData.username}</p>
                  <p><strong>Role:</strong> {userData.role?.roleName || "User"}</p>
                  <p><strong>Email:</strong> {userData.email || "Not provided"}</p>
                </div>
                
                <div className="button-group">
                  <button 
                    onClick={() => redirectBasedOnRole(userData)}
                    className="continue-btn"
                  >
                    Continue to Dashboard
                  </button>
                  
                  <button 
                    onClick={handleLoginAsDifferentUser}
                    className="logout-btn"
                  >
                    Login as Different User
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } catch (error) {
      // If there's an error parsing, continue to normal login
    }
  }

  // Normal login form
  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email / Username</label>
            <input
              type="text"
              placeholder="Enter email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="login-links">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
            
            <div className="register-link">
              New User? <a href="/register">Register here</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}