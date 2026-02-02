import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById, toggleUser, changeUserRole } from "../api";

function UserAction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getUserById(id);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]); // ✅ only depends on id

  const handleToggle = async () => {
    if (!window.confirm("Change user active status?")) return;
    try {
      await toggleUser(id);
      alert("User status updated");
      const res = await getUserById(id);
      setUser(res.data);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleRoleChange = async (e) => {
    const roleId = e.target.value;
    if (!roleId) return;

    if (!window.confirm("Change user role?")) return;
    try {
      await changeUserRole(id, roleId);
      alert("User role updated");
      const res = await getUserById(id);
      setUser(res.data);
    } catch (err) {
      alert("Failed to change role");
    }
  };

  if (loading) return <h3>Loading user...</h3>;
  if (!user) return <h3>User not found</h3>;

  return (
    <div style={styles.container}>
      <h2>User Details</h2>

      <div style={styles.card}>
        <p><b>ID:</b> {user.userId}</p>
        <p><b>Name:</b> {user.firstName} {user.lastName}</p>
        <p><b>Email:</b> {user.email}</p>
        <p>
          <b>Status:</b>{" "}
          <span style={{ color: user.isActive ? "green" : "red" }}>
            {user.isActive ? "ACTIVE" : "DISABLED"}
          </span>
        </p>
        <p><b>Role:</b> {user.roleId}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleToggle} style={styles.btn}>
          Enable / Disable
        </button>

        <select onChange={handleRoleChange} style={styles.select}>
          <option value="">Change Role</option>
          <option value="1">Admin</option>
          <option value="2">Vendor</option>
          <option value="3">User</option>
        </select>

        <br /><br />
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px" },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    maxWidth: "400px"
  },
  btn: {
    backgroundColor: "#1a73e8",
    color: "white",
    border: "none",
    padding: "8px 16px",
    marginRight: "10px",
    cursor: "pointer"
  },
  select: {
    padding: "8px"
  },
  backBtn: {
    marginTop: "15px",
    padding: "6px 12px"
  }
};

export default UserAction;
