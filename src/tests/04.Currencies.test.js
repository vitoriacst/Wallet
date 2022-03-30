import React from 'react';
import { waitFor } from '@testing-library/react';
import { response as mockData } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

const apiResponse = Promise.resolve({
  json: () => Promise.resolve(mockData),
  ok: true,
});

const mockedExchange = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('4 - Implemente a lógica para armazenar no estado global as siglas das moedas que vêm da API', () => {
  test('Os valores da chave currencies no estado global devem ser puxados através de uma requisição à API', async () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');

    expect(mockedExchange).toBeCalled();
    expect(mockedExchange).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');

    const [first, , ...rest] = Object.keys(mockData);
    const currencies = [first, ...rest];

    await waitFor(() => {
      expect(store.getState().wallet.currencies).toEqual(currencies)
    });
  });
});
