import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
// -> aqui eu construi o root reducer para que eu possa combinar todos os reducers no caso da aplicacao torns-se maior
const rootReducer = combineReducers({
  user, wallet,
});

export default rootReducer;
