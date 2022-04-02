// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { GASTOS_TOTAIS } from '../actions';

// const INITIAL_STATE = {
//   despesasTotais: 0,
// };
// const DespesasTotais = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case GASTOS_TOTAIS:
//     return {
//       ...state,
//       despesasTotais: action.value,
//     };
//   default:
//     return state;
//   }
// };
// export default DespesasTotais
const INITIAL_STATE = {
  currencies: [],
};

const requisicaoAPi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case requisicaoAPi:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default requisicaoAPi;
