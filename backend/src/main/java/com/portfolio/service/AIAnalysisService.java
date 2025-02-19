package com.portfolio.service;

import com.portfolio.model.Portfolio;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;
import java.util.HashMap;

@Service
public class AIAnalysisService {
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate;
    
    public AIAnalysisService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    
    public String analyzePortfolioRisk(Portfolio portfolio) {
        String prompt = String.format(
            "Analyze the following investment portfolio for risk factors:\n" +
            "Total Value: $%.2f\n" +
            "Number of Positions: %d\n" +
            "Risk Score: %.2f\n\n" +
            "Please provide a detailed risk analysis and recommendations.",
            portfolio.getTotalValue(),
            portfolio.getPositions().size(),
            portfolio.getRiskScore()
        );
        
        Map<String, Object> request = new HashMap<>();
        request.put("contents", Map.of("parts", Map.of("text", prompt)));
        
        // Call Gemini API and process response
        String geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
        Map<String, Object> response = restTemplate.postForObject(
            geminiUrl + "?key=" + apiKey,
            request,
            Map.class
        );
        
        // Extract and return the analysis from the response
        return extractAnalysisFromResponse(response);
    }
    
    private String extractAnalysisFromResponse(Map<String, Object> response) {
        // Implementation to extract the analysis text from Gemini API response
        // This is a simplified version - you'll need to handle the actual response structure
        try {
            return response.get("candidates").toString();
        } catch (Exception e) {
            return "Unable to generate analysis at this time.";
        }
    }
}