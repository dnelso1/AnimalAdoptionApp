import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function ShelterAnimalDetails() {
    const location = useLocation();
    const data = location.state?.data;

    const handleDelete = async () => {
        if (window.confirm("Your review will be permanently deleted. Press 'OK' to proceed.") === true) {
            const response = await axios.delete(`http://127.0.0.1:8010/delete-pet-profile/${data.animal_id}`)
            if (response.status === 204) {
                window.alert("The profile was successfully deleted.")
            }
        }
    }

    return(
        <>
            <div>
                <div class="pet-details-row">
                    <div class="pet-details-col">
                        <img src={data.pictures[0]} class="pet-detail-image"/>
                    </div>
                    <div class="pet-details-col">
                        <div class="pet-details">
                            <div class="pet-details-name">{data.name}</div>
                            <div class="pet-details-description">{data.description}</div>
                            <div class="pet-details-rest">
                                <div class="pet-detail"> <b>Species: </b> {data.type}</div>
                                <div class="pet-detail"><b>Breed: </b> {data.breed}</div>
                                <div class="pet-detail"><b>Gender:</b> {data.gender}</div>
                                <div class="pet-detail"><b>Age: </b>{data.age}</div>
                                <div class="pet-detail"><b>Disposition: </b>{data.disposition}</div>
                                <div class="pet-detail"><b>Status: </b>{data.availability}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pet-details-row">
                    <button onClick={handleDelete}><FaTrashAlt /> Delete Pet Profile </button>
                </div>
            </div>
        </>
    )
}

export default ShelterAnimalDetails;