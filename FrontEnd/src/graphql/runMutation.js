import client from '.';

export default (mutation) => client.mutate({
  mutation,
});
