// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_INPUT_EMAIL } from '../actions/Login';

const INITIAL_STATE = {
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_INPUT_EMAIL:
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
}
export default loginReducer;
