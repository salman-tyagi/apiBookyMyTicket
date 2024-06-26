import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config({ path: '.env' });

const DB =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_DB
    : process.env.PRO_DB;

(async () => {
  try {
    await mongoose.connect(DB);
    console.log('DB connected successfully');
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
  } catch (err) {
    console.log(err);
  }
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT} in ${process.env.NODE_ENV}`);
});
