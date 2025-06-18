# NBA Box Score Analyzer

A modern, interactive web application that visualizes and analyzes NBA game statistics from box scores.

## Features

- **Box Score Visualization**: View comprehensive game statistics in a clean, intuitive interface
- **Player Performance Analysis**: Compare and contrast player statistics with interactive charts
- **Team Efficiency Metrics**: Analyze team performance through advanced metrics and visualizations
- **Game Flow Tracking**: See how game momentum shifted throughout quarters
- **Historical Comparison**: Compare current box scores with historical averages
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe programming language
- **Recharts/Chart.js**: Data visualization libraries
- **TailwindCSS**: Utility-first CSS framework for styling
- **NBA Stats API**: Data source for basketball statistics
- **Vite**: Modern frontend build tool

## Project Structure

```
nba-box-score-analyzer/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── BoxScore/       # Box score table components
│   │   ├── Charts/         # Data visualization components
│   │   ├── Layout/         # Layout components
│   │   └── PlayerCards/    # Player information components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and data fetching logic
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helper functions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── index.html              # HTML entry point
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/dxaginfo/nba-box-score-analyzer.git
cd nba-box-score-analyzer
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:3000`

## Usage

1. Select a game from the available list or search for a specific game by date/teams
2. View the comprehensive box score statistics
3. Toggle between different visualization options to analyze the game data
4. Compare player performances using the interactive charts
5. Explore team efficiency metrics and game flow analysis

## Development Roadmap

- [x] Initial project setup with React, TypeScript, and Vite
- [x] Basic box score display
- [x] Player statistical visualization
- [x] Team performance charts
- [ ] Game flow analysis
- [ ] Historical data comparison
- [ ] Advanced filtering options
- [ ] Mobile optimization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NBA Stats API for providing the basketball data
- Basketball statistics community for insights on valuable metrics