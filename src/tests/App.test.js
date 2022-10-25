import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o app', () => {
  it('Verifica se é renderizado', () => {
    render(<App />);
    const input = screen.getAllByRole('textbox');
    const select = screen.getAllByRole('combobox');
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });
    expect(input.length).toBe(1);
    expect(select.length).toBe(2);
    expect(button).toBeInTheDocument();
  });
  it('Verifica o filtro', async () => {
    render(<App />);
    const planets = screen.getByPlaceholderText('addPlanet');
    const valueFilter = screen.getByTestId('value-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(planets).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();


    userEvent.type(planets, 'Dagobah');
    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '0');
    userEvent.click(button);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(button);
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.click(button);
  });
  it('Verifica limpa filtros', () => {
    render(<App />);

    const buttonRemoveFilter = screen.getByTestId("button-remove-filters");
    const buttonRemover = screen.getByRole('button', {
      name: /Remover filtros/i,
    });
    expect(buttonRemoveFilter).toHaveAttribute('type', 'button');
    userEvent.click(buttonRemover);
    const inputPlanet = screen.getByPlaceholderText('addPlanet');
    const buttonFiltro = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(inputPlanet).toBeInTheDocument();
    userEvent.type(inputPlanet, 'Tatooine');
    userEvent.click(buttonFiltro);
    
  });
});