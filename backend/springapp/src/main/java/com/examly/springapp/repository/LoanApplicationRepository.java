package com.examly.springapp.repository;

import com.examly.springapp.model.LoanApplication;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {


    Page<LoanApplication> findByUserId(Long userId, Pageable pageable);
    Page<LoanApplication> findByUserIdAndStatus(Long userId, String status, Pageable pageable);

    List<LoanApplication> findByStatus(String status);
    Page<LoanApplication> findByStatus(String status, Pageable pageable);
    
    // Default findAll with pagination
    Page<LoanApplication> findAll(Pageable pageable);

}
