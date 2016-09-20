import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

export function connectMongo() {
  if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    const connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;

    global.console.info('connectionString: ' + connectionString);

    mongoose.connect(connectionString);
  } else {
    mongoose.connect('mongodb://localhost/prod');
  }

  global.console.info('Connect to the database.');
}
