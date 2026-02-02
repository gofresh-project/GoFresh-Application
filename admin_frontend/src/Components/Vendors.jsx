import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVendors } from "../api";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const res = await getAllVendors();
      setVendors(res.data);
    } catch (err) {
      console.error("Failed to load vendors", err);
    }
  };

  const filtered = vendors.filter((v) =>
    v.businessName.toLowerCase().includes(search.toLowerCase()) ||
    v.vendorId.toString().includes(search)
  );

  return (
    <div style={styles.container}>
      <div style={styles.headerFlex}>
        <div>
          <h2 style={styles.title}>Vendor Directory</h2>
          <p style={styles.subtitle}>Monitor and verify business partnerships.</p>
        </div>
        <input 
          style={styles.searchBar}
          placeholder="Search business or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Vendor ID</th>
              <th style={styles.th}>Business Name</th>
              <th style={styles.th}>Status</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.vendorId} style={styles.tr}>
                <td style={styles.td}>#{v.vendorId}</td>
                <td style={{ ...styles.td, fontWeight: "600" }}>{v.businessName}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    backgroundColor: !v.isActive ? "#fce8e6" : !v.isApproved ? "#fef7e0" : "#e6f4ea",
                    color: !v.isActive ? "#d93025" : !v.isApproved ? "#f29900" : "#1e8e3e"
                  }}>
                    {!v.isActive ? "Disabled" : !v.isApproved ? "Pending Approval" : "Verified"}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <button 
                    onClick={() => navigate(`/vendor-action/${v.vendorId}`)}
                    style={styles.manageBtn}
                  >
                    Manage
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

// DEFINING STYLES OBJECT (Ensures 'styles' is defined)
const styles = {
  container: { padding: "40px", backgroundColor: "#f8f9fa", minHeight: "100vh" },
  headerFlex: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" },
  title: { margin: 0, color: "#202124", fontSize: "24px" },
  subtitle: { color: "#5f6368", marginTop: "5px" },
  searchBar: { padding: "10px 15px", borderRadius: "24px", border: "1px solid #dadce0", width: "250px", outline: "none" },
  tableContainer: { 
    backgroundColor: "#fff", 
    borderRadius: "8px", 
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    overflow: "hidden" 
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "15px 20px", backgroundColor: "#f1f3f4", color: "#5f6368", fontSize: "12px", textTransform: "uppercase" },
  td: { padding: "15px 20px", borderBottom: "1px solid #f1f3f4", color: "#3c4043" },
  tr: { transition: "background 0.2s" },
  badge: { padding: "5px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "bold" },
  manageBtn: { backgroundColor: "#fff", border: "1px solid #dadce0", padding: "6px 14px", borderRadius: "4px", cursor: "pointer", color: "#3c4043" }
};

export default Vendors;