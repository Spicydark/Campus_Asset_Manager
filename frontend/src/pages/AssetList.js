import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Badge, Form, Row, Col, Alert, Modal } from 'react-bootstrap';
import { assetAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import AssetFormModal from '../components/AssetFormModal';

const AssetList = () => {
  const { isAdmin } = useAuth();
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [deleteAssetId, setDeleteAssetId] = useState(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const filterAssets = useCallback(() => {
    let filtered = assets;

    // Filter by status
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((asset) => asset.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAssets(filtered);
  }, [assets, filterStatus, searchTerm]);

  useEffect(() => {
    filterAssets();
  }, [filterAssets]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const response = await assetAPI.getAll();
      setAssets(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load assets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setShowFormModal(true);
  };

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setShowFormModal(true);
  };

  const handleDeleteClick = (assetId) => {
    setDeleteAssetId(assetId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await assetAPI.delete(deleteAssetId);
      setSuccess('Asset deleted successfully');
      setShowDeleteModal(false);
      fetchAssets();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data || 'Failed to delete asset');
      setShowDeleteModal(false);
    }
  };

  const handleFormSuccess = () => {
    setShowFormModal(false);
    fetchAssets();
    setSuccess(selectedAsset ? 'Asset updated successfully' : 'Asset added successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const getStatusBadge = (status) => {
    const variants = {
      AVAILABLE: 'success',
      RESERVED: 'warning',
      MAINTENANCE: 'danger',
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
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
        <h2>Assets</h2>
        {isAdmin() && (
          <Button variant="primary" onClick={handleAddAsset}>
            <FaPlus className="me-2" />
            Add Asset
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
              <option value="AVAILABLE">Available</option>
              <option value="RESERVED">Reserved</option>
              <option value="MAINTENANCE">Maintenance</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Asset Table */}
      {filteredAssets.length === 0 ? (
        <div className="empty-state">
          <p>No assets found</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              {isAdmin() && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.description}</td>
                <td>{getStatusBadge(asset.status)}</td>
                {isAdmin() && (
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditAsset(asset)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteClick(asset.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Asset Form Modal */}
      <AssetFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSuccess={handleFormSuccess}
        asset={selectedAsset}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this asset?</Modal.Body>
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

export default AssetList;
