-- Create Portfolio table
CREATE TABLE portfolios (
    id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    last_updated TIMESTAMP,
    total_value NUMBER(15,2),
    risk_score NUMBER(5,2)
);

-- Create Position table
CREATE TABLE positions (
    id NUMBER PRIMARY KEY,
    portfolio_id NUMBER,
    symbol VARCHAR2(10) NOT NULL,
    quantity NUMBER NOT NULL,
    current_price NUMBER(15,2),
    cost_basis NUMBER(15,2),
    CONSTRAINT fk_portfolio
        FOREIGN KEY (portfolio_id)
        REFERENCES portfolios(id)
);

-- Create sequences for IDs
CREATE SEQUENCE portfolio_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE position_seq START WITH 1 INCREMENT BY 1;

-- Create indexes
CREATE INDEX idx_portfolio_name ON portfolios(name);
CREATE INDEX idx_position_symbol ON positions(symbol);
CREATE INDEX idx_position_portfolio ON positions(portfolio_id);