import { gql } from '@apollo/client';

export default (statecode) => {
  if (statecode === '') {
    return gql`
      query {
        Cities {
          city
          citycode
        }
      }
    `;
  }
  return gql`
    query {
        Cities(statecode: "${statecode}") {
            city,
            citycode
        }
    }
    `;
};
