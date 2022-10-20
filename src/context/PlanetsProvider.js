import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setFilterName] = useState('');
  const [column, setColumn] = useState('population');
  const [quantity, setQuantity] = useState(0);
  const [quantityForm, setQuantityForm] = useState('maior que');

  const name = ({ target }) => {
    setFilterName(target.value);
  };

  const getColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const getQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  const getQuantityFilter = ({ target: { value } }) => {
    setQuantityForm(value);
  };

  const filter = () => {
    if (quantityForm === 'maior que') {
      const selectFilter = planets.filter((planet) => +planet[column] > +quantity);
      setPlanets(selectFilter);
    }

    if (quantityForm === 'menor que') {
      const selectFilter = planets.filter((planet) => +planet[column] < +quantity);
      setPlanets(selectFilter);
    }

    if (quantityForm === 'igual a') {
      const selectFilter = planets.filter((planet) => +planet[column] === +quantity);
      setPlanets(selectFilter);
    }
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

  const context = useMemo(() => ({
    planets,
    nameFilter,
    name,
    column,
    getColumn,
    quantity,
    quantityForm,
    getQuantity,
    getQuantityFilter,
    filter,
  }), [planets, nameFilter, column, quantity, quantityForm]);

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
