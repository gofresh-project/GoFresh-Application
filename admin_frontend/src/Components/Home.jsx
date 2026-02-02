import { useEffect, useState } from "react";
import { getUsers, getAllVendors } from "../api";

function Home() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalVendors: 0,
    pendingVendors: 0
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const usersRes = await getUsers();
        const vendorsRes = await getAllVendors();

        const users = usersRes.data;
        const vendors = vendorsRes.data;

        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          totalVendors: vendors.length,
          pendingVendors: vendors.filter(v => !v.isApproved && v.isActive).length
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load dashboard data");
      }
    };

    loadDashboard();
  }, []); // ✅ no warning now

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <div style={styles.cardGrid}>
        <div style={{ ...styles.card, backgroundColor: "#e3f2fd" }}>
          <h3>Total Users</h3>
          <p style={styles.number}>{stats.totalUsers}</p>
        </div>

        <div style={{ ...styles.card, backgroundColor: "#e8f5e9" }}>
          <h3>Active Users</h3>
          <p style={styles.number}>{stats.activeUsers}</p>
        </div>

        <div style={{ ...styles.card, backgroundColor: "#fff3e0" }}>
          <h3>Total Vendors</h3>
          <p style={styles.number}>{stats.totalVendors}</p>
        </div>

        <div style={{ ...styles.card, backgroundColor: "#fce4ec" }}>
          <h3>Pending Vendors</h3>
          <p style={styles.number}>{stats.pendingVendors}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "40px" },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  number: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "10px 0"
  }
};

export default Home;
