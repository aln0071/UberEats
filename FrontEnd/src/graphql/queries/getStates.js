import { gql } from '@apollo/client';

export default (countrycode = '') => {
  if (countrycode === '') {
    return gql`
      query {
        States {
          state
          statecode
          countrycode
        }
      }
    `;
  }
  return gql`
    query {
        States(countrycode: "${countrycode}") {
            state,
            statecode,
            countrycode
        }
    }
    `;
};
