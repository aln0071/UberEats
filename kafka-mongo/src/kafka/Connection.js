/* eslint camelcase: 0, no-multi-assign: 0 */
const kafka = require('kafka-node');
require('dotenv').config();

const ipAddress = process.env.ZOOKEEPER_SERVER;
const port = process.env.ZOOKEEPER_PORT;
function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.KafkaClient(`${ipAddress}:${port}`);
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on('ready', () => {
      console.log('client ready!');
    });

    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(`${ipAddress}:${port}`);
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log('producer ready');
    }
    return this.kafkaProducerConnection;
  };
}
module.exports = ConnectionProvider;
