import React from 'react';
import { screen } from '@testing-library/react';
import { response as mockData, initialStateWithExpenses } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('7 - Desenvolva uma tabela com os gastos contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('A tabela deve possuir um cabeçalho com os campos Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido e Moeda de conversão', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);

    expect(screen.getByRole('columnheader', { name: 'Descrição' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Tag' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Método de pagamento' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Moeda' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Câmbio utilizado' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Valor convertido' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Moeda de conversão' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Editar/Excluir' })).toBeInTheDocument();
  });
});
