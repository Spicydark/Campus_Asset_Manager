import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { requestAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RequestFormModal = ({ show, onHide, onSuccess, assets }) => {
  const { user } = useAuth();
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAssetId) {
      setError('Please select an asset');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Note: Backend expects user and asset objects with id property
      const requestData = {
        user: { id: user.id },
        asset: { id: parseInt(selectedAssetId) },
        status: 'PENDING',
        requestDate: new Date().toISOString(),
      };

      await requestAPI.create(requestData);
      setSelectedAssetId('');
      onSuccess();
    } catch (err) {
      setError(err.response?.data || 'Failed to create request. Make sure the asset and user exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedAssetId('');
    setError('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Asset Request</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Select Asset</Form.Label>
            <Form.Select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              required
            >
              <option value="">-- Choose an available asset --</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} - {asset.description}
                </option>
              ))}
            </Form.Select>
            {assets.length === 0 && (
              <Form.Text className="text-danger">
                No available assets at the moment
              </Form.Text>
            )}
          </Form.Group>

          <Alert variant="info">
            <small>
              Your request will be submitted with status <strong>PENDING</strong> and will be reviewed by an administrator.
            </small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading || assets.length === 0}>
            {loading ? 'Creating...' : 'Create Request'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RequestFormModal;
