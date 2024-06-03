import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from "react-router-dom";



function ShelterAnimals() {
    const location = useLocation();
    // const id = location.state?.id;
    const id = 1;

    const [shelterAnimals, setShelterAnimals] = useState([null, null, null, null])

    // Get all shelter animals
    const getShelterAnimals = async() => {
        const response = await axios.get(`http://127.0.0.1:8010/get-shelter-animals/${id}`);
        const data = response.data;
        console.log(data)
        return data;
    }

    // Create columns of animal profiles to display
    const createDisplayColumns = (data) => {
        const column1 = [], column2 = [], column3 = [], column4 = [];
        for (let i = 0; i < data.length; i++) {
            if (column1.length == column4.length) {
                column1.push(data[i]);
            }
            else if (column1.length > column2.length) {
                column2.push(data[i]);
            }
            else if (column2.length > column3.length) {
                column3.push(data[i]);
            }
            else {
                column4.push(data[i]);
            }
        }
        const columns = [column1, column2, column3, column4];
        setShelterAnimals(columns)
    }

    useEffect(() => {
        getShelterAnimals().then((data) => createDisplayColumns(data))
    }, [])

    return(
        <div class="pets-background">
            <h1 class="shelter-pets-title">Meet Our Animals!</h1>
            <div class="pet-row">
                <div class="pet-column">
                    {
                        shelterAnimals[0]?.map((animalProfile) => {
                            return (
                                <figure class="pet-figure">
                                    <Link to="/shelter/animal-details">
                                        <img src={animalProfile.pictures[0]} class="pet-image"/>
                                    </Link>
                                    <figcaption class="pet-figure-name">{animalProfile.name}</figcaption>
                                    <figcaption class="pet-figure-details">{animalProfile.age} years old &emsp; • &emsp; {animalProfile.breed}</figcaption>
                                </figure>
                            )
                        })
                    }
                </div>
                <div class="pet-column">
                    {
                        shelterAnimals[1]?.map((animalProfile) => {
                            return (
                                <figure class="pet-figure">
                                    <Link to="/shelter/animal-details">
                                        <img src={animalProfile.pictures[0]} class="pet-image"/>
                                    </Link>
                                    <figcaption class="pet-figure-name">{animalProfile.name}</figcaption>
                                    <figcaption class="pet-figure-details">{animalProfile.age} years old &emsp; • &emsp; {animalProfile.breed}</figcaption>
                                </figure>
                            )
                        })
                    }
                </div>
                <div class="pet-column">
                    {
                        shelterAnimals[2]?.map((animalProfile) => {
                            return (
                                <figure class="pet-figure">
                                    <Link to="/shelter/animal-details">
                                        <img src={animalProfile.pictures[0]} class="pet-image"/>
                                    </Link>
                                    <figcaption class="pet-figure-name">{animalProfile.name}</figcaption>
                                    <figcaption class="pet-figure-details">{animalProfile.age} years old &emsp; • &emsp; {animalProfile.breed}</figcaption>
                                </figure>
                            )
                        })
                    }
                </div>
                <div class="pet-column">
                    {
                        shelterAnimals[3]?.map((animalProfile) => {
                            return (
                                <figure class="pet-figure">
                                    <Link to="/shelter/animal-details">
                                        <img src={animalProfile.pictures[0]} class="pet-image"/>
                                    </Link>
                                    <figcaption class="pet-figure-name">{animalProfile.name}</figcaption>
                                    <figcaption class="pet-figure-details">{animalProfile.age} years old &emsp; • &emsp; {animalProfile.breed}</figcaption>
                                </figure>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ShelterAnimals;