import* as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC4XcVFvirxqW6uYZriD_d0R_4jRJBRiD8",
  authDomain: "financial-tracker-app.firebaseapp.com",
  databaseURL: "https://financial-tracker-app.firebaseio.com",
  projectId: "financial-tracker-app",
  storageBucket: "financial-tracker-app.appspot.com",
  messagingSenderId: "890667479615",
  appId: "1:890667479615:web:d73b406f54fa48255cbe8a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);