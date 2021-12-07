import client from '.';

export default (query) => client.query({
  query,
  fetchPolicy: 'no-cache',
});
