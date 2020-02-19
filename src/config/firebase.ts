import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDjMen2a-UQY4jW1m9GOHOq628999vqf2I",
  authDomain: "cool-event-planner.firebaseapp.com",
  databaseURL: "https://cool-event-planner.firebaseio.com",
  projectId: "cool-event-planner",
  storageBucket: "cool-event-planner.appspot.com",
  messagingSenderId: "892621156813",
  appId: "1:892621156813:web:8be268800ea76880"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
