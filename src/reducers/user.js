// Esse reducer será responsável por tratar as informações da pessoa usuária
import { BUTTON_SUBMIT, LOGIN_INPUT_EMAIL, LOGIN_PASSWORD } from '../actions/Login';

const INITIAL_STATE = {
  email: '',
  password: '',
  button: false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_INPUT_EMAIL:
    return {
      email: '',
    };
  case LOGIN_PASSWORD:
    return {
      password: '',
    };
  case BUTTON_SUBMIT:
    return {
      button: true,
    };
  default:
    return state;
  }
}
export default loginReducer;
