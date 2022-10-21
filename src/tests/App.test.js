import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });


describe('implementando testes', () => {
  it('Testando aplicação StarWars', async() => {
    render(<App />);

    const inputs = screen.getAllByRole('textbox');
    const selects = screen.getAllByRole('combobox');
    const buttonfiltrar = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(inputs.length).toBe(1);
    expect(selects.length).toBe(2);
    expect(buttonfiltrar).toBeInTheDocument();

    const inputPlanet = screen.getByPlaceholderText('addPlanet');
    const inputQuanti = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(inputPlanet).toBeInTheDocument();
    expect(inputQuanti).toBeInTheDocument();

    userEvent.type(inputPlanet, 'Tatooine');
    userEvent.type(inputQuanti, '10');

    userEvent.click(buttonFilter);

    const climate = await screen.findByText(/Climate/i, {}, {timeout: 15000});
    expect(climate).toBeInTheDocument();
  });
});