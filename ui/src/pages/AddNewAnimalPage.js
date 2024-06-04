import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function AddNewAnimalPage() {
    const dispositions = ['Good with other animals', 'Good with children', 'Animal must be leashed at all times']
    const breeds = {
        dog: ["Golden Retriever", "German Shepard", "Labrador", "Bulldog", "Poodle", "Beagle", "Dachshund", "Boxer", "Other"],
        cat: ["Persian", "Maine Coon", "Siamese", "American Shorthair", "Sphynx", "Bengal", "Ragdoll", "Russian Blue", "Cornish Rex", "Other"],
        other: []
    }
    const image_labels = ["Image 1 URL (required):", "Image 2 URL:", "Image 3 URL:", "Image 4 URL:", "Image 5 URL:"]

    const [checkedState, setCheckedState] = useState([false, false, false]);
    const [name, setName] = useState('');
    const [animalType, setType] = useState('dog');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [newsBlurb, setNewsBlurb] = useState('');
    const [images, setImages] = useState(['', '', '', '', '']);
    const [otherType, setOtherType] = useState('');
    const [availability, setAvailability] = useState('Available');
    const [gender, setGender] = useState('Male');
    const [age, setAge] = useState(0);

    const handleImageChange = (position, e) => {
        const updatedImageState = images.map((item, index) =>
            index === position ? e.target.value : item
        );
        setImages(updatedImageState)
       }
    
    const handleCheckedStateChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleGenderChange = (gender) => {
        setGender(gender);
    }

    const handleAgeChange = (e) => {
        setAge(e.target.value);
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

    const handleOtherTypeChange = (e) => {
        setOtherType(e.target.value)
    }

    const handleAvailabilityChange = (availability) => {
        setAvailability(availability);
    }

    // Handle form submission
    const handleSubmit = async () => {
        let sentType = '';
        let sentDisposition = '';
        

        // Format type value
        if (animalType === 'other') {
            sentType = otherType;
        } else {
            sentType = animalType;
        }


        // Format disposition value
        let i = 0;
        while (i < dispositions.length) {
            if (checkedState[i] === true) {
                sentDisposition += dispositions[i] + ', ';
            }
            i++;
        }
        sentDisposition = sentDisposition.slice(0, -1);


        const newAnimal = {
            "name": name,
            "type": sentType,
            "breed": breed,
            "disposition": sentDisposition,
            "availability": availability,
            "description": description,
            "news_blurb": newsBlurb,
            "images": images,
            "gender": gender,
            "age": age
        }
        const response = await axios.post('http://127.0.0.1:8010/add-animal-profile', newAnimal);
        console.log(response)
        if (response.status === 200) {
            setCheckedState([false, false, false]);
            setName('');
            setType('dog');
            setBreed('');
            setDescription('');
            setNewsBlurb('');
            setImages(['', '', '', '', '']);
            setOtherType('');
            setAvailability('Available');
            setGender('Male');
            setAge(0);

            window.alert("Your new animal profile was successfully added!");
        }
        else {
            window.alert('We are unable to add your animal profile.')
        }

        // console.log("submission worked!");
        // console.log(newAnimal);
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
            <div class="row">
                <form class="col" onSubmit={(e) => {e.preventDefault();}}>
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
                                        <li>
                                            <label for="other-specify">If other, please specify:</label>
                                            <input
                                                type="text"
                                                id="other-specify"
                                                name="other-type"
                                                value={otherType}
                                                onChange={handleOtherTypeChange}
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
                                                    <li class="dispositions" key={`disposition-${index}`}>
                                                        <input
                                                            type="checkbox"
                                                            id={index}
                                                            name={disposition}
                                                            value={disposition}
                                                            checked={checkedState[index]}
                                                            onChange={() => handleCheckedStateChange(index)}
                                                        />
                                                        <label for={`disposition-${index}`}>
                                                            {disposition}
                                                        </label>
                                                    </li>
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
                                                id="available"
                                                name="availability"
                                                value="available"
                                                checked={availability === "Available"}
                                                onChange={() => handleAvailabilityChange("Available")}
                                            />
                                            <label for="available">Available</label>
                                        </li>
                                        <li class="availabilities">
                                            <input
                                                type="radio"
                                                id="not_available"
                                                name="availability"
                                                value="not_available"
                                                checked={availability === "Not available"}
                                                onChange={() => handleAvailabilityChange("Not available")}
                                            />
                                            <label for="not_available">Not available</label>
                                        </li>
                                        <li class="availabilities">
                                            <input
                                                type="radio"
                                                id="pending"
                                                name="availability"
                                                value="pending"
                                                checked={availability === "Pending"}
                                                onChange={() => handleAvailabilityChange("Pending")}
                                            />
                                            <label for="pending">Pending</label>
                                        </li>
                                        <li class="availabilities">
                                            <input
                                                type="radio"
                                                id="adopted"
                                                name="availability"
                                                value="adopted"
                                                checked={availability === "Adopted"}
                                                onChange={() => handleAvailabilityChange("Adopted")}
                                            />
                                            <label for="adopted">Adopted</label>
                                        </li>
                                    </ul>
                                </fieldset>
                            </li>
                        </ul>
                        <ul class="col">
                            <li>
                                <fieldset>
                                    <legend>Gender:</legend>
                                    <ul>
                                        <li class="types">
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="Male"
                                                checked={gender === "Male"}
                                                onChange={() => handleGenderChange("Male")}
                                            />
                                            <label for="male">Male</label>
                                        </li>
                                        <li class="types">
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="Female"
                                                checked={gender === "Female"}
                                                onChange={() => handleGenderChange("Female")}
                                            />
                                            <label for="female">Female</label>
                                        </li>
                                    </ul>
                                </fieldset>                                
                            </li>
                            <li>
                                <label for="age">Age:</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={age}
                                    onChange={handleAgeChange}
                                />
                            </li>
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
                        <ul class="col">
                            <legend>Please provide at least one image:</legend>
                            <fieldset>
                                {image_labels.map(
                                    (image, index) => {
                                        return (
                                            <>
                                                <li class="urls-images" key={`image-${index}`}>
                                                    <input
                                                        type="url"
                                                        name="image_urls"
                                                        id={`image-${index}`}
                                                        value={images[index]}
                                                        onChange={(e) => handleImageChange(index, e)}
                                                        placeholder="https://www.example.com/image"
                                                        size="34"
                                                    />
                                                    <img src={images[index]} width="125" height="125" alt=""></img>
                                                </li>
                                                
                                            </>       
                                        )
                                    }
                                )}
                            </fieldset>
                            
                        </ul>
                    </div>
                    <button type="submit" class="submit_button" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            
        </article>
        </>
    )
}

export default AddNewAnimalPage;