import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { TakeApi } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { api } = this.props;
    api();
  }

  render() {
    const {
      currencies,
    } = this.props;
    console.log(currencies);
    return (
      <div>
        <Header />
        <p>{currencies}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
// mapDispatch vem trazendo as infos
const mapDispatchToProps = (dispatch) => ({
  api: () => dispatch(TakeApi()),
});
Wallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
