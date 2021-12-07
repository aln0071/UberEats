import { gql } from '@apollo/client';

export default (dishid) => gql`
mutation {
    deleteDish(dishid: "${dishid}")
}
`;
