import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                    
                </form>
            </div>
        </>
    )
}

export default ShelterLogin;