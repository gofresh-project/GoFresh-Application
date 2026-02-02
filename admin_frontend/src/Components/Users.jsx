import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>User Management</h2>
        <p style={styles.subtitle}>Manage system access, roles, and account status.</p>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>User ID</th>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Account Status</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.userId} style={styles.tr}>
                <td style={styles.td}>#{u.userId}</td>
                <td style={{ ...styles.td, fontWeight: "600" }}>{u.firstName} {u.lastName}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: u.isActive ? "#e6f4ea" : "#fce8e6",
                    color: u.isActive ? "#1e8e3e" : "#d93025"
                  }}>
                    {u.isActive ? "ACTIVE" : "DISABLED"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <button 
                    onClick={() => navigate(`/user/${u.userId}`)} 
                    style={styles.openBtn}
                  >
                    Open Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Shared Modern Styles
const styles = {
  container: { padding: "40px", backgroundColor: "#f8f9fa", minHeight: "100vh" },
  header: { marginBottom: "25px" },
  title: { margin: 0, fontSize: "24px", color: "#202124" },
  subtitle: { margin: "5px 0 0", color: "#5f6368" },
  card: { backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { backgroundColor: "#f1f3f4" },
  th: { padding: "15px 20px", textAlign: "left", fontSize: "12px", color: "#5f6368", textTransform: "uppercase", letterSpacing: "0.5px" },
  td: { padding: "15px 20px", borderBottom: "1px solid #f1f3f4", color: "#3c4043", fontSize: "14px" },
  tr: { transition: "background 0.2s" },
  badge: { padding: "4px 12px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" },
  openBtn: { backgroundColor: "#1a73e8", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }
};

export default Users;