import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { GASTOS_TOTAIS } from '../actions';

class Header extends React.Component {
  // constructor() {
  //   super();
  //   const {
  //     despesasTotais = 0,
  //   } = this.state;
  // }

  render() {
    // const {
    //   despesasTotais,
    // } = this.state;
    const {
      email,
    } = this.props;
    return (
      <div className="Header">
        <header data-testid="email-field">
          <p>{email}</p>
          <p data-testid="header-currency-field">BRL</p>
          <h1 data-testid="total-field">0</h1>
        </header>
      </div>
    );
  }
}
// ->pegando do global o email
const mapStateToProps = (state) => ({
  email: state.user.email,
});
// dispachando o estado
// const mapDispatchToProps = (dispatch) => ({
//   user: (despesasTotais) => dispatch(GASTOS_TOTAIS(despesasTotais)),
// });
Header.propTypes = {
  email: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
