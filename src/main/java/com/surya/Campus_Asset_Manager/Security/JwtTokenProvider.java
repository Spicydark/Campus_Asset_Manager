package com.surya.Campus_Asset_Manager.Security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration:3600000}")
    private long jwtExpirationMs;

    // Generate a token with additional claims (role, id)
    public String generateToken(String username, String role, Long id) {
        // Generate key from the secret key
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

        io.jsonwebtoken.JwtBuilder builder = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .claim("role", role);

        if (id != null) {
            builder.claim("id", id);
        }

        return builder.signWith(key, SignatureAlgorithm.HS512).compact();
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            // Generate key from the secret key for validation
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes());

            // Use the updated parser from the new JJWT version
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);

            return true;  // If no exception, token is valid
        } catch (Exception e) {
            return false;  // If any exception, token is invalid
        }
    }

    // Resolve token from request header
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // Extract username from the token
    public String getUsernameFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        
        // Use the new parser builder approach
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    // Extract role claim (if present) from the token
    public String getRoleFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        try {
            Object role = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role");

            return role != null ? role.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }

    // Extract id claim (if present) from the token
    public Long getIdFromToken(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
        try {
            Object idObj = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("id");

            if (idObj == null) return null;
            if (idObj instanceof Number) {
                return ((Number) idObj).longValue();
            }
            return Long.parseLong(idObj.toString());
        } catch (Exception e) {
            return null;
        }
    }
}
