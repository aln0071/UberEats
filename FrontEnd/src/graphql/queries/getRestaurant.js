import { gql } from '@apollo/client';

export default ({ restaurantid }) => gql`
query {
    Restaurant(restaurantid: "${restaurantid}" ) {
        email,
        name,
        type,
        city,
        state,
        country,
        location,
        zip,
        pictures,
        phone,
        description,
        citycode,
        statecode,
        countrycode,
        deliverymode,
        userid,
        restaurantid,
    }
}
`;
