import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setFilterName] = useState('');

  const name = ({ target }) => {
    setFilterName(target.value);
  };

  useEffect(() => {
    const URL = 'https://swapi.dev/api/planets';
    const dadosApi = async () => {
      const fetching = await fetch(URL);
      const res = await fetching.json();
      const planetas = [];
      res.results.forEach((curr) => {
        const obj = curr;
        delete obj.residents;
        planetas.push(obj);
      });
      setPlanets(planetas);
    };

    dadosApi();
  }, []);

  const context = React.useMemo(() => ({
    planets,
    nameFilter,
    name,
  }), [planets, nameFilter]);

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
