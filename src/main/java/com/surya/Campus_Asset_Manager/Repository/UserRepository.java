package com.surya.Campus_Asset_Manager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.surya.Campus_Asset_Manager.Model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
