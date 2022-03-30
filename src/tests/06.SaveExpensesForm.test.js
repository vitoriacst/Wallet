import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { response as mockData } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

import {
  VALUE_INPUT_TEST_ID,
  METHOD_INPUT_TEST_ID,
  TAG_INPUT_TEST_ID,
  DESCRIPTION_INPUT_TEST_ID,
  TOTAL_FIELD_TEST_ID,
} from './helpers/constants';

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('6 - Salve todas as informações do formulário no estado global', () => {
  test('Um botão com o texto \'Adicionar despesa\' que salva as informações da despesa no estado global e atualiza a soma de despesas no header', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');

    const currencyInput = await screen.findByRole('combobox', {
      name: /moeda/i,
    });

    const addButton = await screen.findByText(/Adicionar despesa/i);
    const valueInput = await screen.findByTestId(VALUE_INPUT_TEST_ID);
    const methodInput = await screen.findByTestId(METHOD_INPUT_TEST_ID);
    const tagInput = await screen.findByTestId(TAG_INPUT_TEST_ID);
    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT_TEST_ID);

    expect(addButton).toBeInTheDocument();

    userEvent.type(valueInput, '11');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'Dez dólares');
    userEvent.click(addButton);
    expect(mockedExchange).toBeCalledTimes(2);

    const expectedStateExpense = [
      {
        id: 0,
        value: '11',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => {
      expect(valueInput.value === 0 || valueInput.value === '0' || valueInput.value === '').toBe(true);
    });
    expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense);

    userEvent.type(valueInput, '20');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.type(descriptionInput, 'Vinte euros');
    fireEvent.click(addButton);
    expect(mockedExchange).toBeCalledTimes(3);

    const expectedStateExpense2 = [
      {
        id: 0,
        value: '11',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'Dez dólares',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '20',
        currency: 'EUR',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        description: 'Vinte euros',
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => {
      expect(valueInput.value === 0 || valueInput.value === '0' || valueInput.value === '').toBe(true);
    });
    expect(store.getState().wallet.expenses).toStrictEqual(expectedStateExpense2);

    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    expect(totalField.innerHTML).toBe('192.69');
  });
});
