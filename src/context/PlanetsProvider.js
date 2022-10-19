import React from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  return (
    <section>
      <PlanetsContext.Provider>
        {children}
      </PlanetsContext.Provider>
    </section>

  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
