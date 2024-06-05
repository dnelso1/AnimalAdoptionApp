import '../User.css';
import React from 'react';


function Index() {
    const loginStatus = sessionStorage.getItem("loginStatus");
    const nameData = sessionStorage.getItem("nameData");
    if (!loginStatus) {
        alert("Please log in");
        window.location.href = "/login";

    }
    return (
    <div class="background">
        <div class="signup">
            <h1 id="create-header"> Welcome {nameData}</h1>
                <div class="container">
                    <div>
                        <a href="/" class="homebutton">Landing Page</a>
                    </div>
                    <div>
                        <a href="/browse" class="browsebutton">Browse Animals</a>
                    </div>
                    <div>
                        <a href="/edit" class="editbutton" id="editbutton">Edit Profile</a>
                    </div>
                    <div>
                        <a href="/logout" class="logoutbutton">Logout</a>
                    </div>
                
                </div>

        </div> 
    </div>
    )
};

export default Index;
   




