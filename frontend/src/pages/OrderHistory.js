import React, { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ use centralized axios instance

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        console.warn("⚠️ Access token not found!");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("all-assignments/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📦 Orders:", res.data);
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mt-3 text-center">Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.student_name || "N/A"}</td>
                <td>{order.subject || "N/A"}</td>
                <td>{order.amount || "N/A"}</td>
                <td>{order.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
