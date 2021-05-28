import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBoWevv06Cv7LVFtISFStLClaovs-tLOgI",
    authDomain: "vue-todo-2021-85ffb.firebaseapp.com",
    projectId: "vue-todo-2021-85ffb",
    storageBucket: "vue-todo-2021-85ffb.appspot.com",
    messagingSenderId: "714087020551",
    appId: "1:714087020551:web:12cbbe9e281564bd96d2a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore();