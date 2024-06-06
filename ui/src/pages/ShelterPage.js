import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { LuDog } from "react-icons/lu";
import axios from 'axios';



// Shelter id will be passed from login or register page, hardcoded for testing
// const id = 4;

function ShelterPage() {

    const location = useLocation();
    const id = location.state.shelter_id;

    // Shelter info
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");

    // Get shelter info
    const getShelterInfo= async(id) => {
        console.log('id ', id);
        // const response = await axios.get(`http://127.0.0.1:8010/get-shelter/${id}`);
        const response = await axios.get(`https://server-animal-adoption-app.uc.r.appspot.com/get-shelter/${id}`);
        const data = response.data;
        console.log(data);
        setName(data.shelter_name);
        setAddress(data.address);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setWebsite(data.website_link);

        return data;
    }

    useEffect(() => {
        getShelterInfo(id);
    }, [])

    return (
        <>
        <article class="pets-background">
            <div class="rescue_info">
                <h2 class="rescue_name">{name}</h2>
                <div class="rescue_details">
                    <h3>{address} &emsp; &ensp; {email} &emsp; &ensp; {phoneNumber}</h3>
                    <h3>{website}</h3>
                </div>
            </div>
            <div class="edit_buttons">
                <Link to="/shelter/animals" state={{id: id}}>
                    <button class="edit_button">
                        <span class="button_content"><LuDog />&nbsp; View our pets</span>
                    </button>
                </Link>
                <Link to="/shelter/add-animal" state={{id: id}}>
                    <button class="edit_button">
                        <span class="button_content"><IoMdAddCircle/>&nbsp;Add new animal</span>
                    </button>
                </Link>
                <Link to="/shelter/edit-profile" state={{id: id}}>
                    <button class="edit_button">
                        <span class="button_content"><MdOutlineModeEdit />&nbsp;Edit Profile</span>
                    </button>
                </Link>
            </div>
        </article>

        </>
    )
}

export default ShelterPage;