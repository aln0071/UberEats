const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
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
