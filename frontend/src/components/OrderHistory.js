import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/orders/")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Order History</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Urgency</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.student_name}</td>
              <td>{order.subject}</td>
              <td>{order.pickup_location}</td>
              <td>{order.drop_location}</td>
              <td>
                <span className={`badge bg-${order.urgency === 'low' ? 'success' : order.urgency === 'medium' ? 'warning' : 'danger'}`}>
                  {order.urgency.toUpperCase()}
                </span>
              </td>
              <td>₹{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
