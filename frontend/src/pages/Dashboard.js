import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { assetAPI, requestAPI, userAPI } from '../services/api';
import { FaBox, FaClipboardList, FaUsers, FaCheckCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalAssets: 0,
    availableAssets: 0,
    totalRequests: 0,
    pendingRequests: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [assetsRes, requestsRes] = await Promise.all([
          assetAPI.getAll(),
          requestAPI.getAll(),
        ]);

        const assets = assetsRes.data;
        const requests = requestsRes.data;

        const newStats = {
          totalAssets: assets.length,
          availableAssets: assets.filter((a) => a.status === 'AVAILABLE').length,
          totalRequests: requests.length,
          pendingRequests: requests.filter((r) => r.status === 'PENDING').length,
        };

        // Fetch user count only for admins
        if (isAdmin()) {
          const usersRes = await userAPI.getAll();
          newStats.totalUsers = usersRes.data.length;
        }

        setStats(newStats);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Welcome, {user?.username}!</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="dashboard-card border-primary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Assets</h6>
                  <h2 className="mb-0">{stats.totalAssets}</h2>
                </div>
                <FaBox size={40} className="text-primary" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="dashboard-card border-success">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Available Assets</h6>
                  <h2 className="mb-0">{stats.availableAssets}</h2>
                </div>
                <FaCheckCircle size={40} className="text-success" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="dashboard-card border-info">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Total Requests</h6>
                  <h2 className="mb-0">{stats.totalRequests}</h2>
                </div>
                <FaClipboardList size={40} className="text-info" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="dashboard-card border-warning">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">Pending Requests</h6>
                  <h2 className="mb-0">{stats.pendingRequests}</h2>
                </div>
                <FaClipboardList size={40} className="text-warning" />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {isAdmin() && (
          <Col md={6} lg={3}>
            <Card className="dashboard-card border-secondary">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-2">Total Users</h6>
                    <h2 className="mb-0">{stats.totalUsers}</h2>
                  </div>
                  <FaUsers size={40} className="text-secondary" />
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Body>
              <h5>Quick Actions</h5>
              <p className="text-muted">
                Use the navigation menu above to manage assets, view requests, and more.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
