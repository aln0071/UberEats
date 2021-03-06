import { gql } from '@apollo/client';
import queryMaker from '../queryMaker';

export default ({ citycode, statecode, countrycode }) => gql`
query {
    Restaurants(${queryMaker({
    citycode: citycode || '',
    statecode: statecode || '',
    countrycode: countrycode || '',
  })}) {
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
