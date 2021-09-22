export const post = (url, body) => fetch(url, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = (url) => fetch(url);
