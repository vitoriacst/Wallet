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
    return (
      <div>
        <Header />
      </div>
    );
  }
}
// const mapStateToProps = (state) => ({
//   currencies: state.wallet.currencies,
// });
// mapDispatch vem trazendo as infos
const mapDispatchToProps = (dispatch) => ({
  api: (currencies) => dispatch(TakeApi(currencies)),
});
Wallet.propTypes = {
  api: PropTypes.func,
}.isRequired;
export default connect(null, mapDispatchToProps)(Wallet);
