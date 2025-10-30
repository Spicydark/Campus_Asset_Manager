import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Badge, Alert, Modal, Form } from 'react-bootstrap';
import { userAPI } from '../services/api';
import { FaTrash, FaSearch } from 'react-icons/fa';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterUsers = useCallback(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setDeleteError('');
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await userAPI.delete(deleteUserId);
      setSuccess('User deleted successfully');
      setShowDeleteModal(false);
      setDeleteError('');
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // Handle foreign key constraint error (409 Conflict)
      if (err.response?.status === 409) {
        setDeleteError(
          err.response?.data || 
          'Cannot delete this user because they have existing asset requests. Please delete their requests first.'
        );
      } else {
        setDeleteError(err.response?.data || 'Failed to delete user');
      }
    }
  };

  const getRoleBadge = (role) => {
    return (
      <Badge bg={role === 'ADMIN' ? 'danger' : 'primary'}>
        {role}
      </Badge>
    );
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
        <h2>User Management</h2>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Search */}
      <Form.Group className="mb-3">
        <Form.Label>
          <FaSearch className="me-2" />
          Search Users
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by username, email, or full name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {/* User Table */}
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>{getRoleBadge(user.role)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteError ? (
            <Alert variant="danger">
              <strong>Error:</strong> {deleteError}
            </Alert>
          ) : (
            <p>Are you sure you want to delete this user?</p>
          )}
          {!deleteError && (
            <Alert variant="warning">
              <small>
                <strong>Note:</strong> You cannot delete a user who has existing asset requests.
                Please delete their requests first.
              </small>
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {deleteError ? 'Close' : 'Cancel'}
          </Button>
          {!deleteError && (
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
