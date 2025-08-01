import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPage = () => {
  const [formData, setFormData] = useState({
    student_name: "",
    subject: "",
    urgency: "low",
    amount: 50,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const urgencyRates = {
    low: 50,
    medium: 100,
    high: 150,
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "urgency") {
      setFormData({
        ...formData,
        [name]: value,
        amount: urgencyRates[value],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    if (!token) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    const orderData = {
      student_name: formData.student_name,
      subject: formData.subject,
      urgency: formData.urgency,
      amount: formData.amount,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Order placed successfully!");
      navigate("/history");
    } catch (error) {
      console.error("❌ Error placing order:", error.response || error.message);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Failed to place order.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Place an Order</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Urgency</Form.Label>
          <Form.Select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="low">Low (₹50)</option>
            <option value="medium">Medium (₹100)</option>
            <option value="high">High (₹150)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            readOnly
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Order
        </Button>
      </Form>
    </Container>
  );
};

export default OrderPage;
