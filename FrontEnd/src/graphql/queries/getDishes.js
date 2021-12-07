import { gql } from '@apollo/client';

export default (restaurantid) => gql`
  query {
    Dishes(restaurantid: "${restaurantid}") {
      dishid,
      dishname,
      description,
      category,
      price,
      restaurantid,
      pictures
    }
  }
`;
