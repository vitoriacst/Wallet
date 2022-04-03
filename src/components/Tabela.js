import React from 'react';
// criando a tabela -> https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table
class Tabela extends React.Component {
  render() {
    return (
      <table>
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
      </table>
    );
  }
}

export default Tabela;
