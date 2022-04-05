// Coloque aqui suas actions
// here I called the api

import fetchApiCurrencies from '../service/fetchApiCurrencies';

export const USER = 'USER';
// action do email de Login
export const loginInputEmail = (email) => (
  {
    type: USER, value: email,
  }
);
// action dos gastos  totais contidos no componente header
export const GASTOS_TOTAIS = 'GASTOS_TOTAIS';
export const gastosDoUsuario = (despesasTotais) => ({
  type: GASTOS_TOTAIS, value: despesasTotais,
});

// requisicao da api

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const getCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });
// make a action
export function TakeApi() {
  return async (dispatch) => {
    try {
      const response = await fetchApiCurrencies();
      dispatch(getCurrencies(response));
    } catch (error) {
      console.log(error);
    }
  };
}
// criando a action da expenses
export const GET_EXPENSES = 'GET_EXPENSES';
export const getExpenses = (expenses) => (
  {
    type: GET_EXPENSES, value: expenses,
  }
);
