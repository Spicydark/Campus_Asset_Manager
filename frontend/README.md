# Campus Asset Manager - Frontend

A React-based frontend application for the Campus Asset Manager system, featuring JWT authentication, role-based access control, and full CRUD operations for assets, requests, and users.

## Features

### Authentication
- User registration with role selection (Student/Admin)
- JWT-based login system
- Token-based session management
- Automatic token expiration handling

### Dashboard
- Overview statistics cards
- Real-time count of assets, requests, and users
- Role-based visibility

### Asset Management
- View all assets with filtering by status
- Search assets by name or description
- Admin-only: Create, update, and delete assets
- Asset status management (Available, Reserved, Maintenance)

### Request Management
- Students: Create asset requests for available assets
- Admins: View all requests and update their status (Pending, Approved, Rejected)
- Filter requests by status
- Delete requests

### User Management (Admin Only)
- View all registered users
- Search users by username, email, or full name
- Delete users (with foreign key constraint handling)
- Role badges (Student/Admin)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The application is pre-configured to proxy API requests to `http://localhost:8080`. If your backend runs on a different port, update the `proxy` field in `package.json`:

```json
"proxy": "http://localhost:YOUR_PORT"
```

## Running the Application

1. Make sure the backend Spring Boot application is running on port 8080

2. Start the React development server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Building for Production

To create an optimized production build:

```bash
npm run build
```

The build files will be generated in the `build` directory.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AssetFormModal.js       # Modal for creating/editing assets
│   │   ├── NavigationBar.js         # Top navigation bar
│   │   └── RequestFormModal.js      # Modal for creating requests
│   ├── context/
│   │   └── AuthContext.js           # Authentication context provider
│   ├── pages/
│   │   ├── AssetList.js             # Asset management page
│   │   ├── Dashboard.js             # Main dashboard
│   │   ├── Login.js                 # Login page
│   │   ├── Register.js              # Registration page
│   │   ├── RequestList.js           # Request management page
│   │   └── UserList.js              # User management page (admin)
│   ├── services/
│   │   └── api.js                   # Axios configuration and API endpoints
│   ├── App.js                       # Main app component with routing
│   ├── index.js                     # Application entry point
│   └── index.css                    # Global styles
├── package.json
└── README.md
```

## API Integration

The frontend communicates with the backend API through axios interceptors that automatically:
- Add JWT tokens to request headers
- Handle 401 unauthorized responses
- Redirect to login on token expiration

### Available API Endpoints

**Authentication:**
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login and receive JWT token

**Assets:**
- GET `/api/assets` - Get all assets
- GET `/api/assets/{id}` - Get asset by ID
- GET `/api/assets/status/{status}` - Get assets by status
- POST `/api/assets` - Create new asset (Admin)
- PUT `/api/assets/{id}` - Update asset (Admin)
- DELETE `/api/assets/{id}` - Delete asset (Admin)

**Requests:**
- GET `/api/requests` - Get all requests
- GET `/api/requests/{id}` - Get request by ID
- GET `/api/requests/status/{status}` - Get requests by status
- GET `/api/requests/user/{userId}` - Get requests by user
- POST `/api/requests` - Create new request
- PATCH `/api/requests/{id}/status` - Update request status (Admin)
- DELETE `/api/requests/{id}` - Delete request

**Users:**
- GET `/api/users` - Get all users (Admin)
- GET `/api/users/{id}` - Get user by ID (Admin)
- GET `/api/users/username/{username}` - Get user by username (Admin)
- DELETE `/api/users/{id}` - Delete user (Admin, requires no existing requests)

## User Roles

### STUDENT
- View dashboard statistics
- Browse all assets
- Create asset requests
- View own requests
- Delete own requests

### ADMIN
- All student permissions
- Create, update, and delete assets
- View all users
- Update request status (Approve/Reject)
- Delete users (if they have no existing requests)
- View all requests from all users

## Key Features

### JWT Authentication
- Tokens stored in localStorage
- Automatic token injection in API requests
- Token expiration handling with redirect to login

### Role-Based Access Control
- Private routes protected by authentication check
- Admin-only routes for user management
- Conditional UI rendering based on role

### Error Handling
- Foreign key constraint errors handled gracefully
- User-friendly error messages
- Success notifications for actions

### Responsive Design
- Bootstrap 5 for responsive layout
- Mobile-friendly navigation
- Optimized for all screen sizes

## Styling

The application uses:
- Bootstrap 5.3.2 for component styling
- React Icons for icon library
- Custom CSS for additional styling (gradients, hover effects, status badges)

## Troubleshooting

### Backend Connection Issues
- Ensure the backend is running on `http://localhost:8080`
- Check that the proxy configuration in package.json is correct
- Verify CORS is properly configured on the backend

### Authentication Issues
- Clear localStorage if you experience login loops
- Check that JWT tokens are being generated correctly by the backend
- Verify token expiration time is set correctly (default: 1 hour)

### Foreign Key Errors
- When deleting a user, ensure they have no existing requests
- The application will display a helpful error message if deletion fails

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## Technologies Used

- React 18.2.0
- React Router 6.20.0
- Bootstrap 5.3.2
- Axios 1.6.2
- JWT Decode 4.0.0
- React Icons 4.12.0

## License

This project is part of the Campus Asset Manager system.
