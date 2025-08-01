import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";

const AssignmentListingPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem("access");
      console.log("🔐 Token:", token);

      if (!token) {
        console.warn("⚠️ Access token not found!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/all-assignments/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📦 Response:", response.data);
        setAssignments(response.data.results || response.data); // depends on backend structure
      } catch (error) {
        console.error("❌ Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading assignments...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Available Assignments</h2>
      <Row>
        {assignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          assignments.map((assignment) => (
            <Col md={4} sm={6} xs={12} key={assignment.id} className="mb-4">
              <Card>
                <Card.Body>
                  <div className="order">Orders</div>
                  <Card.Text>
                    <strong>Student Name:</strong> {assignment.student_name || "N/A"}<br />
                    <strong>Budget:</strong> ₹{assignment.amount || "N/A"}<br />
                    <strong>Subject :</strong> {assignment.subject || "N/A"}<br />
                    <strong>Status :</strong> {assignment.status || "N/A"}
                  </Card.Text>
                  {assignment.email && (
                    <Button variant="success" href={`mailto:${assignment.email}`}>
                      Contact Now
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default AssignmentListingPage;
