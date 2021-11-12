const kafka = require('kafka-node');
require('dotenv').config();

const ipAddress = process.env.KAFKA_SERVER;
const port = process.env.KAFKA_PORT;

const client = new kafka.KafkaClient({ kafkaHost: `${ipAddress}:${port}` });
const consumer = new kafka.Consumer(
  client,
  [
    { topic: 'user-topic', partitions: 0 },
    { topic: 'location-topic', partitions: 1 },
  ],
  {
    autoCommit: false,
  },
);
consumer.on('message', (message) => {
  console.log(message);
});
