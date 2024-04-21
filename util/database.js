const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect('mongodb+srv://nvq12042003:quy12042003@cluster0.vdpgnlu.mongodb.net/booking?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      // console.log(client);
      _db = client.db();
      cb();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database fount';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb