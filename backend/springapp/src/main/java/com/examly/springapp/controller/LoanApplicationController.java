package com.examly.springapp.controller;


import com.examly.springapp.dto.LoanApplicationRequest;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.LoanApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {"https://loanapp-taupe.vercel.app","http://localhost:5173"})
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService service;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<LoanApplication>> getAllApplications(
            @RequestParam(value = "status", required = false) String status) {
        return ResponseEntity.ok(service.getAllApplications(status));
    }
    
    @GetMapping("/my-applications")
public ResponseEntity<Page<LoanApplication>> getMyApplicationsPaged(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir,
        @RequestParam(value = "status", required = false) String status) {

    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    Page<LoanApplication> result = service.getApplicationsByUser(user.getId(), page, size, sortBy, sortDir, status);
    return ResponseEntity.ok(result);
}

    @PostMapping
    public ResponseEntity<LoanApplication> createApplication(@Valid @RequestBody LoanApplication application) {
        return ResponseEntity.status(201).body(service.createApplication(application));
    }
    //dto
    @PostMapping("/post")
    public ResponseEntity<LoanApplication> createApplications(@RequestBody LoanApplicationRequest request) {
       LoanApplication created = service.createApplications(request);
    return new ResponseEntity<>(created, HttpStatus.CREATED);
}


    @GetMapping("/{id}")
    public ResponseEntity<LoanApplication> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getApplicationById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LoanApplication> updateStatus(@PathVariable Long id,
                                                        @RequestBody StatusUpdate update) {
        return ResponseEntity.ok(service.updateApplicationStatus(id, update.status, update.rejectionReason));
    }

    //admin
    @GetMapping("/paged")
    public ResponseEntity<Page<LoanApplication>> getApplicationsPaged(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir,
        @RequestParam(value = "status", required = false) String status) {
    return ResponseEntity.ok(service.getApplicationsPaged(page, size, sortBy, sortDir, status));
}

  ///agent
   @GetMapping("/agent/paged")
public ResponseEntity<Page<LoanApplication>> getAssignedApplicationsPaged(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "id") String sortBy,
        @RequestParam(defaultValue = "asc") String sortDir,
        @RequestParam(value = "status", required = false) String status) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
       
;

    Page<LoanApplication> result = service.getApplicationsPaged(page, size, sortBy, sortDir, status);
    return ResponseEntity.ok(result);
}




    static class StatusUpdate {
        public String status;
        public String rejectionReason;
    }
}

