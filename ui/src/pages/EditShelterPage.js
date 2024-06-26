import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function EditShelterPage() {
    const location = useLocation();
    const id = location.state?.id;

    // Shelter info
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");

    // Get shelter info based on id
    const getShelterInfo = async (id) => {
        const response = await axios.get(`https://server-animal-adoption-app.uc.r.appspot.com/get-shelter/${id}`);
        const data = response.data;
        setName(data.shelter_name);
        setAddress(data.address);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setWebsite(data.website_link);
    }   

    useEffect(() => {
        getShelterInfo(id);
    }, [])

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
        setWebsite(e.target.value)
    }

    // Handle form submission
    const handleSubmit = async () => {
        const data = {
            "name": name,
            "address": address,
            "email": email,
            "phone_number": phoneNumber,
            "website": website
        }
        const response = await axios.put(`https://server-animal-adoption-app.uc.r.appspot.com/update-shelter/${id}`, data)
        console.log(response)
        if (response.status === 200) {
            window.alert('Your profile was successfully updated!')
        } else {
            window.alert("Your profile was unable to be updated.")
        }
    }

    return(
        <div class="pets-background">
        <form class="shelter-profile-form" onSubmit={(e) => {e.preventDefault();}}>
            <h2>Update your profile information:</h2>
            <ul class="column">
                <li>
                    <label for="name">Name:</label>
                    <input
                        id="name"
                        class="shelter-input"
                        name="name" 
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                    />
                </li>
                <li>
                    <label for="address">Address:</label>
                    <input
                        id="address"
                        class="shelter-input"
                        name="address"
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </li>
                <li>
                    <label for="email">Email:</label>
                    <input
                        id="email"
                        class="shelter-input"
                        name="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </li>
                <li>
                    <label for="phone_number">Phone number:</label>
                    <input
                        id="phone_number"
                        class="shelter-input"
                        name="phone_number"
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                </li>
                <li>
                    <label for="website">Website address:</label>
                    <input
                        id="website"
                        class="shelter-input"
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
    )
}

export default EditShelterPage;