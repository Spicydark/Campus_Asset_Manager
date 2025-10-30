package com.surya.Campus_Asset_Manager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.surya.Campus_Asset_Manager.Model.Asset;

public interface AssetRepository extends JpaRepository<Asset, Long> {}

