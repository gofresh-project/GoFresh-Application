// import { useEffect, useState } from "react";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/orders/user/1")
//       .then(res => res.json())
//       .then(data => setOrders(data));
//   }, []);

//   return (
//     <div>
//       <h2>My Orders</h2>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Total</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order.orderId}>
//               <td>{order.orderId}</td>
//               <td>{order.date}</td>
//               <td>{order.status}</td>
//               <td>₹{order.total}</td>
//               <td>
//                 <a href={`/order/${order.orderId}`}>View Details</a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useState } from "react";
import { Table, Button, Badge, Container, Card } from "react-bootstrap";

export default function MyOrders() {

  // ======= DUMMY DATA (Frontend only) =======
  const [orders] = useState([
    {
      orderId: 101,
      date: "2026-01-30",
      status: "CONFIRMED",
      total: 520
    },
    {
      orderId: 102,
      date: "2026-01-29",
      status: "DISPATCHED",
      total: 780
    },
    {
      orderId: 103,
      date: "2026-01-28",
      status: "DELIVERED",
      total: 450
    }
  ]);

  const getStatusBadge = (status) => {
    if (status === "CONFIRMED") return "success";
    if (status === "DISPATCHED") return "warning";
    if (status === "DELIVERED") return "primary";
    return "secondary";
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        <h2 className="mb-3">📦 My Orders</h2>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total (₹)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>
                  <Badge bg={getStatusBadge(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td>₹{order.total}</td>
                <td>
                  <Button 
                    variant="outline-primary"
                    size="sm"
                    href={`/order/${order.orderId}`}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
