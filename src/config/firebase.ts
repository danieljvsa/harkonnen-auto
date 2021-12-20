import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAEROnTAl0emlf2Qp9ez4NDrQJjko-xDQc",
  authDomain: "harkonnen-auto-760a0.firebaseapp.com",
  databaseURL: "https://harkonnen-auto-760a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "harkonnen-auto-760a0",
  storageBucket: "harkonnen-auto-760a0.appspot.com",
  messagingSenderId: "370628293776",
  appId: "1:370628293776:web:17e91147bc0aac68751415"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)


 const database = firebase.database()
 export default firebase