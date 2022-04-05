import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// -> aqui esta o componente Header
class Header extends React.Component {
  convertedValue = () => {
    const { expenses } = this.props;
    console.log(expenses);
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach((element) => {
        const converte = element.exchangeRates[element.currency].ask;
        total += element.value * converte;
      });
    }
    return total.toFixed(2);
  }

  render() {
    const {
      email,
    } = this.props;

    return (
      <div className="Header">
        <header data-testid="email-field">
          <p>{email}</p>
          <p data-testid="header-currency-field">BRL</p>
          <h1 data-testid="total-field">{this.convertedValue()}</h1>
        </header>
      </div>
    );
  }
}
// ->pegando do global o email
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
// const mapDispatchToProps

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps)(Header);
