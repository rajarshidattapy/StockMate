# StockMate: Portfolio Risk Analyzer
-------------
Description:
A web-based application that allows users to manage and analyze their investment portfolios. Users can add various assets, view portfolio risk metrics, and receive AI-based recommendations to optimize their investments.

---

### Core Features
1. *Portfolio Management*: 
   - Add, update, delete, and list financial assets in a portfolio (CRUD operations with Oracle DB).
   
2. *Risk Analysis*:
   - Use Gemini/Mistral APIs to fetch financial market data and run AI-based analysis on potential risks.
   
3. **AI-Based Recommendations**:  
   - Display investment recommendations based on market trends and asset risk profiles.
   
4. **Interactive Dashboard**:  
   - Use JavaScript to create charts and graphs to visualize portfolio performance and risk.

---

### *Technical Stack Breakdown*
1. **Java (Backend)**:
   - Handle business logic, API integration, and CRUD operations with Oracle DB.
   - Use RESTful endpoints to expose data to the front end.

2. **Oracle DB**:
   - Store user portfolio data and transaction history.
   - Perform CRUD operations for managing assets.

3. **Gemini/Mistral API Integration**:
   - Fetch financial market data for AI analysis (e.g., stock price changes, volatility, etc.).

4. **HTML/CSS/JavaScript**:
   - Design a modern, responsive interface to display user portfolios and risk metrics.
   - Use libraries like Chart.js or D3.js for data visualization.

---

### *Project Architecture*
1. **Frontend**:  
   - HTML/CSS for layout and styling.
   - JavaScript for fetching data and rendering dynamic content.
  
2. **Backend**:  
   - Java servlet or Spring Boot (optional) to expose RESTful APIs.
   - Java integration with Gemini/Mistral APIs for AI-based analysis.

3. **Database**:  
   - Oracle DB for storing asset and transaction data.

---



### **Bonus Features (Optional Enhancements)**
- **User Authentication**: Add login/logout functionality using Java and Oracle DB for storing user credentials.
- **Predictive Analysis**: Use simple machine learning algorithms for predicting portfolio performance based on past trends.
- **Responsive Design**: Ensure the UI is mobile-friendly.

