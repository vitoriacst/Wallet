import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getExpenses } from '../actions';
import fetchApiCurrencies from '../service/fetchApiCurrencies';

const estadoInicial = {
  id: '',
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  expenses: {},
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
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const {
      changeState,
    } = this.props;
    const Api = await fetchApiCurrencies();
    this.setState = ({
      expenses: { id,
        value,
        description,
        currency,
        method,
        tag,
        exachangeRates: Api,
      },
    }, () => {
      const {
        expenses,
      } = this.state;
      changeState(expenses);
    });
  }

  converteValue = () => {
    const {
      expensesValue,
    } = this.props;
    let total = 0;
    if (expensesValue.length > 0) {
      expensesValue.forEach((element) => {
        const converte = element.exachangeRates[element.currency].ask;
        total += element.value * converte;
      });
    }
    return total.toFixed(2);
  }

  render() {
    const {
      currencies,
    } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <label htmlFor="valor">
          valor
          <input
            type="text"
            data-testid="value-input"
            id="valor"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          description
          <input
            type="text"
            data-testid="description-input"
            id="description"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          moeda
          <select
            name="currency"
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currencie, index) => (
                <option key={ index } value={ currencie }>
                  {currencie}
                </option>
              ))
            }

          </select>
        </label>
        <label htmlFor="pagamento">
          método de pagamento
          <select
            data-testid="method-input"
            id="pagamento"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <select
          data-testid="tag-input"
          name={ tag }
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>

        </select>
        <button
          type="button"
          onClick={ this.saveChanges }
        >
          Adicionar despesa
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesValue: state.wallet.expenses,
});

Form.propTypes = {
  currencies: PropTypes.string,
  expenses: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Form);
