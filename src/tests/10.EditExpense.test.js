import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { response as mockData, initialStateWithExpenses } from './mocks/mockData';
import Wallet from '../pages/Wallet';

import { renderWithRouterAndStore } from './helpers/testConfig';

import {
  EDIT_INPUT_TEST_ID,
  VALUE_INPUT_TEST_ID,
  CURRENCY_INPUT_TEST_ID,
  METHOD_INPUT_TEST_ID,
  TAG_INPUT_TEST_ID,
  DESCRIPTION_INPUT_TEST_ID,
  BTN_EDIT_TEST_ID,
  TOTAL_FIELD_TEST_ID,
} from './helpers/constants';

afterEach(() => jest.clearAllMocks());

describe('10 - Crie um botão para editar uma despesa da tabela contendo as seguintes características:', () => {
  const initial = initialStateWithExpenses;

  test('O botão deve estar dentro do último item da linha da tabela e deve possuir `data-testid="edit-btn"`', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const btnEdit = document.getElementsByTagName('tr')[1].lastChild.firstChild;
    expect(btnEdit).toBeInTheDocument();
    expect(btnEdit.dataset.testid).toBe(BTN_EDIT_TEST_ID);    
});

  test('Ao ser clicado, o botão habilita um formulário para editar a linha da tabela. Ao clicar em "Editar despesa" ela é atualizada e atualiza a soma de despesas no header.', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const toggleEditBtn = screen.getAllByTestId(EDIT_INPUT_TEST_ID)[0];
    fireEvent.click(toggleEditBtn);

    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    const valueInput = await screen.findByTestId(VALUE_INPUT_TEST_ID);
    const currencyInput = await screen.findByTestId(CURRENCY_INPUT_TEST_ID);
    const methodInput = await screen.findByTestId(METHOD_INPUT_TEST_ID);
    const tagInput = await screen.findByTestId(TAG_INPUT_TEST_ID);
    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT_TEST_ID);
    const editButton = await screen.findByText(/Editar despesa/i);

    userEvent.type(valueInput, '100');
    userEvent.selectOptions(currencyInput, 'CAD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Cem dólares canadenses');

    expect(totalField).toContainHTML('187.12');
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(
        screen.getByRole('cell', { name: 'Cem dólares canadenses' })
      ).toBeInTheDocument();
    });

    expect(screen.getAllByRole('cell', { name: 'Trabalho' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dinheiro' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '100.00' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Dólar Canadense' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '4.20' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '420.41' })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: 'Real' })[0]).toBeInTheDocument();

    const newExpenses = [
      {
        id: 0,
        value: '100',
        currency: 'CAD',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Cem dólares canadenses',
        exchangeRates: mockData,
      },
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

    expect(totalField).toContainHTML('551.78');
    expect(store.getState().wallet.expenses).toStrictEqual(newExpenses);
  });
});
