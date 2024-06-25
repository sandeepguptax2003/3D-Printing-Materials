const dotenv = require('dotenv');
const admin = require('firebase-admin');
const serviceAccount = require('../firebase/d-printing-materials-firebase-adminsdk-trf49-2af18c49d8.json');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

module.exports = {
  bucket
};