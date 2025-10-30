package com.surya.Campus_Asset_Manager.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.surya.Campus_Asset_Manager.Model.Request;
import com.surya.Campus_Asset_Manager.Service.RequestService;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    @Autowired
    private RequestService requestService;

    @GetMapping
    public List<Request> getAllRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public List<Request> getRequestsByStatus(@PathVariable String status) {
        return requestService.getRequestsByStatus(status);
    }

    @GetMapping("/user/{userId}")
    public List<Request> getRequestsByUserId(@PathVariable Long userId) {
        return requestService.getRequestsByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestBody Request request) {
        try {
            // Validate that user and asset are provided
            if (request.getUser() == null || request.getUser().getId() == null) {
                return ResponseEntity.badRequest().body("Error: User ID is required");
            }
            if (request.getAsset() == null || request.getAsset().getId() == null) {
                return ResponseEntity.badRequest().body("Error: Asset ID is required");
            }
            
            Request createdRequest = requestService.createRequest(request);
            return ResponseEntity.ok(createdRequest);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error creating request: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Request> updateRequestStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> updates) {
        try {
            String status = updates.get("status");
            String comments = updates.get("comments");
            Request updatedRequest = requestService.updateRequestStatus(id, status, comments);
            return ResponseEntity.ok(updatedRequest);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
