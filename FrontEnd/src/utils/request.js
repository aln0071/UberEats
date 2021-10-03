export const post = (url, body, headers = {}) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
});

export const get = (url) => fetch(url);
