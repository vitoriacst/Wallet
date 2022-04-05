// requisicao da api

import fetchApiCurrencies from '../service/fetchApiCurrencies';

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });
export const GET_EXPENSES = (value) => ({ type: 'GET_EXPENSES', value });
// make a action
export function TakeApi() {
  return async (dispatch) => {
    try {
      const response = await fetchApiCurrencies();
      dispatch(getCurrencies(response));
    } catch (error) {
      return error;
    }
  };
}
// criando a action da expenses
