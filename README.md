# Campus Asset Manager - Project Documentation

## Overview
Campus Asset Manager is a Spring Boot application for managing campus assets, user requests, and authentication using JWT tokens.

## Recent Fixes and Enhancements

### 🔧 Critical Fixes Applied

1. **Spring Security Configuration (Modern API)**
   - Migrated from deprecated `authorizeRequests()` to `authorizeHttpRequests()`
   - Updated from deprecated `csrf().disable()` to lambda-based configuration
   - Added stateless session management for JWT authentication
   - Fixed authentication filter integration

2. **User Authentication & Authorization**
   - Fixed `UserRepository` return type mismatch
   - Corrected `CustomUserDetailsService` to properly map User entity to Spring Security UserDetails
   - Created separate `Role` enum for proper visibility
   - Added role-based authorization with `ROLE_STUDENT` and `ROLE_ADMIN`

3. **JWT Token Management**
   - Fixed JWT secret key (moved to application.properties)
   - Increased secret key length to meet HS512 requirements (512 bits minimum)
   - Added configurable token expiration
   - Fixed JwtAuthenticationFilter bug (was passing null instead of response)
   - Added @NonNull annotations for filter parameters

4. **Dependency Management**
   - Updated Spring Boot from 3.4.0 to 3.4.11 (latest patch)
   - Configured Maven Compiler Plugin for Java 21
   - Added PasswordEncoder bean to SecurityConfig

5. **Code Quality**
   - Removed all unused imports
   - Fixed all deprecation warnings
   - Added proper null safety annotations

### 🚀 New Features Implemented

#### Asset Management (Enhanced)
- ✅ Get all assets
- ✅ Get asset by ID
- ✅ Get assets by status
- ✅ Create new asset
- ✅ Update asset
- ✅ Delete asset

#### Request Management (Enhanced)
- ✅ Get all requests
- ✅ Get request by ID
- ✅ Get requests by status
- ✅ Get requests by user ID
- ✅ Create new request (auto-sets date and PENDING status)
- ✅ Update request status with comments
- ✅ Delete request

#### User Management (New)
- ✅ Get all users
- ✅ Get user by ID
- ✅ Get user by username
- ✅ Delete user

## API Endpoints

### Authentication Endpoints (Public)
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login and get JWT token
```

### Asset Endpoints (Protected)
```
GET    /api/assets              - Get all assets
GET    /api/assets/{id}         - Get asset by ID
GET    /api/assets/status/{status} - Get assets by status
POST   /api/assets              - Create new asset
PUT    /api/assets/{id}         - Update asset
DELETE /api/assets/{id}         - Delete asset
```

### Request Endpoints (Protected)
```
GET    /api/requests                  - Get all requests
GET    /api/requests/{id}             - Get request by ID
GET    /api/requests/status/{status}  - Get requests by status
GET    /api/requests/user/{userId}    - Get requests by user
POST   /api/requests                  - Create new request
PATCH  /api/requests/{id}/status      - Update request status
DELETE /api/requests/{id}             - Delete request
```

### User Endpoints (Protected)
```
GET    /api/users                - Get all users
GET    /api/users/{id}           - Get user by ID
GET    /api/users/username/{username} - Get user by username
DELETE /api/users/{id}           - Delete user
```

## Configuration

### application.properties
```properties
spring.application.name=Campus_Asset_Manager

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/campus_asset_db
spring.datasource.username=root
spring.datasource.password=Surya123!
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=campus-asset-manager-super-secure-secret-key-for-jwt-token-generation-minimum-512-bits
jwt.expiration=3600000
```

⚠️ **Important**: Change the JWT secret in production to your own secure key!

## How to Run

### Prerequisites
- Java 21 (LTS)
- MySQL 8.0+
- Maven 3.8+

### Steps
1. **Create Database**
   ```sql
   CREATE DATABASE campus_asset_db;
   ```

2. **Update Database Credentials**
   Edit `src/main/resources/application.properties` and update:
   - `spring.datasource.username`
   - `spring.datasource.password`

3. **Build the Application**
   ```bash
   mvnw.cmd clean package
   ```

4. **Run the Application**
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   Or run the JAR:
   ```bash
   java -jar target/Campus_Asset_Manager-0.0.1-SNAPSHOT.jar
   ```

The application will start on `http://localhost:8080`

## Testing the API

### 1. Register a User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"password\":\"password123\",\"role\":\"STUDENT\"}"
```

### 2. Login to Get JWT Token
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"john\",\"password\":\"password123\"}"
```

Response:
```
eyJhbGciOiJIUzUxMiJ9...
```

### 3. Use Token to Access Protected Endpoints
```bash
curl -X GET http://localhost:8080/api/assets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Create an Asset
```bash
curl -X POST http://localhost:8080/api/assets \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Laptop\",\"type\":\"Electronics\",\"quantity\":10,\"status\":\"Available\"}"
```

### 5. Create a Request
```bash
curl -X POST http://localhost:8080/api/requests \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"user\":{\"id\":1},\"asset\":{\"id\":1},\"comments\":\"Need for project\"}"
```

### 6. Update Request Status
```bash
curl -X PATCH http://localhost:8080/api/requests/1/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"APPROVED\",\"comments\":\"Approved by admin\"}"
```

## Data Models

### User
```json
{
  "id": 1,
  "username": "john",
  "password": "encoded_password",
  "role": "STUDENT"  // or "ADMIN"
}
```

### Asset
```json
{
  "id": 1,
  "name": "Laptop",
  "type": "Electronics",
  "quantity": 10,
  "status": "Available"  // Available, Reserved, Maintenance, etc.
}
```

### Request
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "john"
  },
  "asset": {
    "id": 1,
    "name": "Laptop"
  },
  "status": "PENDING",  // PENDING, APPROVED, REJECTED
  "comments": "Need for project",
  "requestDate": "2025-10-29T22:00:00.000+00:00"
}
```

## Security
- All endpoints except `/api/auth/**` are protected
- JWT tokens expire after 1 hour (configurable via `jwt.expiration`)
- Passwords are encrypted using BCrypt
- Role-based authorization support (STUDENT, ADMIN)

## Technology Stack
- Java 21
- Spring Boot 3.4.11
- Spring Security 6.x
- Spring Data JPA
- MySQL 8
- JWT (JJWT 0.11.5)
- Lombok
- Maven

## Future Enhancements
- [ ] Add role-based endpoint restrictions (@PreAuthorize)
- [ ] Implement email notifications
- [ ] Add request approval workflow
- [ ] Create admin dashboard
- [ ] Add asset maintenance tracking
- [ ] Implement asset reservation system
- [ ] Add audit logging
- [ ] Create API documentation with Swagger/OpenAPI

## Troubleshooting

### Issue: "Failed to configure a DataSource"
**Solution**: Ensure MySQL is running and database credentials are correct in `application.properties`

### Issue: "401 Unauthorized"
**Solution**: Ensure you're including the JWT token in the Authorization header: `Bearer YOUR_TOKEN`

### Issue: "403 Forbidden"
**Solution**: Your user role might not have permission. Check if ADMIN role is required for the endpoint.

### Issue: JWT token invalid
**Solution**: Token might be expired (1 hour default). Login again to get a new token.

## Contact
For questions or issues, please check the GitHub repository.
