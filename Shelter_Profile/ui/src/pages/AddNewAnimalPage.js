import React from 'react';
import { useState } from 'react';

function AddNewAnimalPage() {
    const dispositions = ['Good with other animals', 'Good with children', 'Animal must be leashed at all times']
    const breeds = {
        dog: ["Golden Retriever", "German Shepard", "Labrador", "Bulldog", "Poodle", "Beagle", "Dachshund", "Boxer", "Other"],
        cat: ["Persian", "Maine Coon", "Siamese", "American Shorthair", "Sphynx", "Bengal", "Ragdoll", "Russian Blue", "Cornish Rex", "Other"],
        other: []
    }

    const [checkedState, setCheckedState] = useState([false, false, false]);
    const [name, setName] = useState('');
    const [animalType, setType] = useState('dog');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [newsBlurb, setNewsBlurb] = useState('');

    const handleCheckedStateChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleNewsBlurbChange = (e) => {
        setNewsBlurb(e.target.value);
    }

    const handleBreedChange = (e) => {
        setBreed(e.target.value);
    }

    const handleTypeChange = (type) => {
        setType(type);
    }

    // const getBreedsForType = () => {
    //     const breedsForType = breeds[type];
    // }
 
    return (
        <>
        <article>
            <div class="rescue_info">
                <h2 class="rescue_name">Pet Rescue of Boston</h2>
                <div class="rescue_details">
                    <h3>123 Main St, Boston MA &emsp; &ensp;  bostonrescue@gmail.com &emsp; &ensp; (999)-999-9999</h3>
                </div>
            </div>
            <form>
                <h2>Add a new animal to your shelter profile:</h2>
                <div class="row">
                    <ul class="col">
                        <li>
                            <label for="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </li>
                        <li>
                            <fieldset>
                                <legend>Type:</legend>
                                <ul>
                                    <li class="types">
                                        <input
                                                type="radio"
                                                id="dog"
                                                name="type"
                                                value="dog"
                                                checked={animalType === "dog"}
                                                onChange={() => handleTypeChange("dog")}
                                        />
                                        <label for="dog">Dog</label>
                                    </li>
                                    <li class="types">
                                        <input
                                                type="radio"
                                                id="cat"
                                                name="type"
                                                value="cat"
                                                checked={animalType === "cat"}
                                                onChange={() => handleTypeChange("cat")}
                                        />
                                        <label for="cat">Cat</label>
                                    </li>
                                    <li class="types">
                                        <input
                                                type="radio"
                                                id="other"
                                                name="type"
                                                value="other"
                                                checked={animalType === "other"}
                                                onChange={() => handleTypeChange("other")}
                                        />
                                        <label for="other">Other</label>
                                    </li>
                                    {/* Need to add functionality to specify other textbox */}
                                    <li>
                                        <label for="other-specify">If other, please specify:</label>
                                        <input
                                            type="text"
                                            id="other-specify"
                                        />
                                    </li>
                                </ul>
                            </fieldset>
                        </li>
                        <li>
                            <label>Breed:</label>
                            <select
                                name="breed"
                                id="breed"
                                value={breed}
                                onChange={handleBreedChange}
                            >
                                <option key='' value=''>Please select a breed</option>
                                {   
                                    breeds[animalType].map((breed) =>
                                        <option key={breed} value={breed}>{breed}</option>
                                    )
                                }
                            </select>
                        </li>
                        <li class="disposition-section">
                            <fieldset>
                                <legend>Disposition:</legend>
                                {dispositions.map(
                                    (disposition, index) => {
                                        return (
                                            <>
                                                <li class="dispositions">
                                                    <input
                                                        type="checkbox"
                                                        id={`disposition-${index}`}
                                                        name={disposition}
                                                        value={disposition}
                                                        checked={checkedState[index]}
                                                        onChange={() => handleCheckedStateChange(index)}
                                                    />
                                                    <label for={`disposition-${index}`}>
                                                        {disposition}
                                                    </label>
                                                </li>
                                            </>
                                        )
                                    }
                                )}
                            </fieldset>
                        </li>
                        <li>
                            <fieldset>
                                <legend>Availability:</legend>
                                <ul>
                                    <li class="availabilities">
                                        <input
                                            type="radio"
                                            id="not_available"
                                            name="availability"
                                            value="not_available"
                                        />
                                        <label for="not_available">Not available</label>
                                    </li>
                                    <li class="availabilities">
                                        <input
                                            type="radio"
                                            id="available"
                                            name="availability"
                                            value="available"
                                        />
                                        <label for="available">Available</label>
                                    </li>
                                    <li class="availabilities">
                                        <input
                                            type="radio"
                                            id="pending"
                                            name="availability"
                                            value="pending"
                                        />
                                        <label for="pending">Pending</label>
                                    </li>
                                    <li class="availabilities">
                                        <input
                                            type="radio"
                                            id="adopted"
                                            name="availability"
                                            value="adopted"
                                        />
                                        <label for="adopted">Adopted</label>
                                    </li>
                                </ul>
                            </fieldset>
                        </li>
                    </ul>
                    <ul class="col">
                        <li>
                            <legend for="description">Description:</legend>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                rows="10"
                                cols="50">
                            </textarea>
                        </li>
                        <li>
                            <legend for="news_blurb">News Blurb:</legend>
                            <textarea
                                id="news_blurb"
                                name="news_blurb"
                                value={newsBlurb}
                                onChange={handleNewsBlurbChange}
                                rows="10"
                                cols="50">
                            </textarea>
                        </li>
                    </ul>
                </div>
                <button type="submit" class="submit_button">Submit</button>
            </form>
        </article>
        </>
    )
}

export default AddNewAnimalPage;