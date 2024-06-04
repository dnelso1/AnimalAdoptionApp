import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { LuDog } from "react-icons/lu";

// Shelter id will be passed from login or register page, hardcoded for testing
const id = 1;

function ShelterPage() {
    return (
        <>
        <article class="pets-background">
            <div class="rescue_info">
                <h2 class="rescue_name">Pet Rescue of Boston</h2>
                <div class="rescue_details">
                    <h3>123 Main St, Boston MA &emsp; &ensp;  bostonrescue@gmail.com &emsp; &ensp; (999)-999-9999</h3>
                    <h3>petrescueboston@gmail.com</h3>
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