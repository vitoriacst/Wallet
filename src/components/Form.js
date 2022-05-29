import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApiCurrencies from '../service/fetchApiCurrencies';
import { GET_EXPENSES } from '../actions/index';
import '../styles/Form.css';
// -> recuperar e fazer outra requisicao

const tagValue = 'Alimentação';
const estadoInicial = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: tagValue,
  expenses: { },
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = estadoInicial;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveChanges = async () => {
    const { expensesValue } = this.props;
    const api = await fetchApiCurrencies();
    const { id, value, description, currency, method, tag } = this.state;
    this.setState({
      expenses: { id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: api,
      },
    }, () => {
      const {
        expenses,
      } = this.state;
      expensesValue(expenses);
      this.setState((previousState) => ({
        id: previousState.id + 1,
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: tagValue,
      }));
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="div-form">
        <form>
          <label htmlFor="value-input">
            <input
              placeholder="value"
              className="input"
              data-testid="value-input"
              type="number"
              name="value"
              value={ value }
              id="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            <input
              placeholder="description"
              className="input"
              type="text"
              data-testid="description-input"
              id="description-input"
              value={ description }
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            <select
              className="input"
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((currencie, index) => (
                  <option key={ index } value={ currencie }>
                    {currencie}
                  </option>))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              className="input"
              data-testid="method-input"
              id="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option name="Dinheiro">Dinheiro</option>
              <option name="credito">Cartão de crédito</option>
              <option name="cartao de debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            <select
              className="input"
              data-testid="tag-input"
              id="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>

            </select>
          </label>
          <button
            className="button-wallet"
            type="button"
            id="button"
            onClick={ this.saveChanges }
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  expensesValue: (value) => dispatch(GET_EXPENSES(value)),
});

Form.propTypes = {
  currencies: PropTypes.string,
  expenses: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Form);
