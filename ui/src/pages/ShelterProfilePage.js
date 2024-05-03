import React from 'react';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";




function ShelterProfilePage() {
    return (
        <>
        <article>
            <div class="rescue_info">
                <h2 class="rescue_name">Pet Rescue of Boston</h2>
                <div class="rescue_details">
                    <h3>123 Main St, Boston MA &emsp; &ensp;  bostonrescue@gmail.com &emsp; &ensp; (999)-999-9999</h3>
                </div>
            </div>
            <div class="edit_buttons">
            <a href="/add-animal">
                <button class="edit_button">
                    <span class="button_content"><IoMdAddCircle/>&nbsp;Add new animal</span>
                </button>
            </a>
                <button class="edit_button">
                    <span class="button_content"><MdOutlineModeEdit />&nbsp;Edit Profile</span>
                </button>
                <button class="edit_button">
                    <span class="button_content"><IoSettingsOutline />&nbsp;Settings</span>
                </button>
            </div>
            <div class="content-buttons">
                <button class="page_button">Newsfeed</button>
                <button class="page_button">Available Pets</button>
                <button class="page_button">Recently Adopted</button>
                <button class="page_button">Messages</button>
            </div>
        </article>

        </>
    )
}

export default ShelterProfilePage;