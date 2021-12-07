import { gql } from '@apollo/client';

export default (userid) => gql`
  query {
    Addresses(userid: "${userid}") {
      city,
      citycode,
      location,
      zip
    }
  }
`;
