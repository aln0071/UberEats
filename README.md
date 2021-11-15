# Uber Eats
CMPE-273 - Lab 1 - Uber Eats web application

## Steps to run application
1. Clone the repository
2. Add the required environment variables in the .env files in both BackEnd and FrontEnd, and kafka-mongo folders.
3. Start the kafka server and run the kafkaSetup.sh script in the kafka-mongo folder.
4. Open a terminal and navigate to kafka-mongo folder and run command ```npm start``` to start the kafka-mongo server.
5. Open a terminal and navigate to BackEnd folder and run command ```npm start```  to start backend server.
6. Open a new terninal and navigate to the FrontEnd folder and run command ```npm start```  to start frontend server.
7. Open browser and navigate to http://localhost:PORT where port is the PORT specified in the .env file.
