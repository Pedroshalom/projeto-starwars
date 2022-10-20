import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function InfoFilter() {
  const { nameFilter, name, quantity, quantityFilter,
    getQuantity, getQuantityFilter,
    column, getColumn, filter } = useContext(PlanetsContext);
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
          ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']
            .map((planet) => (
              <option key={ planet } value={ planet }>{ planet }</option>
            ))
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
    </section>
  );
}

export default InfoFilter;
