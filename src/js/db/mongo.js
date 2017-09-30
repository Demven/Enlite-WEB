import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

export default function connectMongo() {
  const options = {
    useMongoClient: true,
    promiseLibrary: Promise,
  };
  let connectionURI;
  if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionURI = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
  } else {
    connectionURI = 'mongodb://localhost/prod';
  }

  console.info('connectionString: ' + connectionURI);

  mongoose.connect(connectionURI, options, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.info('Connected to the database.');
    }
  });
}
