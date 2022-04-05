import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabela from './Tabela';
// import { getExpenses } from '../actions';
// import { GASTOS_TOTAIS } from '../actions';

class Header extends React.Component {
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
          <h1 data-testid="total-field">{expenses}</h1>
        </header>
        <Tabela />
      </div>
    );
  }
}
// ->pegando do global o email
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
//  const mapDispatchToProps = (dispatch) => ({
  //  expenses: (expenses) => dispatch(getExpenses(expenses)),
//  });
Header.propTypes = {
  email: PropTypes.string.isRequired,
};
Header.propTypes = {
  expenses: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps)(Header);
