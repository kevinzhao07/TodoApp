import firebase from 'firebase/app';
import 'firebase/firestore';

// A real time database for React
const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyA5pL13ZrQMhIVzdSqfpuAUCl7oswonLow",
    authDomain: "todoist-b5656.firebaseapp.com",
    databaseURL: "https://todoist-b5656.firebaseio.com",
    projectId: "todoist-b5656",
    storageBucket: "todoist-b5656.appspot.com",
    messagingSenderId: "111095960172",
    appId: "1:111095960172:web:27740139277848e9c4fe49",
});
  
// afterwards, we want to export this component
export { firebaseConfig as firebase };