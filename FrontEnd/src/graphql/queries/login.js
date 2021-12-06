import { gql } from '@apollo/client';

export default (username, password) => gql`
query {
    Login(username: "${username}", password: "${password}") {
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
        dob
    }
}
`;
