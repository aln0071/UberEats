import { gql } from '@apollo/client';
import queryMaker from '../queryMaker';

export default (params) => gql`
mutation {
    placeOrder(${queryMaker(params)})
}
`;
