import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip'


function ShelterRegistration() {
    const navigate = useNavigate();

    // Shelter info
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");

    // Update new shelter values on form change
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    const handleWebsiteChange = (e) => {
        setWebsite(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

     // Handle form submission
     const handleSubmit = async () => {
        const data = {
            "username": username,
            "password": password,
            "shelter_name": name,
            "address": address,
            "email": email,
            "phone_number": phoneNumber,
            "website_link": website
        }
        const response = await axios
            .post(`https://server-animal-adoption-app.uc.r.appspot.com/add-shelter`, data)
            .then((response) => {
                window.alert('Your account was successfully created!')
                const shelter_id = response.data.shelter_id
                navigate('/shelter', {state: {shelter_id: shelter_id}});
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    window.alert('The current username is already taken. Please try another username.')
                } else if (error.response?.status == 400) {
                    window.alert('One or more fields are missing. Please fill in missing values and try again.')
                } else {
                    window.alert('An error occurred. Please review your information and try again.')
                }
            })
    }

    return(
        <>
            <div className='pets-background'>
                <div className='shelter-registration-header'>
                    <h1 className='shelter-register-title'>Register for a Shelter Admin Account!</h1>
                    <h2 className='shelter-register-description'>After you register, you will be able to share your shelter information and all of your potential pets on PetMatch so they can find their perfect adoption match!</h2>
                </div>
            <form class="shelter-profile-form" onSubmit={(e) => {e.preventDefault();}}>
                <h2>Add your profile information:</h2>
                <ul class="col">
                    <li>
                        <label for="username">Username:</label>
                        <input
                            id="username"
                            className="text-form"
                            name="username" 
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </li>
                    <li>
                        <label for="password">Password:</label>
                        <input
                            className="text-form"
                            id="password"
                            name="password" 
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </li>
                </ul>
                <ul class="col">
                    <li>
                        <label for="name">Name:</label>
                        <input
                            className="text-form"
                            id="name"
                            name="name" 
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </li>
                    <li>
                        <label for="address">Address:</label>
                        <input
                            className="text-form"
                            id="address"
                            name="address"
                            type="text"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </li>
                    <li>
                        <label for="email">Email:</label>
                        <input
                            className="text-form"
                            id="email"
                            name="email"
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </li>
                    <li>
                        <label for="phone_number">Phone number:</label>
                        <input
                            className="text-form"
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </li>
                    <li>
                        <label for="website">Website address:</label>
                        <input
                            className="text-form"
                            id="website"
                            name="website"
                            type="text"
                            value={website}
                            onChange={handleWebsiteChange}
                        />
                    </li>
                </ul>
                <button type="submit" class="submit_button" onClick={handleSubmit}>Submit</button>
            </form>    
            </div>
        </>
    )
}

export default ShelterRegistration;