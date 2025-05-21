import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { ref,get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { database, auth } from "../static/firebaseConfiguration.js";

onAuthStateChanged(auth, (user)=>{
    if (user) {
        fetchUsers();
    } else {
        alert("You must be logged in to view the user list.");
        window.location.href ="../pages/login.html"
    }
});

function fetchUsers() {
    const usersRef = ref(database,"users");
    get(usersRef)
    .then((snapshot)=> {
        if (snapshot.exists()){
            const users = snapshot.val();
            populateUsersTable(users);
        } else {
                alert("No users found.");
        }
    })
    .catch((error) => {
        console.error("Error fetching users: ",error);
        alert("Failed to retieve users:" + error.message);
    });

    function populateUsersTable(users) {
        const usersTable = document.getElementById("userTable");
            usersTable.innerHTML = "";

            for (let userId in users) {
                const user = users[userId];
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>${user.createdAt}</td>
                `;
                usersTable.appendChild(row);
            }
    }
}
