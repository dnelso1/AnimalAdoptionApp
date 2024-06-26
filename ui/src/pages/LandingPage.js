import React from 'react';
import '../LandingPage.css';
import { Link } from 'react-router-dom';
import { FaPaw } from "react-icons/fa";

function LandingPage() {
    return (
        <>
            <title>PetMatch - Home</title>
            <link rel="stylesheet" href="/static/style.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <div class="background">
                <div class="landing-content">
                    <div className='landing-header'>
                        <h1 className='landing-title'>Welcome to PetMatch <FaPaw /></h1>
                        <h2 className='landing-page-description'>Find your perfect companion on this dating-app style site! Swipe through tons of available pets from local shelters and like your favorites!</h2>
                    </div>
                    <div class="button-container">
                    <Link to="/login">
                        <button class="home-button">
                            User Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button class="home-button">
                            User Registration
                        </button>
                    </Link>
                    <Link to="/shelter-login">
                        <button class="home-button">
                            Shelter Login
                        </button>
                    </Link>
                    <Link to="/shelter-registration">
                        <button class="home-button">
                            Shelter Registration
                        </button>
                    </Link>
                    </div>
                   
                {/* Demo Buttons Section */}
                    
                </div>
                <div class="demo-buttons">
                    <div class="button-container">
                        <Link to="/browse">
                            <button class="home-button">
                                Browse Animals
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;

