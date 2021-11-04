#!/bin/bash
for TOPIC in location_topic user_topic dish_topic restaurant_topic response_topic; do
  /home/alan/Softwares/Softwares/kafka_2.13-3.0.0/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic $TOPIC
done