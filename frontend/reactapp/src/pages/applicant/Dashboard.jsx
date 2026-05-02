import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';

export default function DashboardApplicant() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Applicant Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Apply Loan</Card.Title>
              <Card.Text>Start a new loan application</Card.Text>
              <Button onClick={() => navigate('/applicant/apply')}>Apply</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>My Applications</Card.Title>
              <Card.Text>View your applications and status</Card.Text>
              <Button onClick={() => navigate('/applicant/my-applications')}>View</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
