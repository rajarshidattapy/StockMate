package com.portfolio.controller;

import com.portfolio.model.Portfolio;
import com.portfolio.service.AIAnalysisService;
import com.portfolio.service.PortfolioService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {
    
    private final PortfolioService portfolioService;
    private final AIAnalysisService aiAnalysisService;
    
    public PortfolioController(PortfolioService portfolioService, AIAnalysisService aiAnalysisService) {
        this.portfolioService = portfolioService;
        this.aiAnalysisService = aiAnalysisService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolio(@PathVariable Long id) {
        Portfolio portfolio = portfolioService.getPortfolio(id);
        return ResponseEntity.ok(portfolio);
    }
    
    @GetMapping("/{id}/analysis")
    public ResponseEntity<Map<String, String>> getPortfolioAnalysis(@PathVariable Long id) {
        Portfolio portfolio = portfolioService.getPortfolio(id);
        String analysis = aiAnalysisService.analyzePortfolioRisk(portfolio);
        
        Map<String, String> response = new HashMap<>();
        response.put("analysis", analysis);
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio) {
        Portfolio created = portfolioService.createPortfolio(portfolio);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable Long id, @RequestBody Portfolio portfolio) {
        portfolio.setId(id);
        Portfolio updated = portfolioService.updatePortfolio(portfolio);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return ResponseEntity.ok().build();
    }
}