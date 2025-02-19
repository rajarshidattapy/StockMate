package com.portfolio.service;

import com.portfolio.model.Portfolio;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PortfolioService {
    
    private final JdbcTemplate jdbcTemplate;
    
    public PortfolioService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    public Portfolio getPortfolio(Long id) {
        String sql = "SELECT * FROM portfolios WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Portfolio portfolio = new Portfolio();
            portfolio.setId(rs.getLong("id"));
            portfolio.setName(rs.getString("name"));
            portfolio.setLastUpdated(rs.getDate("last_updated"));
            portfolio.setTotalValue(rs.getDouble("total_value"));
            portfolio.setRiskScore(rs.getDouble("risk_score"));
            // Load positions in a separate query
            portfolio.setPositions(getPositionsForPortfolio(id));
            return portfolio;
        });
    }
    
    private List<Position> getPositionsForPortfolio(Long portfolioId) {
        String sql = "SELECT * FROM positions WHERE portfolio_id = ?";
        return jdbcTemplate.query(sql, new Object[]{portfolioId}, (rs, rowNum) -> {
            Position position = new Position();
            position.setId(rs.getLong("id"));
            position.setSymbol(rs.getString("symbol"));
            position.setQuantity(rs.getInt("quantity"));
            position.setCurrentPrice(rs.getDouble("current_price"));
            position.setCostBasis(rs.getDouble("cost_basis"));
            return position;
        });
    }
    
    @Transactional
    public Portfolio createPortfolio(Portfolio portfolio) {
        String sql = "INSERT INTO portfolios (name, last_updated, total_value, risk_score) " +
                    "VALUES (?, CURRENT_TIMESTAMP, ?, ?)";
        
        jdbcTemplate.update(sql,
            portfolio.getName(),
            portfolio.getTotalValue(),
            portfolio.getRiskScore()
        );
        
        // Get the generated id
        Long id = jdbcTemplate.queryForObject("SELECT portfolio_seq.CURRVAL FROM dual", Long.class);
        portfolio.setId(id);
        
        // Insert positions
        for (Position position : portfolio.getPositions()) {
            createPosition(position, id);
        }
        
        return portfolio;
    }
    
    @Transactional
    public Portfolio updatePortfolio(Portfolio portfolio) {
        String sql = "UPDATE portfolios SET name = ?, total_value = ?, risk_score = ? " +
                    "WHERE id = ?";
        
        jdbcTemplate.update(sql,
            portfolio.getName(),
            portfolio.getTotalValue(),
            portfolio.getRiskScore(),
            portfolio.getId()
        );
        
        // Update positions
        // First delete existing positions
        jdbcTemplate.update("DELETE FROM positions WHERE portfolio_id = ?", portfolio.getId());
        
        // Then insert new positions
        for (Position position : portfolio.getPositions()) {
            createPosition(position, portfolio.getId());
        }
        
        return portfolio;
    }
    
    private void createPosition(Position position, Long portfolioId) {
        String sql = "INSERT INTO positions (portfolio_id, symbol, quantity, current_price, cost_basis) " +
                    "VALUES (?, ?, ?, ?, ?)";
        
        jdbcTemplate.update(sql,
            portfolioId,
            position.getSymbol(),
            position.getQuantity(),
            position.getCurrentPrice(),
            position.getCostBasis()
        );
    }
    
    @Transactional
    public void deletePortfolio(Long id) {
        // Delete positions first due to foreign key constraint
        jdbcTemplate.update("DELETE FROM positions WHERE portfolio_id = ?", id);
        // Then delete the portfolio
        jdbcTemplate.update("DELETE FROM portfolios WHERE id = ?", id);
    }
}