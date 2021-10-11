/**
 * @jest-environment jsdom
 */
/* eslint no-undef: 0, react/jsx-filename-extension: 0 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { testStore } from '../../utils';
import Home from '../Home';

describe('Render Home Screen', () => {
  test('Check logout button', () => {
    const store = testStore({
      user: {
        pictures: '[]',
      },
    });
    render(
      <Provider store={store}>
        <HashRouter>
          <Home />
        </HashRouter>
      </Provider>,
    );
    expect(screen.getByText('Logout')).not.toBeNull();
  });
});
