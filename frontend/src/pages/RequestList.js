import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Badge, Form, Row, Col, Alert, Modal } from 'react-bootstrap';
import { requestAPI, assetAPI, userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import RequestFormModal from '../components/RequestFormModal';

const RequestList = () => {
  const { isAdmin } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deleteRequestId, setDeleteRequestId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const requestsRes = await requestAPI.getAll();
      const assetsRes = await assetAPI.getAll();
      
      setRequests(requestsRes.data);
      setAssets(assetsRes.data);

      if (isAdmin()) {
        const usersRes = await userAPI.getAll();
        setUsers(usersRes.data);
      }

      setError('');
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const filterRequests = useCallback(() => {
    let filtered = requests;

    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((req) => req.status === filterStatus);
    }

    setFilteredRequests(filtered);
  }, [requests, filterStatus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    filterRequests();
  }, [filterRequests]);

  

  const handleCreateRequest = () => {
    setShowFormModal(true);
  };

  const handleUpdateStatus = (request) => {
    setSelectedRequest(request);
    setNewStatus(request.status);
    setShowUpdateModal(true);
  };

  const handleUpdateConfirm = async () => {
    try {
      await requestAPI.updateStatus(selectedRequest.id, { status: newStatus });
      setSuccess('Request status updated successfully');
      setShowUpdateModal(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data || 'Failed to update request status');
      setShowUpdateModal(false);
    }
  };

  const handleDeleteClick = (requestId) => {
    setDeleteRequestId(requestId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await requestAPI.delete(deleteRequestId);
      setSuccess('Request deleted successfully');
      setShowDeleteModal(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data || 'Failed to delete request');
      setShowDeleteModal(false);
    }
  };

  const handleFormSuccess = () => {
    setShowFormModal(false);
    fetchData();
    setSuccess('Request created successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const getStatusBadge = (status) => {
    const variants = {
      PENDING: 'warning',
      APPROVED: 'success',
      REJECTED: 'danger',
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getAssetName = (assetId) => {
    const asset = assets.find((a) => a.id === assetId);
    return asset ? asset.name : `Asset #${assetId}`;
  };

  const getUserName = (userId) => {
    if (isAdmin() && users.length > 0) {
      const userObj = users.find((u) => u.id === userId);
      return userObj ? userObj.username : `User #${userId}`;
    }
    return `User #${userId}`;
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Requests</h2>
        {!isAdmin() && (
          <Button variant="primary" onClick={handleCreateRequest}>
            <FaPlus className="me-2" />
            Create Request
          </Button>
        )}
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Filters */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>
              <FaFilter className="me-2" />
              Filter by Status
            </Form.Label>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Request Table */}
      {filteredRequests.length === 0 ? (
        <div className="empty-state">
          <p>No requests found</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              {isAdmin() && <th>User</th>}
              <th>Asset</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                {isAdmin() && <td>{getUserName(request.user?.id)}</td>}
                <td>{getAssetName(request.asset?.id)}</td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>{getStatusBadge(request.status)}</td>
                <td>
                  {isAdmin() && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleUpdateStatus(request)}
                    >
                      <FaEdit /> Update Status
                    </Button>
                  )}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(request.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Request Form Modal */}
      <RequestFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSuccess={handleFormSuccess}
        assets={assets.filter((a) => a.status === 'AVAILABLE')}
      />

      {/* Update Status Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Request Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateConfirm}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RequestList;
