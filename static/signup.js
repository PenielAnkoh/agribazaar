

import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {ref,set} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import {auth,database} from "./firebaseConfiguration.js";

document.getElementById("signupForm").addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("working");

    const firstName=document.getElementById("firstName").value;
    const lastName=document.getElementById("lastName").value;
    const email =document.getElementById("email").value;
    const password=document.getElementById("password").value;
    


    createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
        const userID=userCredentials.user.uid
        
        set(
            ref(database,"users/"+userID),{
                firstname:firstName,
                lastname:lastName,
                email:email,
                userid:userID,
                createdAt: new Date().toISOString()

            } )
            .then(()=>{
            alert("Sign-up succesful");
            document.getElementById("submitbutton").innerText="done"
            })
            .catch((dbError)=>{
                console.error("Database: ", dbError.message);
            alert("Error saving user details: " + dbError.message);

        });

    })
    .catch((dbError)=>{
        console.error("Auth Error: ", error.message);
        alert("Sign-up failed: " + error.message);
    });
    });