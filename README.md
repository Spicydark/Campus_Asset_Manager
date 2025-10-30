<div align="center">

# 🎓 Campus Asset Manager

### A Modern Full-Stack Web Application for Campus Resource Management

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.11-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [User Guide](#-user-guide)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

**Campus Asset Manager** is a comprehensive full-stack web application designed to streamline the management of campus resources, assets, and user requests. Built with modern technologies and best practices, it provides a secure, scalable, and user-friendly platform for educational institutions to efficiently track and manage their physical and digital assets.

### Key Highlights

- 🔐 **Secure Authentication**: JWT-based authentication with role-based access control
- 🎨 **Modern UI**: Responsive React frontend with Bootstrap 5
- 🚀 **RESTful API**: Well-structured Spring Boot backend
- 📊 **Real-time Updates**: Dynamic dashboard with statistics
- 👥 **Role Management**: Student and Admin roles with different permissions
- 📱 **Mobile Responsive**: Works seamlessly across all devices

---

## ✨ Features

### For Students

- 📝 **Request Assets**: Submit requests for available campus resources
- 👀 **Track Requests**: Monitor the status of submitted requests (Pending, Approved, Rejected)
- 🔍 **Browse Assets**: View all available assets with search and filter capabilities
- 📊 **Dashboard**: View personal statistics and recent activities

### For Administrators

- ➕ **Asset Management**: Create, update, and delete campus assets
- ✅ **Request Approval**: Review and approve/reject student requests
- 👥 **User Management**: View and manage registered users
- 📈 **Analytics**: Access comprehensive dashboard with system-wide statistics
- 🔧 **System Control**: Full CRUD operations on all entities

### Security Features

- 🔒 **JWT Authentication**: Secure token-based authentication
- 🛡️ **Role-Based Access**: Granular permissions based on user roles
- 🔐 **Password Encryption**: BCrypt hashing for secure password storage
- ⏱️ **Session Management**: Automatic token expiration and refresh handling

---

## 🏗️ Architecture

Campus Asset Manager follows a modern **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│  React Frontend (Port 3000)                                 │
│  - Components, Pages, Context, Services                     │
│  - Bootstrap UI, React Router, Axios                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API (JWT Token)
┌──────────────────────▼──────────────────────────────────────┐
│                     Application Layer                        │
│  Spring Boot Backend (Port 8080)                            │
│  - Controllers (REST API Endpoints)                         │
│  - Services (Business Logic)                                │
│  - Security (JWT, Spring Security)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │ JPA/Hibernate
┌──────────────────────▼──────────────────────────────────────┐
│                      Data Layer                              │
│  MySQL Database (Port 3306)                                 │
│  - Users, Assets, Requests Tables                           │
└─────────────────────────────────────────────────────────────┘
```

### Design Patterns Used

- **MVC (Model-View-Controller)**: Separation of concerns in backend
- **Repository Pattern**: Data access abstraction with Spring Data JPA
- **DTO Pattern**: Data transfer objects for API communication
- **Singleton Pattern**: Spring beans managed by IoC container
- **Filter Pattern**: JWT authentication filter chain

---

## 💻 Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 (LTS) | Core programming language |
| Spring Boot | 3.4.11 | Application framework |
| Spring Security | 6.x | Authentication & authorization |
| Spring Data JPA | 3.4.11 | Database access layer |
| Hibernate | 6.x | ORM framework |
| MySQL Connector | Latest | Database driver |
| JJWT | 0.11.5 | JWT token generation/validation |
| Lombok | Latest | Reduce boilerplate code |
| Maven | 3.8+ | Build and dependency management |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| React Router | 6.20.0 | Client-side routing |
| Bootstrap | 5.3.2 | CSS framework |
| React Bootstrap | 2.9.1 | React components for Bootstrap |
| Axios | 1.6.2 | HTTP client |
| JWT Decode | 4.0.0 | JWT token parsing |
| React Icons | 4.12.0 | Icon library |

### Database

- **MySQL 8.0+**: Relational database management system

### Development Tools

- **Git**: Version control
- **Maven Wrapper**: Build automation
- **npm**: Frontend package management
- **Create React App**: Frontend tooling

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required

- ☕ **Java Development Kit (JDK) 21** or later
  - Download from [OpenJDK](https://openjdk.org/) or [Oracle](https://www.oracle.com/java/technologies/downloads/)
  - Verify installation: `java -version`

- 🗄️ **MySQL 8.0** or later
  - Download from [MySQL Downloads](https://dev.mysql.com/downloads/)
  - Verify installation: `mysql --version`

- 📦 **Node.js 14** or later (for frontend)
  - Download from [Node.js Official Website](https://nodejs.org/)
  - Verify installation: `node --version` and `npm --version`

### Optional

- 🔧 **Maven 3.8+** (included via Maven Wrapper)
- 🖥️ **Git** for version control
- 📝 **VS Code** or **IntelliJ IDEA** (recommended IDEs)
- 🧪 **Postman** or **cURL** for API testing

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Spicydark/Campus_Asset_Manager.git
cd Campus_Asset_Manager
```

### 2. Database Setup

#### Create the Database

Connect to MySQL and create the database:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE campus_asset_db;
EXIT;
```

#### Configure Database Credentials

The application uses environment variables for secure configuration. You have two options:

**Option A: Environment Variables (Recommended for Production)**

Set the following environment variables:

```bash
# Unix/Linux/Mac
export SPRING_DATASOURCE_USERNAME=your_mysql_username
export SPRING_DATASOURCE_PASSWORD=your_mysql_password
export JWT_SECRET=your-super-secure-jwt-secret-key-minimum-64-characters-for-hs512

# Windows (Command Prompt)
set SPRING_DATASOURCE_USERNAME=your_mysql_username
set SPRING_DATASOURCE_PASSWORD=your_mysql_password
set JWT_SECRET=your-super-secure-jwt-secret-key-minimum-64-characters-for-hs512

# Windows (PowerShell)
$env:SPRING_DATASOURCE_USERNAME="your_mysql_username"
$env:SPRING_DATASOURCE_PASSWORD="your_mysql_password"
$env:JWT_SECRET="your-super-secure-jwt-secret-key-minimum-64-characters-for-hs512"
```

**Option B: Direct Configuration (For Development Only)**

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/campus_asset_db
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your-super-secure-jwt-secret-key-minimum-512-bits-for-hs512-algorithm
```

⚠️ **Security Warning**: Never commit credentials to version control!

### 3. Backend Setup

#### Build the Application

```bash
# Unix/Linux/Mac
./mvnw clean install

# Windows
mvnw.cmd clean install
```

This will:
- Download all Maven dependencies
- Compile the Java source code
- Run tests (if any)
- Package the application as a JAR file

### 4. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

This will install all React dependencies defined in `package.json`.

---

## ⚙️ Configuration

### Backend Configuration

The main configuration file is `src/main/resources/application.properties`:

```properties
# Application Name
spring.application.name=Campus_Asset_Manager

# Database Configuration
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/campus_asset_db}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:root}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=3600000  # 1 hour in milliseconds
```

#### Configuration Options

| Property | Description | Default Value | Environment Variable |
|----------|-------------|---------------|---------------------|
| `spring.datasource.url` | Database connection URL | jdbc:mysql://localhost:3306/campus_asset_db | `SPRING_DATASOURCE_URL` |
| `spring.datasource.username` | Database username | root | `SPRING_DATASOURCE_USERNAME` |
| `spring.datasource.password` | Database password | (required) | `SPRING_DATASOURCE_PASSWORD` |
| `spring.jpa.hibernate.ddl-auto` | Schema generation strategy | update | `SPRING_JPA_HIBERNATE_DDL_AUTO` |
| `spring.jpa.show-sql` | Log SQL statements | true | `SPRING_JPA_SHOW_SQL` |
| `jwt.secret` | Secret key for JWT signing (min 64 chars) | (required) | `JWT_SECRET` |
| `jwt.expiration` | Token expiration time (ms) | 3600000 (1 hour) | `JWT_EXPIRATION` |

**Note**: Spring Boot uses relaxed binding for environment variables:
- Property: `spring.datasource.username` → Environment Variable: `SPRING_DATASOURCE_USERNAME`
- Property: `jwt.secret` → Environment Variable: `JWT_SECRET`
- Rule: Convert property to uppercase and replace dots/hyphens with underscores
- All underscores in property names are also represented as underscores in environment variables

#### DDL Auto Options

- `create`: Drop and recreate tables each time
- `create-drop`: Create tables, drop on shutdown
- `update`: Update schema if needed (recommended for development)
- `validate`: Validate schema without changes
- `none`: No schema management

### Frontend Configuration

The frontend is configured via `frontend/package.json`:

```json
{
  "proxy": "http://localhost:8080"
}
```

This proxy configuration allows the React app to make API calls to the backend without CORS issues during development.

To change the backend API URL, update the proxy value or configure it in `frontend/src/services/api.js`.

---

## 🚀 Running the Application

### Start the Backend

From the project root directory:

```bash
# Unix/Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw.cmd spring-boot:run
```

The backend will start on **http://localhost:8080**

You should see output like:
```
Started CampusAssetManagerApplication in X.XXX seconds
```

### Start the Frontend

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm start
```

The frontend will start on **http://localhost:3000** and automatically open in your default browser.

### Verify the Setup

1. Backend health check: http://localhost:8080/api/auth/login (should return 401 without credentials)
2. Frontend: http://localhost:3000 (should show the login page)

---

## 📚 API Documentation

### Authentication Endpoints

#### Register a New User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123",
  "role": "STUDENT"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "johndoe",
  "role": "STUDENT"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```
eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNjk...
```

### Asset Endpoints

All asset endpoints require authentication (JWT token in Authorization header).

#### Get All Assets

```http
GET /api/assets
Authorization: Bearer {jwt_token}
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Laptop Dell XPS 15",
    "type": "Electronics",
    "quantity": 10,
    "status": "Available"
  }
]
```

#### Get Asset by ID

```http
GET /api/assets/{id}
Authorization: Bearer {jwt_token}
```

#### Get Assets by Status

```http
GET /api/assets/status/{status}
Authorization: Bearer {jwt_token}
```

**Status values:** `Available`, `Reserved`, `Maintenance`, `Unavailable`

#### Create Asset (Admin Only)

```http
POST /api/assets
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "Laptop Dell XPS 15",
  "type": "Electronics",
  "quantity": 10,
  "status": "Available"
}
```

#### Update Asset (Admin Only)

```http
PUT /api/assets/{id}
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "Laptop Dell XPS 15 (Updated)",
  "type": "Electronics",
  "quantity": 8,
  "status": "Available"
}
```

#### Delete Asset (Admin Only)

```http
DELETE /api/assets/{id}
Authorization: Bearer {jwt_token}
```

### Request Endpoints

#### Get All Requests

```http
GET /api/requests
Authorization: Bearer {jwt_token}
```

#### Get Request by ID

```http
GET /api/requests/{id}
Authorization: Bearer {jwt_token}
```

#### Get Requests by Status

```http
GET /api/requests/status/{status}
Authorization: Bearer {jwt_token}
```

**Status values:** `PENDING`, `APPROVED`, `REJECTED`

#### Get Requests by User

```http
GET /api/requests/user/{userId}
Authorization: Bearer {jwt_token}
```

#### Create Request

```http
POST /api/requests
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "user": {
    "id": 1
  },
  "asset": {
    "id": 1
  },
  "comments": "Need for final year project"
}
```

The request date is automatically set to the current date, and status is set to `PENDING`.

#### Update Request Status (Admin Only)

```http
PATCH /api/requests/{id}/status
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "status": "APPROVED",
  "comments": "Approved for 2 weeks"
}
```

#### Delete Request

```http
DELETE /api/requests/{id}
Authorization: Bearer {jwt_token}
```

### User Endpoints

#### Get All Users (Admin Only)

```http
GET /api/users
Authorization: Bearer {jwt_token}
```

#### Get User by ID (Admin Only)

```http
GET /api/users/{id}
Authorization: Bearer {jwt_token}
```

#### Get User by Username (Admin Only)

```http
GET /api/users/username/{username}
Authorization: Bearer {jwt_token}
```

#### Delete User (Admin Only)

```http
DELETE /api/users/{id}
Authorization: Bearer {jwt_token}
```

**Note:** Users with existing requests cannot be deleted due to foreign key constraints.

---

## 👥 User Guide

### Roles and Permissions

#### Student Role

Students have access to:

- ✅ View dashboard with personal statistics
- ✅ Browse all available assets
- ✅ Create asset requests
- ✅ View their own requests
- ✅ Delete their own requests
- ❌ Cannot create, update, or delete assets
- ❌ Cannot approve/reject requests
- ❌ Cannot view or manage other users

#### Admin Role

Admins have full access to all features:

- ✅ All student permissions
- ✅ Create, update, and delete assets
- ✅ View all users in the system
- ✅ Approve or reject any request
- ✅ View all requests from all users
- ✅ Delete users (if no associated requests)
- ✅ Manage system-wide settings

### Getting Started

#### For Students

1. **Register**: Navigate to the registration page and create an account with role "Student"
2. **Login**: Use your credentials to log in
3. **Browse Assets**: View available campus assets
4. **Create Request**: Submit a request for an asset you need
5. **Track Status**: Monitor your request status (Pending/Approved/Rejected)

#### For Admins

1. **Login**: Use admin credentials to access the system
2. **Manage Assets**: Add new assets, update quantities, or remove outdated items
3. **Review Requests**: Check pending requests from students
4. **Approve/Reject**: Update request status with comments
5. **User Management**: View registered users and manage accounts

### Using the Web Interface

#### Dashboard

The dashboard provides an at-a-glance view of:
- Total number of assets
- Total number of requests
- Total number of users (Admin only)
- Quick access to main features

#### Asset Management

**Viewing Assets:**
- Filter by status (All, Available, Reserved, Maintenance)
- Search by name or type
- View detailed information

**Creating Assets (Admin):**
1. Click "Add Asset" button
2. Fill in the form (Name, Type, Quantity, Status)
3. Submit to create

#### Request Management

**Creating Requests (Student):**
1. Navigate to Assets page
2. Click "Request" button on desired asset
3. Add comments explaining your need
4. Submit request

**Managing Requests (Admin):**
1. View all pending requests
2. Click on a request to see details
3. Approve or reject with comments

---

## 📁 Project Structure

### Backend Structure

```
src/main/java/com/surya/Campus_Asset_Manager/
├── CampusAssetManagerApplication.java  # Main Spring Boot application
├── Controller/                          # REST API Controllers
│   ├── AssetController.java            # Asset CRUD endpoints
│   ├── AuthController.java             # Authentication endpoints
│   ├── RequestController.java          # Request management endpoints
│   └── UserController.java             # User management endpoints
├── Model/                               # Entity/Domain models
│   ├── Asset.java                      # Asset entity
│   ├── LoginRequest.java               # Login DTO
│   ├── Request.java                    # Request entity
│   ├── Role.java                       # Role enum
│   └── User.java                       # User entity
├── Repository/                          # Data access layer
│   ├── AssetRepository.java            # Asset repository
│   ├── RequestRepository.java          # Request repository
│   └── UserRepository.java             # User repository
├── Security/                            # Security configuration
│   ├── CustomUserDetailsService.java   # User details service
│   ├── JwtAuthenticationEntryPoint.java # Auth entry point
│   ├── JwtAuthenticationFilter.java    # JWT filter
│   ├── JwtTokenProvider.java           # JWT utility
│   └── SecurityConfig.java             # Security configuration
└── Exception/                           # Custom exceptions
    ├── DuplicateUsernameException.java
    └── UserDeletionException.java
```

### Frontend Structure

```
frontend/src/
├── App.js                              # Main app component with routes
├── index.js                            # Application entry point
├── index.css                           # Global styles
├── components/                         # Reusable components
│   ├── AssetFormModal.js              # Asset creation/edit modal
│   ├── NavigationBar.js               # Top navigation bar
│   └── RequestFormModal.js            # Request creation modal
├── context/                            # React Context providers
│   └── AuthContext.js                 # Authentication context
├── pages/                              # Page components
│   ├── AssetList.js                   # Asset management page
│   ├── Dashboard.js                   # Main dashboard
│   ├── Login.js                       # Login page
│   ├── Register.js                    # Registration page
│   ├── RequestList.js                 # Request management page
│   └── UserList.js                    # User management page (admin)
└── services/                           # API services
    └── api.js                         # Axios configuration & API calls
```

---

## 🛠️ Development

### Backend Development

#### Adding a New Entity

1. Create entity class in `Model/` package
2. Add `@Entity` annotation and JPA mappings
3. Create repository interface extending `JpaRepository`
4. Create controller with REST endpoints
5. Update security configuration if needed

Example:
```java
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String code;
}
```

#### Adding a New API Endpoint

1. Add method to controller:
```java
@GetMapping("/departments")
public List<Department> getAllDepartments() {
    return departmentRepository.findAll();
}
```

2. Update security config if endpoint needs protection

#### Running in Development Mode

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend Development

#### Adding a New Page

1. Create component in `pages/` directory
2. Add route in `App.js`:
```jsx
<Route path="/new-page" element={<NewPage />} />
```

3. Add navigation link in `NavigationBar.js`

#### Making API Calls

Use the configured Axios instance from `services/api.js`:

```javascript
import api from '../services/api';

const fetchData = async () => {
  try {
    const response = await api.get('/api/endpoint');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Styling Guidelines

- Use Bootstrap classes for consistency
- Add custom styles in component files or `index.css`
- Follow mobile-first responsive design
- Maintain consistent color scheme

### Code Style

#### Backend

- Follow Java naming conventions (CamelCase)
- Use Lombok annotations to reduce boilerplate
- Add JavaDoc comments for public APIs
- Keep controllers thin, business logic in services

#### Frontend

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Keep components small and focused
- Extract reusable logic into custom hooks

### Version Control

#### Branch Naming

- `feature/feature-name` for new features
- `bugfix/bug-description` for bug fixes
- `hotfix/critical-fix` for urgent fixes

#### Commit Messages

Follow conventional commits:
- `feat: add user profile page`
- `fix: resolve JWT expiration issue`
- `docs: update API documentation`
- `refactor: improve asset service logic`

---

## 🧪 Testing

### Backend Testing

The project uses JUnit 5 and Spring Boot Test for backend testing.

#### Running Tests

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=AssetControllerTest

# Run with coverage
./mvnw test jacoco:report
```

#### Writing Tests

Create test classes in `src/test/java`:

```java
@SpringBootTest
@AutoConfigureMockMvc
class AssetControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testGetAllAssets() throws Exception {
        mockMvc.perform(get("/api/assets"))
            .andExpect(status().isOk());
    }
}
```

### Frontend Testing

#### Running Tests

```bash
cd frontend
npm test
```

#### Writing Tests

Create test files alongside components:

```javascript
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard', () => {
  render(<Dashboard />);
  const element = screen.getByText(/Dashboard/i);
  expect(element).toBeInTheDocument();
});
```

### Manual Testing

#### Using cURL

Test endpoints with cURL:

```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123","role":"STUDENT"}'

# Login
TOKEN=$(curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}')

# Get assets
curl -X GET http://localhost:8080/api/assets \
  -H "Authorization: Bearer $TOKEN"
```

#### Using Postman

1. Import the API collection (if available)
2. Set environment variables for base URL and token
3. Test each endpoint systematically
4. Create test suites for regression testing

---

## 🚢 Deployment

### Production Considerations

#### Backend

1. **Change JWT Secret**: Use a strong, unique secret key
2. **Update Database Credentials**: Use production database
3. **Disable SQL Logging**: Set `spring.jpa.show-sql=false`
4. **Enable HTTPS**: Configure SSL certificates
5. **Set Profile**: Use production profile

```properties
spring.profiles.active=prod
spring.jpa.show-sql=false
jwt.expiration=7200000  # 2 hours
```

#### Frontend

1. **Build for Production**:
```bash
cd frontend
npm run build
```

2. **Serve Static Files**: Use Nginx or Apache
3. **Update API URL**: Change proxy to production backend URL
4. **Enable HTTPS**: Configure SSL certificates

### Deployment Options

#### Option 1: Traditional Server

1. **Backend**: Deploy JAR file to server
```bash
java -jar Campus_Asset_Manager-0.0.1-SNAPSHOT.jar
```

2. **Frontend**: Serve built files with Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /var/www/frontend/build;
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080;
    }
}
```

#### Option 2: Docker

Create `Dockerfile` for backend:
```dockerfile
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_DATABASE: campus_asset_db
      MYSQL_ROOT_PASSWORD: password
    ports:
      - "3306:3306"
  
  backend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mysql
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/campus_asset_db
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

#### Option 3: Cloud Platforms

- **AWS**: EC2, RDS, S3 for static files
- **Azure**: App Service, Azure Database for MySQL
- **Google Cloud**: App Engine, Cloud SQL
- **Heroku**: Easy deployment for both frontend and backend

### Environment Variables for Production

```bash
# Database
export SPRING_DATASOURCE_URL=jdbc:mysql://prod-server:3306/campus_asset_db
export SPRING_DATASOURCE_USERNAME=prod_user
export SPRING_DATASOURCE_PASSWORD=secure_password

# JWT
export JWT_SECRET=your-production-secret-key-very-long-and-secure
export JWT_EXPIRATION=7200000

# Server
export SERVER_PORT=8080
```

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Issue: "Failed to configure a DataSource"**

**Cause**: MySQL is not running or credentials are incorrect

**Solution**:
1. Verify MySQL is running: `mysql -u root -p`
2. Check database exists: `SHOW DATABASES;`
3. Verify credentials in `application.properties`
4. Ensure environment variables are set correctly

---

**Issue: "401 Unauthorized" on API calls**

**Cause**: Missing or invalid JWT token

**Solution**:
1. Ensure you're logged in
2. Check token is included in Authorization header
3. Verify token hasn't expired (default: 1 hour)
4. Login again to get a fresh token

---

**Issue: "403 Forbidden"**

**Cause**: Insufficient permissions for the endpoint

**Solution**:
1. Check user role (Student vs Admin)
2. Verify endpoint permissions in SecurityConfig
3. Ensure proper role is assigned during registration

---

**Issue: JWT token keeps expiring**

**Cause**: Short expiration time or system time mismatch

**Solution**:
1. Increase token expiration in `application.properties`:
```properties
jwt.expiration=7200000  # 2 hours
```
2. Verify system clock is correct
3. Implement token refresh mechanism

---

**Issue: "Port 8080 already in use"**

**Cause**: Another application is using port 8080

**Solution**:
1. Stop the other application
2. Or change the port in `application.properties`:
```properties
server.port=8081
```

---

#### Frontend Issues

**Issue: "Cannot connect to backend"**

**Cause**: Backend not running or CORS issues

**Solution**:
1. Verify backend is running on port 8080
2. Check proxy configuration in `package.json`
3. Verify CORS is enabled in Spring Security config

---

**Issue: "Login works but page doesn't update"**

**Cause**: AuthContext not properly configured

**Solution**:
1. Ensure App is wrapped with AuthProvider
2. Check localStorage for token storage
3. Verify axios interceptors are set up

---

**Issue: "Module not found" errors**

**Cause**: Missing dependencies

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

**Issue: "Proxy error: Could not proxy request"**

**Cause**: Backend URL incorrect or not running

**Solution**:
1. Start backend first
2. Verify backend is accessible at http://localhost:8080
3. Check proxy configuration matches backend port

---

#### Database Issues

**Issue: "Table doesn't exist"**

**Cause**: Schema not created

**Solution**:
1. Verify `spring.jpa.hibernate.ddl-auto=update` in properties
2. Check database connection is successful
3. Manually create tables if needed (not recommended)

---

**Issue: "Foreign key constraint fails" when deleting user**

**Cause**: User has associated requests

**Solution**:
1. Delete user's requests first
2. Or implement cascade delete (not recommended)
3. Application shows helpful error message

---

**Issue: "Connection timeout"**

**Cause**: Database server not responding

**Solution**:
1. Check MySQL service is running
2. Verify firewall isn't blocking port 3306
3. Increase connection timeout in properties:
```properties
spring.datasource.hikari.connection-timeout=30000
```

---

### Debugging Tips

#### Enable Debug Logging

Add to `application.properties`:
```properties
logging.level.com.surya.Campus_Asset_Manager=DEBUG
logging.level.org.springframework.security=DEBUG
logging.level.org.springframework.web=DEBUG
```

#### Check Logs

Backend logs in console or:
```bash
tail -f logs/spring-boot-application.log
```

Frontend logs in browser console (F12)

#### Use Development Tools

- **Backend**: IntelliJ IDEA debugger, Spring Boot Actuator
- **Frontend**: React DevTools, Redux DevTools
- **API**: Postman, cURL, Thunder Client
- **Database**: MySQL Workbench, DBeaver

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   - Click the "Fork" button on GitHub

2. **Clone Your Fork**
```bash
git clone https://github.com/your-username/Campus_Asset_Manager.git
cd Campus_Asset_Manager
```

3. **Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features

5. **Test Your Changes**
```bash
./mvnw test  # Backend tests
cd frontend && npm test  # Frontend tests
```

6. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add your feature description"
```

7. **Push to Your Fork**
```bash
git push origin feature/your-feature-name
```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

### Contribution Guidelines

#### Code Style

- **Java**: Follow Google Java Style Guide
- **JavaScript**: Follow Airbnb JavaScript Style Guide
- **Use formatters**: Prettier for JS, Eclipse formatter for Java

#### Commit Messages

Follow Conventional Commits:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

#### Pull Request Guidelines

- **Title**: Clear and descriptive
- **Description**: Explain what and why
- **Tests**: Include test cases
- **Documentation**: Update README if needed
- **Screenshots**: Include for UI changes

### Reporting Issues

Found a bug? Please create an issue with:

- **Title**: Short, descriptive summary
- **Description**: Detailed explanation
- **Steps to Reproduce**: How to trigger the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, Java version, browser, etc.
- **Screenshots**: If applicable

### Feature Requests

Have an idea? Open an issue with:

- **Title**: Feature name
- **Description**: What it should do
- **Use Case**: Why it's needed
- **Mockups**: If applicable

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Spicydark

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 💬 Support

### Get Help

- 📖 **Documentation**: Read this README thoroughly
- 🐛 **Issues**: [GitHub Issues](https://github.com/Spicydark/Campus_Asset_Manager/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/Spicydark/Campus_Asset_Manager/discussions)

### Contact

- **GitHub**: [@Spicydark](https://github.com/Spicydark)
- **Repository**: [Campus_Asset_Manager](https://github.com/Spicydark/Campus_Asset_Manager)

### Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [React Documentation](https://react.dev/)
- [Spring Security Documentation](https://docs.spring.io/spring-security/reference/index.html)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing UI library
- Bootstrap team for the responsive CSS framework
- All contributors and users of this project

---

## 📊 Project Status

**Status**: ✅ Active Development

**Version**: 1.0.0

**Last Updated**: October 2025

---

<div align="center">

### ⭐ If you find this project useful, please consider giving it a star!

**Made with ❤️ by [Spicydark](https://github.com/Spicydark)**

</div>
