import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { FaRegLightbulb } from "react-icons/fa";


function ShelterLogin() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        const response = await axios
            .get(`https://server-animal-adoption-app.uc.r.appspot.com/shelter-login?username=${username}&password=${password}`)
            .then((response) => {
                console.log("shelter found")
                const shelter_id = response.data.shelter_id
                navigate('/shelter', {state: {shelter_id: shelter_id}});
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    window.alert('Your username or password was incorrect. Please try again or register for an account.')
                }
            })
    }

    const handleSampleShelter = () => {
        navigate('/shelter', {state: {shelter_id: 4}})
    }


    return (
        <>
            <div class="pets-background">
                <form class="shelter-login-form" onSubmit={(e) => {e.preventDefault();}}>
                    <h2>Please enter you username and password.</h2>
                    <label className="text-label" for="username">Username:</label>
                    <input
                        className="text-form"
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />

                    <label class="text-label" for="password">Password:</label>
                    <input
                        className="text-form"
                        type="text"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button class="shelter-login-button" type="submit" onClick={handleSubmit}>Submit</button>
                    <p className='sample-shelter-text'>Not ready to create an account? Click below to see a sample shelter profile.</p>
                    <button onClick={handleSampleShelter}>View sample</button>
                    
                </form>
            </div>
        </>
    )
}

export default ShelterLogin;