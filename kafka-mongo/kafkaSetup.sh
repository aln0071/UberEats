#!/bin/bash
for TOPIC in location-topic; do
  /home/alan/Softwares/Softwares/kafka_2.13-3.0.0/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic $TOPIC
done