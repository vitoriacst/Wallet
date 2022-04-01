import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginInputEmail } from '../actions/Login';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      email: '',
      password: '',

    };
  }

  handleChange = ({ target }) => {
    const {
      value,
      name,
    } = target;
    this.setState({
      [name]: value,
    }, this.habilitButton);
  }

// ->essa funcao faz as verificacoes dos valores recebidos dentro dos inputs para que o botao seja hablidade
habilitButton = () => {
  const {
    email,
    password,

  } = this.state;
  const passwordLength = 6;
  const emailTest = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (emailTest.test(email) && password.length >= passwordLength) {
    this.setState({
      button: false,
    });
  } else {
    this.setState({
      button: true,
    });
  }
};

// redirect para outro componente
  changeComponent = (event) => {
    event.preventDefault();
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
              name="password"
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
  user: (email) => dispatch(loginInputEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
Login.propTypes = {
  user: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
