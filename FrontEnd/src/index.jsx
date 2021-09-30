import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import fetchIntercept from 'fetch-intercept';
import App from './App';
import './styles.scss';
import store from './store';

/* eslint no-param-reassign: 0 */
fetchIntercept.register({
  request(url, config) {
    // Modify the url or config here
    const { user } = store.getState();
    const { token } = user;
    const auth = {
      Authorization: token,
    };
    if (config) {
      if (config.headers) {
        config.headers = {
          ...config.headers,
          ...auth,
        };
      } else {
        config.headers = auth;
      }
    } else {
      return [url, { headers: { ...auth } }];
    }
    return [url, config];
  },

  requestError(error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response(response) {
    // Modify the reponse object
    return response;
  },

  responseError(error) {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

const engine = new Styletron();

ReactDOM.render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </Provider>,
  document.getElementById('root'),
);
