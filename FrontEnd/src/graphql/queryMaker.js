/* eslint no-param-reassign: 0 */
function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

const queryMaker = (object) => Object.keys(object).reduce((query, key) => {
  // do not pass undefined values
  if (object[key] === undefined) {
    return query;
  }
  // add coma if query is non-empty
  if (query !== '') {
    query += ', ';
  }
  if (Array.isArray(object[key])) {
    // iterate through array
    return `${query} ${key}: [${object[key].reduce((t, c) => {
      if (typeof c === 'object') {
        c = `{${queryMaker(c)}}`;
      } else {
        c = JSON.stringify(c);
      }
      if (t === '') {
        return c;
      }
      return `${t}, ${c}`;
    }, '')}]`; // arrays does not need quotes
  }
  if (isInt(object[key]) || isFloat(object[key])) {
    return `${query} ${key}: ${object[key]}`; // int and float does not need quotes
  }
  return `${query} ${key}: "${object[key]}"`;
}, '');

export default queryMaker;
