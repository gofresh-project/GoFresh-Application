// import ProductCard from "../components/ProductCard";

// // TEMP MOCK DATA (replace with API later)
// const products = [
//   {
//     prodId: 1,
//     name: "Apple",
//     image: "https://via.placeholder.com/200",
//     minPrice: 120,
//   },
//   {
//     prodId: 2,
//     name: "Banana",
//     image: "https://via.placeholder.com/200",
//     minPrice: 60,
//   },
// ];

// export default function Home() {
//   return (
//     <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
//       {products.map((p) => (
//         <ProductCard key={p.prodId} product={p} />
//       ))}
//     </div>
//   );
// }


import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="home-hero">
        <h1>Fresh Fruits Delivered Daily 🍎</h1>
        <p>
          Handpicked fruits directly from farmers. Fresh, healthy, and affordable.
        </p>
      </section>

      {/* FRUITS LIST */}
      <section className="home-content">
        <h2 className="section-title">Available Fruits</h2>
      </section>
    </div>
  );
}
