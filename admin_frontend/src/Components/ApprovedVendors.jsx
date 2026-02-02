import { useEffect, useState } from "react";
import { getApprovedVendors, disableVendor } from "../api";

function ApprovedVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const res = await getApprovedVendors();
      setVendors(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load approved vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (id) => {
    if (!window.confirm("Are you sure you want to disable this vendor?")) return;

    try {
      await disableVendor(id);
      loadVendors();
    } catch (err) {
      console.error(err);
      alert("Failed to disable vendor");
    }
  };

  if (loading) return <h3>Loading approved vendors...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Approved Vendors</h2>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Business Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((v) => (
            <tr key={v.vendorId}>
              <td>{v.vendorId}</td>
              <td>{v.businessName}</td>
              <td style={{ color: "green", fontWeight: "bold" }}>
                APPROVED
              </td>
              <td>
                <button
                  onClick={() => handleDisable(v.vendorId)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    cursor: "pointer"
                  }}
                >
                  Disable Vendor
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {vendors.length === 0 && <p>No approved vendors found.</p>}
    </div>
  );
}

export default ApprovedVendors;
