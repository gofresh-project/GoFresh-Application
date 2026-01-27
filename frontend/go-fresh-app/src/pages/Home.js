import ProductCard from "../components/ProductCard";

// TEMP MOCK DATA (replace with API later)
const products = [
  {
    prodId: 1,
    name: "Apple",
    image: "https://via.placeholder.com/200",
    minPrice: 120,
  },
  {
    prodId: 2,
    name: "Banana",
    image: "https://via.placeholder.com/200",
    minPrice: 60,
  },
];

export default function Home() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {products.map((p) => (
        <ProductCard key={p.prodId} product={p} />
      ))}
    </div>
  );
}
