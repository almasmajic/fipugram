import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
    apiKey: "AIzaSyBGTSix4QP4xRMCQXPMdsg8AZyVKUyf_FQ",
    authDomain: "fipugram-383a0.firebaseapp.com",
    projectId: "fipugram-383a0",
    storageBucket: "fipugram-383a0.appspot.com",
    messagingSenderId: "928674528033",
    appId: "1:928674528033:web:508b5d69a4b0e956159c60"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();

  export { firebase, db }; 