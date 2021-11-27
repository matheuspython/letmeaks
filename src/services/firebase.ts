import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAHpriLt_GUuXqbRg5u5Er45RtHtFNAMPc",
  authDomain: "nlwletmeaks.firebaseapp.com",
  databaseURL: "https://nlwletmeaks-default-rtdb.firebaseio.com",
  projectId: "nlwletmeaks",
  storageBucket: "nlwletmeaks.appspot.com",
  messagingSenderId: "84307817907",
  appId: "1:84307817907:web:ce1a258ca11cf3bfb5c7c6"
};

/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomai/n: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
*/

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }
