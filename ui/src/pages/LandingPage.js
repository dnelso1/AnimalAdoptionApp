import React from 'react';
import '../LandingPage.css';

function LandingPage() {
    return (
        <>
            <title>PetMatch - Home</title>
            <link rel="stylesheet" href="/static/style.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <div class="background">
                <div class="landing-content">
                    <h1>Welcome to PetMatch</h1>
                    <div class="button-container">
                        <a href="/login" class="home-button">User Login</a>
                        <a href="/register" class="home-button">User Registration</a>
                        <a href="#" class="shelter-button">Shelter Login</a>
                        <a href="#" class="shelter-button">Shelter Registration</a>
                    </div>
                   
                {/* Demo Buttons Section */}
                    
                </div>
                <div class="demo-buttons">
                    <div class="button-container">
                        {/* Update this line */}
                        <a href="/shelter" class="shelter-profile-link">Shelter Home Page</a>
                        <a href="/browse">Browse Animals</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;

