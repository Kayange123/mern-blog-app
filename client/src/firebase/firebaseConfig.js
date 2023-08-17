import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "mernblogapp-5c8ce.firebaseapp.com",
  projectId: "mernblogapp-5c8ce",
  storageBucket: "mernblogapp-5c8ce.appspot.com",
  messagingSenderId: "411506367851",
  appId: "1:411506367851:web:f79fc87656ff88e6af802e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const blogsFirestore = app.firestore();
const blogsStorage = app.storage();
const timestamp = app.firestore.FieldValue.serverTimestamp;

export { blogsFirestore, blogsStorage, timestamp };
