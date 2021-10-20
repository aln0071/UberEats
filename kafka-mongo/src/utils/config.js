const config = {
  connectionURL:
    'mongodb+srv://ubereats.sqgqq.mongodb.net/UberEatsDB?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslKey: 'cert.pem',
    sslCert: 'cert.pem',
  },
};

module.exports = config;
