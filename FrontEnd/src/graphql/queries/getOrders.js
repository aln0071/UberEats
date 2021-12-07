import { gql } from '@apollo/client';
import queryMaker from '../queryMaker';

export default ({
  userid, type, index, offset,
}) => gql`
  query {
    Orders(${queryMaker({
    userid,
    type,
    index,
    offset,
  })}) {
      count,
      orders {
          canceled,
          preparing,
          onway,
          delivered,
          ready,
          pickedup,
          city,
          citycode,
          created,
          deliveryfee,
          deliverymode,
          items {
              dishname,
              price,
              quantity
          },
          location,
          name,
          price,
          restaurantid,
          status,
          tax,
          userid,
          customername,
          customeremail,
          customerphone,
          instructions,
          zip,
          _id
      }
    }
  }
`;
