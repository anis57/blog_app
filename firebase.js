 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import {  getStorage,uploadBytes,ref as storageRef,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
 import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
 import {getDatabase,set,ref,get,remove,update} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyAIKRbZi8ymPklsZYNcOu38Hd3GXY3Ax98",
   authDomain: "authentication-345ac.firebaseapp.com",
   projectId: "authentication-345ac",
   storageBucket: "authentication-345ac.appspot.com",
   messagingSenderId: "924512394549",
   appId: "1:924512394549:web:7bf245303b2e634186807c",
   measurementId: "G-0X64JHRV90"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const  db = getDatabase(app);
 const storage = getStorage(app);


 export{auth, createUserWithEmailAndPassword,getDownloadURL,signInWithEmailAndPassword,onAuthStateChanged,signOut,db,set,ref,get,remove,update,storage,uploadBytes,storageRef}
 