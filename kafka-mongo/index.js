const mongoose = require('mongoose');

async function test() {
    await mongoose.connect('mongodb+srv://ubereats.sqgqq.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        sslKey: 'cert.pem', 
        sslCert: 'cert.pem'
    })
    const Cat = mongoose.model('Cat', { name: String });

    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
}

test();

// const client = new MongoClient('mongodb+srv://ubereats.sqgqq.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
//   sslKey: credentials,
//   sslCert: credentials
// });
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("testDB");
//     const collection = database.collection("testCol");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);