import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      email: '',
      password: '',

    };
  }

// ->essa funcao faz as verificacoes dos valores recebidos dentro dos inputs para que o botao seja hablidade
habilitButton = () => {
  const {
    email,
    password,

  } = this.state;
  const passwordLength = 5;
  const ValidPasswod = password.length >= passwordLength;
  const emailTest = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
  const isValidEmail = emailTest.test(email);
  const inputsValue = [ValidPasswod, isValidEmail];
  const haveThings = inputsValue.every((fields) => fields !== '');
  const FormValid = isValidEmail && haveThings && ValidPasswod;
  if (FormValid) {
    this.setState({
      button: false,
    });
  } else {
    this.setState({
      button: true,
    });
  }
};

handleChange = ({ target }) => {
  const {
    value,
    name,
  } = target;
  this.setState({
    [name]: value,
  }, this.habilitButton());
}

// //redirect && <Redirect to="/formdisplay" />
  changeComponent = () => {
    const {
      email,
    } = this.state;
    const {
      user,
      history,
    } = this.props;
    user(email);
    history.push('/carteira');
  }

  render() {
  // setando os estados

    const {
      email,
      password,
      button,
    } = this.state;
    // criacao do forms de login
    return (
      <>
        <div>Login</div>
        <section>
          <form>
            <input
              name="email"
              type="email"
              className="Input-login"
              data-testid="email-input"
              id="email"
              onChange={ this.handleChange }
              value={ email }
            />
            <input
              name="passwordInput"
              type="password"
              className="Input-login"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
            />
            <button
              type="button"
              name="button"
              disabled={ button }
              onClick={ this.changeComponent }
            >
              Entrar
            </button>
          </form>
        </section>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  user: (email) => dispatch(loginInputEmai(email)),
});

Login.propTypes = {
  user: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
