import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVendors, approveVendor, disableVendor, enableVendor } from "../api";

function VendorAction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    // In a real app, you'd call getVendorById(id). 
    // For now, we'll find it from the list for consistency with your API.
    const fetchVendor = async () => {
      const res = await getAllVendors();
      const found = res.data.find(v => v.vendorId.toString() === id);
      setVendor(found);
    };
    fetchVendor();
  }, [id]);

  const handleAction = async (actionFn) => {
    try {
      await actionFn(id);
      navigate("/vendors");
    } catch (err) {
      alert("Action failed");
    }
  };

  if (!vendor) return <p>Loading...</p>;

  return (
    <div style={styles.actionCard}>
      <h2>Vendor Management</h2>
      <div style={styles.details}>
        <p><strong>Business:</strong> {vendor.businessName}</p>
        <p><strong>ID:</strong> {vendor.vendorId}</p>
      </div>

      <div style={styles.buttonGroup}>
        {!vendor.isApproved && vendor.isActive && (
          <button style={styles.approveBtn} onClick={() => handleAction(approveVendor)}>Approve Vendor</button>
        )}
        {vendor.isActive ? (
          <button style={styles.disableBtn} onClick={() => handleAction(disableVendor)}>Disable Vendor</button>
        ) : (
          <button style={styles.enableBtn} onClick={() => handleAction(enableVendor)}>Enable Vendor</button>
        )}
      </div>
      
      <button onClick={() => navigate(-1)} style={styles.backBtn}>⬅ Back to List</button>
    </div>
  );
}

const styles = {
  actionCard: { padding: "40px", maxWidth: "500px", margin: "40px auto", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
  details: { backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" },
  buttonGroup: { display: "flex", gap: "10px", marginBottom: "20px" },
  approveBtn: { backgroundColor: "#28a745", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" },
  disableBtn: { backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" },
  enableBtn: { backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 15px", borderRadius: "5px", cursor: "pointer" },
  backBtn: { background: "none", border: "none", color: "#666", cursor: "pointer", textDecoration: "underline" }
};

export default VendorAction;