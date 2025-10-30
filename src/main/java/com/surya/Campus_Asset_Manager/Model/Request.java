package com.surya.Campus_Asset_Manager.Model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "asset_request")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Asset asset;

    @Column(length = 50)
    private String status; // Pending, Approved, Rejected

    @Column(length = 500)
    private String comments;

    @Temporal(TemporalType.TIMESTAMP)
    private Date requestDate;


    // Getters and Setters
}

