/* eslint camelcase: 0 */
const Connection = require('./kafka/Connection');

const connection = new Connection();
// topics files
// var signin = require('./services/signin.js');
const Users = require('./services/user');

// connect to mongoose
const connect = require('./utils/connect');

connect();

function handleTopicRequest(topic_name, fname) {
  // var topic_name = 'root_topic';
  const consumer = connection.getConsumer(topic_name);
  const producer = connection.getProducer();
  console.log('server is running ');
  consumer.on('message', async (message) => {
    console.log(`message received for ${topic_name} `, fname);
    console.log(JSON.stringify(message.value));
    const data = JSON.parse(message.value);
    console.log(data);

    const payload = {
      topic: data.replyTo,
      partition: 0,
    };

    try {
      const response = await fname.handleRequest(
        data.subtype,
        data.data,
        () => {},
      );
      payload.messages = JSON.stringify({
        correlationId: data.correlationId,
        data: response,
      });
    } catch (error) {
      payload.message = JSON.stringify({
        correlationId: data.correlationId,
        data: {
          error: error.message,
        },
      });
      console.log(error);
    } finally {
      producer.send([payload], (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
    }
  });
}
// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request
handleTopicRequest('user_topic', Users);
