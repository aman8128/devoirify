import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import "./HomePage.css";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user?.role === "writer") {
    return <WriterHome />;
  }

  return <StudentHome />;
};

const StudentHome = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-center py-5">
        <Container>
          <h1 className="hero-title">Premium Assignment Writing Service</h1>
          <p className="lead">
            Get high-quality assignments delivered on time by expert writers.
          </p>
          <Link to={isAuthenticated ? "/place-order" : "/signup"}>
            <Button variant="warning" size="lg" className="mt-3 hero-btn">
              {isAuthenticated ? "Place an Order" : "Get Started"}
            </Button>
          </Link>
        </Container>
      </div>

      {/* Steps Section */}
      <Container className="mt-5 text-center">
        <h2 className="section-title">How It Works</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="step-card">
              <Card.Body>
                <h4>1. Submit Your Order</h4>
                <p>Fill in the details about your assignment requirements.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="step-card">
              <Card.Body>
                <h4>2. Make Payment</h4>
                <p>Secure online payments with multiple options available.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="step-card">
              <Card.Body>
                <h4>3. Get Your Work</h4>
                <p>Receive your completed assignment before the deadline.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="mt-5">
        <h2 className="section-title text-center">Why Choose Us?</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <h4>Expert Writers</h4>
                <p>Our team consists of professionals with vast experience.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <h4>100% Original</h4>
                <p>We ensure plagiarism-free content with detailed research.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <h4>On-Time Delivery</h4>
                <p>We respect deadlines and always deliver on time.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Contact Section */}
      <div className="contact-section text-center my-5">
        <h3>Have any questions?</h3>
        <p>Contact our support team for assistance.</p>
        <Button variant="primary" className="contact-btn">Contact Us</Button>
      </div>
    </>
  );
};

const WriterHome = () => {
  return (
    <>
      <div className="hero-section text-center py-5 bg-dark text-white">
        <Container>
          <h1 className="hero-title">Welcome Writers</h1>
          <p className="lead">View and claim available assignments</p>
          <Link to="/available-orders">
            <Button variant="light" size="lg" className="mt-3">
              View Available Orders
            </Button>
          </Link>
        </Container>
      </div>

      {/* Why Work With Us */}
      <Container className="mt-5">
        <h2 className="section-title text-center">Why Work With Us?</h2>
        <Row className="mt-4">
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <h4>Competitive Pay</h4>
                <p>Earn competitive rates for your expertise and knowledge.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <h4>Flexible Schedule</h4>
                <p>Work on your own schedule and take assignments as per your time.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <h4>Growth Opportunities</h4>
                <p>Improve your skills by writing across various academic subjects.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
