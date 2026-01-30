import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="welcome-box">
        <h1 className="welcome-title">🥦 GoFresh</h1>
        <p className="welcome-subtitle">
          Your trusted online grocery delivery app
        </p>

        <div className="welcome-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/register" className="btn-secondary">Register</Link>
        </div>
      </div>
    </div>
  );
}
