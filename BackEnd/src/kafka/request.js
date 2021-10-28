/* eslint max-len: 0 */
const kafka = require('./client');

function kafkaRequest(topicName, subTopicName, body) {
  return new Promise((resolve, reject) => kafka.make_request(topicName, subTopicName, body, (err, result) => {
    if (err) {
      reject(err);
    } else if (result.error) {
      reject(new Error(result.error));
    } else {
      resolve(result);
    }
  }));
}

module.exports = kafkaRequest;
