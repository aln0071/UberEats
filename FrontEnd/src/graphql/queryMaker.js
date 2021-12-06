export default (object) => Object.keys(object).reduce((query, key) => {
  if (query === '') {
    return `${key}: "${object[key]}"`;
  }
  return `${query}, ${key}: "${object[key]}"`;
}, '');
