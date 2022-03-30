import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { response as mockData, initialStateWithExpenses } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

import { BTN_DELETE_TEST_ID, TOTAL_FIELD_TEST_ID } from './helpers/constants';

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('9 - Crie um botão para deletar uma despesa da tabela contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="delete-btn"`', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const lastButton = document.getElementsByTagName('tr')[1].lastChild.lastChild;
    expect(lastButton).toBeInTheDocument();
    expect(lastButton.dataset.testid).toBe(BTN_DELETE_TEST_ID);    
  });
  
  test('Ao ser clicado, o botão deleta a linha da tabela, alterando o estado global.', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const deleteBtn = screen.getAllByTestId(BTN_DELETE_TEST_ID)[0];
    const lineDeleted = document.getElementsByTagName('tr')[1];
    
    fireEvent.click(deleteBtn);
    expect(lineDeleted).not.toBeInTheDocument();

    expect(screen.getByRole('cell', { name: 'Vinte euros' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Dinheiro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '20.00' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Euro' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '6.57' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '131.37' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Real' })).toBeInTheDocument();
    const newExpenses = [
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);
  });
  
  test('Ao clicar no botão para remover uma despesa, o valor correspondente deve ser subtraído e a despesa total deve ser atualizada no header', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    expect(totalField).toContainHTML('187.12');
    
    const deleteBtn = screen.getAllByTestId(BTN_DELETE_TEST_ID)[0];
    
    fireEvent.click(deleteBtn);
    
    const newExpenses = [
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];
    
    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);
    
    expect(totalField).toContainHTML('131.37');
  });
});
