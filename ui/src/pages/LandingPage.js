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
                        <a href="/index" class="home-button">User Login</a>
                        <a href="/register" class="home-button">User Registration</a>
                        <a href="#" class="shelter-button">Shelter Login</a>
                        <a href="#" class="shelter-button">Shelter Registration</a>
                    </div>
                    <div class="column-container">
                        <div class="news-column">
                            <h2>News Feed</h2>
                            <div class="white-box">
                                <div class="news-content">
                                    <div class="news-story">
                                        <h3>Headline 1</h3>
                                        <p>Description of the first news story...</p>
                                    </div>
                                    <div class="news-story">
                                        <h3>Headline 2</h3>
                                        <p>Description of the second news story...</p>
                                    </div>
                                    {/* need dynamic way to add stories with links */}
                                </div>
                            </div>
                        </div>
                        <div class="adopted-column">
                            <h2>Recently Adopted Animals</h2>
                            <div class="white-box"></div>
                            <div class="adopted-content">
                            {/* adopted animals will go here, similar to news feed */}
                            </div>
                        </div>
                    </div>
                {/* Demo Buttons Section */}
                    
                </div>
                <div class="demo-buttons">
                    <h2>Demo Buttons</h2>
                    <div class="button-container">
                        {/* Update this line */}
                        <a href="/shelter" class="shelter-profile-link">Shelter Profile</a>
                        <a href="/home">Animal Profile Page</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;

