import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';

function App() {
  return (
    <PlanetsProvider>
      <div className="title">
        <h1>Star Wars</h1>
      </div>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
