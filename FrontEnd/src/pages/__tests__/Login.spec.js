/**
 * @jest-environment jsdom
 */
/* eslint no-undef: 0, react/jsx-filename-extension: 0 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { testStore } from '../../utils';
import Login from '../Login';

describe('Render Login Screen', () => {
  beforeEach(() => {
    const store = testStore({});
    render(
      <Provider store={store}>
        <HashRouter>
          <Login />
        </HashRouter>
      </Provider>,
    );
  });

  test('Check login header', () => {
    expect(screen.getByRole('heading', { name: /Login/i })).not.toBeNull();
  });

  test('Check dont have an account link', () => {
    expect(
      screen.getByRole('link', { name: 'Dont have an account?' }),
    ).not.toBeNull();
    fireEvent.click(screen.getByText('Dont have an account?'));
  });

  test('Test email field', () => {
    const inputEl = screen.getByTestId('email-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'email');
    userEvent.type(inputEl, 'test@mail.com');
    expect(screen.getByTestId('email-input')).toHaveValue('test@mail.com');
  });

  test('Test password field', () => {
    const inputEl = screen.getByTestId('password-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'password');
    userEvent.type(inputEl, 'helloworld');
    expect(screen.getByTestId('password-input')).toHaveValue('helloworld');
  });
});
