# Portfolio Risk Analyzer

A comprehensive application for analyzing investment portfolio risk and performance metrics.

## Project Structure

```
PortfolioRiskAnalyzer/
├── backend/                 # Java-based backend
│   ├── src/                # Java source code
│   │   └── main/java/com/portfolio/
│   │       ├── controller/ # API endpoints
│   │       ├── service/    # Business logic
│   │       └── model/      # Data models
│   └── pom.xml             # Maven dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.tsx       # Main application
│   └── package.json
└── database/              # Oracle database scripts
    ├── schema.sql        # DB schema definition
    └── seed.sql          # Sample data
```

## Features

- Portfolio performance tracking
- Risk metrics calculation
- Interactive charts and visualizations
- Real-time market data integration
- Risk score analysis

## Technology Stack

- Frontend: React, TypeScript, Chart.js
- Backend: Java Spring Boot
- Database: Oracle
- UI Components: Tailwind CSS
- Charts: react-chartjs-2

## Getting Started

1. Set up the database:
   ```sql
   -- Run the schema and seed scripts
   @database/schema.sql
   @database/seed.sql
   ```

2. Start the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. Start the frontend:
   ```bash
   npm install
   npm run dev
   ```

## Development

- Frontend development server runs on `http://localhost:5173`
- Backend API server runs on `http://localhost:8080`
- Database runs on configured Oracle instance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request