// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { GASTOS_TOTAIS } from '../actions';

import { GET_CURRENCIES, GET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const requisicaoAPi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES
    :
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((element) => element !== 'USDT'),
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  default:
    return state;
  }
};

export default requisicaoAPi;
