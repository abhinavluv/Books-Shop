const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://abhinav:universal@cluster0-o69rg.mongodb.net/test?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected to Database!!!');
            callback(client);
        })
        .catch(error => {
            console.log('Error while connecting to database: ', error);
        });
}

module.exports = mongoConnect;






