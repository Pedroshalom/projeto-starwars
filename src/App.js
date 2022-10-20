import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import InfoFilter from './components/InfoFilter';

function App() {
  return (
    <PlanetsProvider>
      <div className="title">
        <h1>Star Wars</h1>
      </div>
      <InfoFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
