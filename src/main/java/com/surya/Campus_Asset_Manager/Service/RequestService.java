package com.surya.Campus_Asset_Manager.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.surya.Campus_Asset_Manager.Model.Request;
import com.surya.Campus_Asset_Manager.Repository.RequestRepository;
import com.surya.Campus_Asset_Manager.Repository.AssetRepository;
import com.surya.Campus_Asset_Manager.Model.Asset;

@Service
public class RequestService {
    @Autowired
    private RequestRepository requestRepository;
    @Autowired
    private AssetRepository assetRepository;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Request createRequest(Request request) {
        request.setRequestDate(new Date());
        request.setStatus("PENDING");
        return requestRepository.save(request);
    }

    public Request updateRequestStatus(Long id, String status, String comments) {
        return requestRepository.findById(id)
            .map(request -> {
                String previous = request.getStatus();
                request.setStatus(status);
                if (comments != null) {
                    request.setComments(comments);
                }
                // If approved, mark the associated asset as RESERVED
                if (status != null && status.equalsIgnoreCase("APPROVED")) {
                    Asset asset = request.getAsset();
                    if (asset != null) {
                        asset.setStatus("RESERVED");
                        assetRepository.save(asset);
                    }
                }
                // If request was previously APPROVED and now changed to something else, free the asset
                if (previous != null && previous.equalsIgnoreCase("APPROVED") && !status.equalsIgnoreCase("APPROVED")) {
                    Asset asset = request.getAsset();
                    if (asset != null) {
                        asset.setStatus("AVAILABLE");
                        assetRepository.save(asset);
                    }
                }
                return requestRepository.save(request);
            })
            .orElseThrow(() -> new RuntimeException("Request not found with id: " + id));
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public List<Request> getRequestsByStatus(String status) {
        return requestRepository.findAll().stream()
            .filter(request -> request.getStatus().equalsIgnoreCase(status))
            .toList();
    }

    public List<Request> getRequestsByUserId(Long userId) {
        return requestRepository.findAll().stream()
            .filter(request -> request.getUser().getId().equals(userId))
            .toList();
    }
}
