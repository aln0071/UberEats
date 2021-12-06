/* eslint no-param-reassign: 0 */
function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export default (object) => Object.keys(object).reduce((query, key) => {
  // do not pass undefined values
  if (object[key] === undefined) {
    return query;
  }
  // add coma if query is non-empty
  if (query !== '') {
    query += ', ';
  }
  if (Array.isArray(object[key])) {
    return `${query} ${key}: ${JSON.stringify(object[key])}`; // arrays does not need quotes
  } if (isInt(object[key]) || isFloat(object[key])) {
    return `${query} ${key}: ${object[key]}`; // int and float does not need quotes
  }
  return `${query} ${key}: "${object[key]}"`;
}, '');
