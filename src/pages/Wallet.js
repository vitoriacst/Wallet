import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { TakeApi } from '../actions';
import Form from '../components/Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { api } = this.props;
    api();
  }

  render() {
    // criando um map para passar o objeto para as options criando as options n linha 27
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}
// -> pregando o retorno da api (da funcao do retorno da api)
const mapDispatchToProps = (dispatch) => ({
  api: (currencies) => dispatch(TakeApi(currencies)),
});

Wallet.propTypes = {
  api: PropTypes.func,
  currencies: PropTypes.string,
}.isRequired;
export default connect(null, mapDispatchToProps)(Wallet);
