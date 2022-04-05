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
export const getExpenses = (value) => (
  {
    type: GET_EXPENSES, value,
  }
);
