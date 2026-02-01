import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function OrderDetails() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${id}/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  }, [id]);

  return (
    <div>
      <h2>Order Details #{id}</h2>

      {items.map(item => (
        <div key={item.orderItemId}>
          <p>Product ID: {item.productId}</p>
          <p>Quantity: {item.quantity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
