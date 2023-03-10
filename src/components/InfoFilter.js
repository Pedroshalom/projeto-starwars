import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InfoFilter() {
  const { nameFilter, name,
    quantity, quantityFilter,
    getQuantity,
    options, getQuantityFilter,
    column, getColumn, filter,
    removeFilter, arrayFilters, hendleRemove } = useContext(PlanetsContext);
  return (
    <section>
      <input
        data-testid="name-filter"
        type="text"
        value={ nameFilter }
        onChange={ name }
        placeholder="addPlanet"
      />
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ getColumn }
      >
        {
          options.map((item) => (<option key={ item } value={ item }>{item}</option>))
        }
      </select>

      <select
        value={ quantityFilter }
        onChange={ getQuantityFilter }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ quantity }
        onChange={ getQuantity }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ filter }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeFilter }
      >
        Remover Filtros
      </button>
      {
        arrayFilters.map((element) => (
          <p
            data-testid="filter"
            key={ element.column }
          >
            {element.column}
            <button
              type="button"
              onClick={ hendleRemove }
              name={ element.column }

            >
              X

            </button>
          </p>
        ))
      }
    </section>
  );
}

export default InfoFilter;
