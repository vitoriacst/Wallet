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
    // criando um map para passar o objeto para as options criando as options n linha 27
    return (
      <div>
        <Header />
        <input type="text" data-testid="value-input" />
        <input type="text" data-testid="description-input" />
        <label htmlFor="moeda">
          moeda
          <select name="select" data-testid="currency-input" id="moeda">
            {
              currencies.map((currencie, index) => (
                <option key={ index } value={ currencie }>
                  {currencie}
                </option>
              ))
            }

          </select>
        </label>
        <label htmlFor="pgamento">
          método de pagamento
          <select data-testid="method-input" id="pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>

        </select>
      </div>
    );
  }
}
// -> pregando o retorno da api (da funcao do retorno da api)
const mapDispatchToProps = (dispatch) => ({
  api: (currencies) => dispatch(TakeApi(currencies)),
});
// puxando o estado direto do reducer wallet -> que retorna um objeto
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  api: PropTypes.func,
  currencies: PropTypes.string,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
