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
import Register from '../Register';

describe('Render Register Screen', () => {
  beforeEach(() => {
    const store = testStore({});
    render(
      <Provider store={store}>
        <HashRouter>
          <Register />
        </HashRouter>
      </Provider>,
    );
  });

  test('Check register header', () => {
    expect(screen.getByRole('heading', { name: /Register/i })).not.toBeNull();
  });

  test('Check already have an account link', () => {
    expect(
      screen.getByRole('link', { name: 'Already have an account?' }),
    ).not.toBeNull();
    fireEvent.click(screen.getByText('Already have an account?'));
  });

  test('Submit form', () => {
    expect(screen.getByRole('button', { name: 'Register' })).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));
  });

  test('Test name field', () => {
    const inputEl = screen.getByTestId('name-input');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('type', 'text');
    userEvent.type(inputEl, 'Alan');
    expect(screen.getByTestId('name-input')).toHaveValue('Alan');
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

  test('Test radio buttons', () => {
    const inputEl = screen.getByTestId('radio-input');
    expect(inputEl).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Customer' })).toHaveAttribute(
      'value',
      'c',
    );
    expect(screen.getByRole('radio', { name: 'Restaurant' })).toHaveAttribute(
      'value',
      'r',
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Restaurant' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Customer' }));
  });
});
