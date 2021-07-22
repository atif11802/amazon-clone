
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCn5X1Al_YR64VmeCESLBFAz8qHwjVGShk",
    authDomain: "clone-2aa0c.firebaseapp.com",
    projectId: "clone-2aa0c",
    storageBucket: "clone-2aa0c.appspot.com",
    messagingSenderId: "580072214946",
    appId: "1:580072214946:web:9f00785a948508875062fb"
  };


  const firebaseApp =firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const store = firebaseApp.storage();

  export {db, auth, store};