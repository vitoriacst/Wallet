// Coloque aqui suas actions
// here I called the api

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

// export const REQUEST_API = 'REQUEST_API';
// export const RESPONSE_API = 'RESPONSE_API';
// export const requestAPI = () => ({ type: REQUEST_API });
// export const responseApi = (data) => ({ type: RESPONSE_API, data });

// make a action
// export function TakeApi() {
//   return async (dispatch) => {
//     try {
//       dispatch(requestAPI());
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await response.json();
//       dispatch(responseApi(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
