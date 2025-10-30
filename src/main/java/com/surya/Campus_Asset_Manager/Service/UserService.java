package com.surya.Campus_Asset_Manager.Service;

import com.surya.Campus_Asset_Manager.Exception.DuplicateUsernameException;
import com.surya.Campus_Asset_Manager.Model.LoginRequest;
import com.surya.Campus_Asset_Manager.Model.User;
import com.surya.Campus_Asset_Manager.Repository.UserRepository;
import com.surya.Campus_Asset_Manager.Repository.RequestRepository;
import com.surya.Campus_Asset_Manager.Exception.UserDeletionException;
import com.surya.Campus_Asset_Manager.Security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RequestRepository requestRepository;

    // Register a new user
    public void registerUser(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new DuplicateUsernameException("Username already exists: " + user.getUsername());
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Encrypt password
        userRepository.save(user);  // Save user in the database
    }

    // Authenticate user and generate JWT token
    public String authenticateAndGenerateToken(LoginRequest loginRequest) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        // Get the authenticated user's username
        String username = authentication.getName();

        // Fetch user to get role and id
        User user = userRepository.findByUsername(username);

        // Generate a JWT token for the authenticated user including role and id
        return jwtTokenProvider.generateToken(
            username,
            user != null && user.getRole() != null ? user.getRole().name() : null,
            user != null ? user.getId() : null
        );
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Get user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Delete user
    public void deleteUser(Long id) {
        // Prevent deleting a user who has existing requests to avoid FK constraint failures
        long requestsCount = requestRepository.countByUserId(id);
        if (requestsCount > 0) {
            throw new UserDeletionException("Cannot delete user with id " + id + ": there are " + requestsCount + " request(s) referencing this user. Delete those requests first or reassign them.");
        }
        userRepository.deleteById(id);
    }
}
