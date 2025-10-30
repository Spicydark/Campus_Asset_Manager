package com.surya.Campus_Asset_Manager.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.surya.Campus_Asset_Manager.Model.Asset;
import com.surya.Campus_Asset_Manager.Repository.AssetRepository;

@Service
public class AssetService {
    @Autowired
    private AssetRepository assetRepository;
    
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    public Asset addAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Long id, Asset assetDetails) {
        return assetRepository.findById(id)
            .map(asset -> {
                asset.setName(assetDetails.getName());
                asset.setType(assetDetails.getType());
                asset.setQuantity(assetDetails.getQuantity());
                asset.setStatus(assetDetails.getStatus());
                return assetRepository.save(asset);
            })
            .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
    }

    public void deleteAsset(Long id) {
        assetRepository.deleteById(id);
    }

    public List<Asset> getAssetsByStatus(String status) {
        return assetRepository.findAll().stream()
            .filter(asset -> asset.getStatus().equalsIgnoreCase(status))
            .toList();
    }
}
