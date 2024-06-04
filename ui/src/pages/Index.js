import '../User.css';
import React from 'react';


function Index() {
    const loginStatus = sessionStorage.getItem("loginStatus");
    const nameData = sessionStorage.getItem("nameData");
    const name = JSON.parse(nameData);
    if (!loginStatus) {
        alert("Please log in");
        window.location.href = "/login";

    }
    return (

    <div class="background">
        <div class="signup">
            <h1 id="create-header"> Welcome {name}</h1>
                <div class="container">
                    <div>
                        <a href="http://localhost:3000/edit" class="editbutton" id="editbutton">Edit Profile</a>
                    </div>
                    <div>
                        <a href="http://localhost:3000/logout" class="logoutbutton">Logout</a>
                    </div>
                </div>

        </div> 
    </div>
    )
};

export default Index;
   



