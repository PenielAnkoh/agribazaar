import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {auth} from "./firebaseConfiguration.js"


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email ,password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful!", user);
        alert("Login succesful!");
        window.location.href="../agribazaar2/home.html";

    }).catch((error)=>{
        console.error("Login Error:", error.message);
        alert("Login failed: " + error.message);
    });
});



