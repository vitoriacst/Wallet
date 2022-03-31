import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.setState = {
      button: false,
      email: '',
      password: '',
    };

    habilitButton = (event) => {
      const passwordLength = 3;
      const formatoEmail = 'alguem@alguem.com'
        .this.setState(() => ({
          email: event.target.value === formatoEmail,
          password: event.target.value.length >= passwordLength,
        }));
    };
  }

  render() {
    // setando os estados
    this.setState = {
      email,
      password,
    };
    // criacao do forms de login
    return (
      <>
        <div>Login</div>
        <section>
          <form>
            <input
              type="email"
              className="Input-login"
              data-testid="email-input"
              id="email"
              value={ email }
              onChange={ this.habilitButton }
            />
            <input
              type="password"
              className="Input-login"
              data-testid="password-input"
              value={ password }
              onChange={ this.habilitButton }
            />
            <button type="button">
              Entrar
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default Login;
