import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';

import { renderWithRouterAndStore } from './helpers/testConfig';

import {
  EMAIL_INPUT_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_EMAIL_0,
  INVALID_EMAIL_1,
  INVALID_EMAIL_2,
  INVALID_EMAIL_3,
  INVALID_PASSWORD,
} from './helpers/constants';

afterEach(() => jest.clearAllMocks());

describe('1 - Crie uma página inicial de login com os seguintes campos e características:', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndStore(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Entrar\'', () => {
    renderWithRouterAndStore(<App />, '/');

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
    renderWithRouterAndStore(<App />);

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, INVALID_EMAIL_0);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_1);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_2);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, INVALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, INVALID_EMAIL_3);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });

  test('Salve o email no estado da aplicação, com a chave email, assim que o usuário logar.', () => {
    const { store } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(store.getState().user.email).toBe(VALID_EMAIL);
  });

  test('A rota deve ser mudada para \'/carteira\' após o clique no botão.', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
