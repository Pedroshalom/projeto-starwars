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
  const [originalPlantes, setOriginalPlanets] = useState([]);
  const [arrayFilters, setArreyFilters] = useState([]);
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
    setArreyFilters((prev) => ([...prev, { column, quantity, quantityForm }]));
  }, [quantityForm, column, quantity, options, planets]);

  const hendleRemove = (event) => {
    const { name: batata } = event.target;
    console.log('teste');
    const updateFilter = arrayFilters.filter((Element) => Element.column !== batata);
    console.log(updateFilter);
    setArreyFilters(updateFilter);
    console.log(arrayFilters);
    // options.filter((item) => {
    //   for (let i = 0; i < arrayFilters.length; i += 1) {
    //     if (
    //       item !== arrayFilters[i].column
    //     ) {
    //       return item;
    //     }
    //   }
    //   return null;
    // });
  };

  const dadosApi = async () => {
    const URL = 'https://swapi.dev/api/planets';
    const fetching = await fetch(URL);
    const res = await fetching.json();
    const planetas = [];
    res.results.forEach((curr) => {
      const obj = curr;
      delete obj.residents;
      planetas.push(obj);
    });
    setPlanets(planetas);
    setOriginalPlanets(planetas);
  };

  useEffect(() => {
    dadosApi();
  }, []);

  const removeFilter = () => {
    setPlanets(originalPlantes);
    setFilterName('');
    setColumn(Listoption[0]);
    setOptions(Listoption);
    setQuantity(0);
    setQuantityForm('maior que');
  };
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
    removeFilter,
    arrayFilters,
    hendleRemove,
  }), [planets, filter, nameFilter, column, quantity, options, quantityForm]);

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
