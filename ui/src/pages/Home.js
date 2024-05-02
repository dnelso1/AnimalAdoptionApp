import React, { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';
import jsonData from '../db.json';
import { Link } from "react-router-dom";

export default function Home() {
    const [ pets, setPets ] = useState([]);
    // const [filteredData, setFilteredData] = useState(jsonData);
    const [ searchTerm, setSearchTerm ] = useState("");
    const API_KEY = "live_Uhu45k5OeEV0MN82685p9RMm803ZWvqtHoOVkXPCLKUvtQMNszT6a4lmD2IK3ifD";
    const petData = () => JSON.parse(JSON.stringify(jsonData));

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
                const data = petData();//await res.json();
                //console.log(data);
                setPets(data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPets();
    }, []);

    const filterPets = (searchTerm) => {
        try {
            const filteredData = petData().filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPets(filteredData);
        } catch (e) {
            console.error(e);
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setSearchTerm(value);
        filterPets(value);
    };

    // const searchForPet = async() => {
    //     try {
    //         const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${text}`);
    //         const data = petData();//await res.json();
    //         const selectedPets = data.find(item => item.id == id);
    //         //console.log(selectedPets);
    //         setPets(selectedPets);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     searchForPet();
    // }

    return (
        <>
            {!pets ? (
                <h1 className="flex items-center justify-center text-slate-800 text-center px-5
                                text-3xl h-screen font-bold">
                    Loading...
                </h1>
            ) : (
                <>
                    <div style={{
                        backgroundImage: "url(../../images/pets.jpg)",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <section className="p-8 max-w-7xl mx-auto">
                            <div className="flex flex-col text-center">
                                <h1 className="flex items-center justify-center text-slate-800 text-center px-5
                                            text-3xl font-bold lg:text-5xl">
                                    PetMatch
                                </h1>

                                <form className="my-8 max-w-xl mx-auto" autoComplete="off">
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        placeholder="Search for a pet..."
                                        className="py-2 px-4 rounded shadow w-full"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                    />
                                </form>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-6 lg:my-10">
                                {pets.map((pet) => (
                                    <Link
                                        to={`${pet.id}/${pet.name}`}
                                        key={pet.id}
                                        className="bg-slate-200 p-4 rounded hover:bg-slate-100 transition-all duration-200"
                                    >
                                        <PetCard pet={pet}/>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>
                </>
            )}
        </>
    );
}