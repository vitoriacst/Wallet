import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// criando a tabela -> https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table
class Tabela extends React.Component {
  render() {
    const {
      expenses,
    } = this.props;
    return (
      <table>
        <thread>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thread>
        <tbody>
          {
            expenses.map((item) => {
              const {
                id,
                value,
                description,
                currency,
                method,
                tag,
                exchangeRates,
              } = item;
              const nomeDaMoeda = exchangeRates[currency].name.split('/');
              const converteValue = (exchangeRates[currency].ask * value).toFixed(2);
              const takeAskValue = exchangeRates[currency].ask;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{nomeDaMoeda[0]}</td>
                  <td>{Number(takeAskValue).toFixed(2)}</td>
                  <td>{converteValue}</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
Tabela.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
export default connect(mapStateToProps)(Tabela);
