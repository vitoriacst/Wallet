import React from 'react';
import { screen, within } from '@testing-library/react';
import { response as mockData } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

import {
  VALUE_INPUT_TEST_ID,
  METHOD_INPUT_TEST_ID,
  TAG_INPUT_TEST_ID,
  DESCRIPTION_INPUT_TEST_ID
} from './helpers/constants'; 

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('5 - Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:', () => {
  test('Um campo para adicionar o valor da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const valueInput = await screen.findByTestId(VALUE_INPUT_TEST_ID);

    expect(valueInput).toBeInTheDocument();
  });

  test('Um campo para adicionar a descrição da despesa', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const descriptionInput = await screen.findByTestId(DESCRIPTION_INPUT_TEST_ID);

    expect(descriptionInput).toBeInTheDocument();
  });

  test('Um campo para selecionar em qual moeda será registrada a despesa', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');
    const currencyInput = await screen.findByRole('combobox', {
      name: /moeda/i,
    });

    const coinOptions = within(currencyInput).getAllByRole('option');
    const coinOptionsValues = coinOptions.map((coinOption) => coinOption.value);

    const expectedCoinOptions = store.getState().wallet.currencies;

    expect(coinOptionsValues).toEqual(expectedCoinOptions);
    expect(currencyInput).toBeInTheDocument();
  });

  test('Um campo para selecionar qual método de pagamento será utilizado', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const methodInput = await screen.findByTestId(METHOD_INPUT_TEST_ID);
    const moneyOption = screen.getByText(/Dinheiro/);
    const creditOption = screen.getByText(/Cartão de crédito/);
    const debitOption = screen.getByText(/Cartão de débito/);

    expect(methodInput).toBeInTheDocument();
    expect(moneyOption).toBeInTheDocument();
    expect(creditOption).toBeInTheDocument();
    expect(debitOption).toBeInTheDocument();
  });

  test('Um campo para selecionar uma categoria (tag) para a despesa.', async () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const tagInput = await screen.findByTestId(TAG_INPUT_TEST_ID);
    const foodOption = screen.getByText(/Alimentação/);
    const funOption = screen.getByText(/Lazer/);
    const workOption = screen.getByText(/Trabalho/);
    const transportOption = screen.getByText(/Transporte/);
    const healthOption = screen.getByText(/Saúde/);

    expect(tagInput).toBeInTheDocument();
    expect(foodOption).toBeInTheDocument();
    expect(funOption).toBeInTheDocument();
    expect(workOption).toBeInTheDocument();
    expect(transportOption).toBeInTheDocument();
    expect(healthOption).toBeInTheDocument();
  });
});
