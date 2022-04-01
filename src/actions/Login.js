export const LOGIN_INPUT_EMAIL = 'LOGIN_INPUT_EMAIL';
// action do email de Login
export const loginInputEmail = (email) => (
  {
    type: LOGIN_INPUT_EMAIL, value: email,
  }
);
