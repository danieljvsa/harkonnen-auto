import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBuL1pMgwXjCsFelMVmQIaIuQ82w54jb3o",
    authDomain: "harkonnen-auto.firebaseapp.com",
    projectId: "harkonnen-auto",
    storageBucket: "harkonnen-auto.appspot.com",
    messagingSenderId: "128746503010",
    appId: "1:128746503010:web:5a9a76344b5140589d0a3b",
    databaseURL: "https://harkonnen-auto-default-rtdb.europe-west1.firebasedatabase.app"
  };

  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 const database = firebase.database()
 export default firebase