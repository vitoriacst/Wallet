import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabela from './Tabela';
// import { getExpenses } from '../actions';
// import { GASTOS_TOTAIS } from '../actions';

class Header extends React.Component {
  convertedValue = () => {
    const {
      expensesTotal,
    } = this.props;
    let total = 0;
    if (expensesTotal.length > 0) {
      expensesTotal.forEach((element) => {
        const converte = element.exachangeRates[element.currency].ask;
        total += element.value * converte;
      });
    }
    return total.toFixed(2);
  }

  render() {
    const {
      email,
      expenses,
    } = this.props;
    console.log(email);
    console.log(expenses);

    return (
      <div className="Header">
        <header data-testid="email-field">
          <p>{email}</p>
          <p data-testid="header-currency-field">BRL</p>
          <h1 data-testid="total-field">{this.convertedValue()}</h1>
        </header>
        <Tabela />
      </div>
    );
  }
}
// ->pegando do global o email
const mapStateToProps = (state) => ({
  email: state.user.email,
  expensesTotal: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps)(Header);
