
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries


  const firebaseConfig = {
    apiKey: "AIzaSyD5-EhbAu4yf_FwMqA9jGTBbwUxjYtPrKg",
    authDomain: "agribazaar-authentication.firebaseapp.com",
    databaseURL: "https://agribazaar-authentication-default-rtdb.firebaseio.com",
    projectId: "agribazaar-authentication",
    storageBucket: "agribazaar-authentication.firebasestorage.app",
    messagingSenderId: "223606941579",
    appId: "1:223606941579:web:7f107ad9ef068df8b8318e",
    measurementId: "G-0VVRKYE6HG"
  };



  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth =getAuth(app)
  export const database=getDatabase(app)
