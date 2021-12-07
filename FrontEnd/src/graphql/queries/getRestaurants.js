import { gql } from '@apollo/client';
import queryMaker from '../queryMaker';

export default ({ citycode, statecode, countrycode }) => gql`
query {
    Restaurants(${queryMaker({ citycode, statecode, countrycode })}) {
        email,
        token,
        name,
        type,
        city,
        state,
        country,
        location,
        zip,
        pictures,
        nickname,
        phone,
        description,
        citycode,
        statecode,
        countrycode,
        deliverymode,
        userid,
        restaurantid,
        dob
    }
}
`;
