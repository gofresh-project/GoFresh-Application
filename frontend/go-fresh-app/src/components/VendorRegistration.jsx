// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/VendorRegister.css";



// const VendorRegister = () => {
//   const [form, setForm] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     password: "",
//     businessRegNo: "",
//     businessName: "",
//     areaId: "",
//   });
// // 
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     await axios.post("http://localhost:8080/vendors/register", {
//       username: form.username,
//       firstName: form.firstName,
//       lastName: form.lastName,
//       phoneNumber: form.phone,
//       email: form.email,
//       password: form.password,
//       businessRegNo: form.businessRegNo,
//       businessName: form.businessName,
//       areaId: Number(form.areaId),
//     });

//     alert("Vendor registered successfully");
//   };

//   return (
//     <form onSubmit={submit}>
//       <h2>Vendor Registration</h2>

//       <input name="username" placeholder="Username" onChange={handleChange} required />
//       <input name="firstName" placeholder="First Name" onChange={handleChange} required />
//       <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
//       <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
//       <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

//       <hr />

//       <input name="businessRegNo" placeholder="Business Registration No" onChange={handleChange} required />
//       <input name="businessName" placeholder="Business Name" onChange={handleChange} required />
//       <input name="areaId" placeholder="Area ID" onChange={handleChange} required />

//       <button type="submit">Register Vendor</button>
//     </form>
//   );
// };

// export default VendorRegister;
