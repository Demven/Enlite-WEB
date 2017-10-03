import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

export default function connectMongo() {
  const options = {
    useMongoClient: true,
    promiseLibrary: Promise,
  };
  let connectionURI;
  if (process.env.NODE_ENV === 'production') {
    connectionURI = process.env.MONGODB_USERNAME + ':' +
      process.env.MONGODB_PASSWORD + '@' +
      process.env.MONGODB_HOST + ':' +
      process.env.MONGODB_PORT + '/' +
      process.env.MONGODB_DATABASE_NAME;
  } else {
    connectionURI = 'mongodb://localhost/prod';
  }

  global.console.log('connectionString: ' + connectionURI);

  mongoose.connect(connectionURI, options, (error) => {
    if (error) {
      global.console.error(error);
    } else {
      global.console.log('Connected to the database.');
    }
  });
}
