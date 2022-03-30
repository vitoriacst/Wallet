import React from 'react';
import { screen  } from '@testing-library/react';
import { response as mockData, initialStateWithExpenses } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('8 - Implemente a lógica para que a tabela seja alimentada pelo estado da aplicação', () => {
  const initial = initialStateWithExpenses;
  test('A tabela deve ser alimentada pelo estado da aplicação, que estará disponível na chave expenses que vem do reducer wallet.', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    expect(screen.getAllByRole('cell', { name: 'Dez dólares' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Lazer' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Cartão de crédito' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '10.00' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dólar Comercial' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '5.58' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '55.75' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Real' })[0]).toBeInTheDocument();

    expect(screen.getAllByRole('cell', { name: 'Vinte euros' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Trabalho' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dinheiro' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '20.00' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Euro' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '6.57' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '131.37' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Real' })[1]).toBeInTheDocument();
  });
});
