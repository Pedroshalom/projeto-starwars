import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const Listoption = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setFilterName] = useState('');
  const [column, setColumn] = useState(Listoption[0]);
  const [options, setOptions] = useState(Listoption);
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

  const filter = useCallback(() => {
    switch (quantityForm) {
    case 'maior que': {
      const selectFilter = planets.filter((item) => +item[column] > +quantity);
      setPlanets(selectFilter);
    }
      break;
    case 'menor que': {
      const selectFilter = planets.filter((item) => +item[column] < +quantity);
      setPlanets(selectFilter);
    }
      break;
    case 'igual a': {
      const selectFilter = planets.filter((item) => +item[column] === +quantity);
      setPlanets(selectFilter);
    }
      break;
    default:
      break;
    }
    const filterSlect = options.filter((item) => item !== column);
    setOptions(filterSlect);
    setColumn(filterSlect[0]);
  }, [quantityForm, column, quantity, options, planets]);

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
    options,
    quantityForm,
    getQuantity,
    getQuantityFilter,
    filter,
  }), [planets, nameFilter, column, quantity, options, quantityForm]);

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
