package com.surya.Campus_Asset_Manager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.surya.Campus_Asset_Manager.Model.Request;

public interface RequestRepository extends JpaRepository<Request, Long> {
	long countByUserId(Long userId);
}


