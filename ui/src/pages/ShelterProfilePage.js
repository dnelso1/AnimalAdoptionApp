import React from 'react';
import { MdOutlineModeEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


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
            <div>
                <button class="edit_button"><MdOutlineModeEdit />&nbsp;Edit Profile</button>
                <button class="edit_button"><IoSettingsOutline />&nbsp;Settings</button>
            </div>
            <div>
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