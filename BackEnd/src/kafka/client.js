/* eslint camelcase: 0 */
const RPC = require('./kafkarpc');

const rpc = new RPC();

// make request to kafka
function make_request(queue_name, sub_type, msg_payload, callback) {
  return rpc.makeRequest(
    queue_name,
    sub_type,
    msg_payload,
    (error, response) => {
      if (error) {
        console.log('error', error);
        callback(error, null);
      } else {
        // console.log('response', response);
        callback(null, response);
      }
    },
  );
}

exports.make_request = make_request;
