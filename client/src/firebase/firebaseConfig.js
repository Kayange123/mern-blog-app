import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "album-app-d7d6f.firebaseapp.com",
  projectId: "album-app-d7d6f",
  storageBucket: "album-app-d7d6f.appspot.com",
  messagingSenderId: "533560068828",
  appId: "1:533560068828:web:cd222aafed4f06178f8219",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const blogsFirestore = app.firestore();
const blogsStorage = app.storage();
const timestamp = app.firestore.FieldValue.serverTimestamp;

export { blogsFirestore, blogsStorage, timestamp };
