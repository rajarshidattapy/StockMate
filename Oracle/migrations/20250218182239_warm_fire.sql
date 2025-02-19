-- Insert sample portfolios
INSERT INTO portfolios (id, name, last_updated, total_value, risk_score)
VALUES (portfolio_seq.NEXTVAL, 'Growth Portfolio', CURRENT_TIMESTAMP, 100000.00, 7.5);

INSERT INTO portfolios (id, name, last_updated, total_value, risk_score)
VALUES (portfolio_seq.NEXTVAL, 'Conservative Portfolio', CURRENT_TIMESTAMP, 75000.00, 3.2);

-- Insert sample positions
INSERT INTO positions (id, portfolio_id, symbol, quantity, current_price, cost_basis)
VALUES (position_seq.NEXTVAL, 1, 'AAPL', 100, 175.50, 150.00);

INSERT INTO positions (id, portfolio_id, symbol, quantity, current_price, cost_basis)
VALUES (position_seq.NEXTVAL, 1, 'MSFT', 50, 325.75, 300.00);

INSERT INTO positions (id, portfolio_id, symbol, quantity, current_price, cost_basis)
VALUES (position_seq.NEXTVAL, 2, 'VTI', 200, 220.25, 200.00);

INSERT INTO positions (id, portfolio_id, symbol, quantity, current_price, cost_basis)
VALUES (position_seq.NEXTVAL, 2, 'BND', 300, 72.50, 75.00);