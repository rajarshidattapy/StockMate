package com.portfolio.model;

public class Position {
    private Long id;
    private String symbol;
    private int quantity;
    private double currentPrice;
    private double costBasis;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }

    public double getCostBasis() { return costBasis; }
    public void setCostBasis(double costBasis) { this.costBasis = costBasis; }
}