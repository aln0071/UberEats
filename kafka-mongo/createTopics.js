const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const topicsToCreate = [
  {
    topic: 'user-topic',
    partitions: 1,
    replicationFactor: 1,
  },
  {
    topic: 'location-topic',
    partitions: 1,
    replicationFactor: 1,
  },
];

client.createTopics(topicsToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
  console.log(error, result);
});
