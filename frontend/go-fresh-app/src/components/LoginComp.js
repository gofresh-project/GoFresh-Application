
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginComp() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailOrUsername || !password) {
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
          emailOrUsername: emailOrUsername,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username/email or password");
      }

      const data = await response.json();
      console.log("LOGIN RESPONSE JSON →", data);

      // ✅ SIMPLE: Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      
      // Role based navigation
      if (data?.role?.roleName) {
        const role = data.role.roleName;
        if (role === "Customer") {
          navigate("/home");
        } else if (role === "Vendor") {
          navigate("/vendor");
        } else if (role === "Admin") {
          navigate("/admin");
        } else {
          setError("Unknown user role");
        }
      } else {
        setError("Invalid response from server");
      }
      
      // Force refresh to update header
      window.location.reload();

    } catch (err) {
      setError(err.message);
    }
  };

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
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>

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




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";

// export default function LoginComp() {

//   // ---------------- STATE ----------------
//   const [emailOrUsername, setEmailOrUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // ---------------- LOGIN HANDLER ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!emailOrUsername || !password) {
//       setError("Email/Username and password are required");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",

//         // 🔴 JSON HEADER
//         headers: {
//           "Content-Type": "application/json",
//         },

//         // 🔴 JSON BODY (REQUEST)
//         body: JSON.stringify({
//           emailOrUsername: emailOrUsername,
//           password: password,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid username/email or password");
//       }

//       // 🔴 JSON RESPONSE (FROM BACKEND)
//       const data = await response.json();

//       console.log("LOGIN RESPONSE JSON →", data);

//       // OPTIONAL: store auth data
//       // localStorage.setItem("token", data.token);
//       // localStorage.setItem("user", JSON.stringify(data));

//       // ---------------- ROLE BASED NAVIGATION ----------------
//       if (data?.role?.roleName) {

//         const role = data.role.roleName;

//         if (role === "Customer") {
//           navigate("/home");
//         }
//         else if (role === "Vendor") {
//           navigate("/vendor");
//         }
//         else if (role === "Admin") {
//           navigate("/admin");
//         }
//         else {
//           setError("Unknown user role");
//         }

//       } else {
//         setError("Invalid response from server");
//       }

//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="login-page">
//       <div className="login-container">

//         <h1 className="login-title">Login</h1>

//         <form className="login-form" onSubmit={handleSubmit}>

//           {/* EMAIL OR USERNAME */}
//           <div className="form-group">
//             <label>Email / Username</label>
//             <input
//               type="text"
//               placeholder="Enter email or username"
//               value={emailOrUsername}
//               onChange={(e) => setEmailOrUsername(e.target.value)}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* SHOW PASSWORD */}
//           <div className="checkbox-group">
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)}
//             />
//             <label>Show Password</label>
//           </div>

//           {/* ERROR MESSAGE */}
//           {error && <p className="error-text">{error}</p>}

//           {/* SUBMIT */}
//           <button type="submit" className="login-btn">
//             Login
//           </button>

//           <div className="login-link">
//             <a href="#">Forgot Password?</a>
//           </div>

//           <div className="login-link">
//             New User? <a href="/register">Register</a>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }




