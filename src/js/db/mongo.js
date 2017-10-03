import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

export default function connectMongo() {
  const options = {
    useMongoClient: true,
    promiseLibrary: Promise,
  };

  mongoose.connect(process.env.MONGODB_URI, options, (error) => {
    if (error) {
      global.console.error(error);
    } else {
      global.console.log('Connected to the database.');
    }
  });
}
