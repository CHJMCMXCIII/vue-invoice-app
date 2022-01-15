import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBC2VzZS0M-JaRGAlWc3iAmopsyiFgmbHk",
    authDomain: "invoice-app-3775f.firebaseapp.com",
    projectId: "invoice-app-3775f",
    storageBucket: "invoice-app-3775f.appspot.com",
    messagingSenderId: "660802424014",
    appId: "1:660802424014:web:0e315481cc5b8e77e7549f",
    measurementId: "G-XLCM4RCEDQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
