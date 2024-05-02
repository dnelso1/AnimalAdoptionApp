import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import jsonData from '../db.json';

export default function PetDetail() {
    const [ pet, setPet ] = useState([]);
    const { id, name } = useParams();
    const API_KEY = "live_Uhu45k5OeEV0MN82685p9RMm803ZWvqtHoOVkXPCLKUvtQMNszT6a4lmD2IK3ifD";
    const petData = () => JSON.parse(JSON.stringify(jsonData));

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);
                const data = petData();//await res.json();
                const selectedItem = data.find(item => item.id == id);
                //console.log(selectedItem);
                setPet(selectedItem);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPetData();
    }, [name])

    return (
        <>
            <section className="max-w-5xl mx-auto flex items-center justify-center h-screen">
                <div key={pet.id} className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
                    <article>
                        <img
                            src={`../../images/${pet.image}`}
                            alt={pet.name}
                            className="rounded md:h-255 w-full object-cover"
                        />
                    </article>
                    <article>
                        <h1 className="text-3xl font-bold mb-8 lg:text-5xl">{pet.name}</h1>
                        <p className="text-slate-500 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">{pet.description}</p>
                        <ul className="text-sm text-slate-600 leading-loose lg:text-base lg:leading-relaxed">
                            <li>
                                <span className="font-bold text-slate-700">Species: </span>
                                {pet.animalType}
                            </li>
                            <li>
                                <span className="font-bold text-slate-700">Breed: </span>
                                {pet.breed}
                            </li>
                            <li>
                                <span className="font-bold text-slate-700">Gender: </span>
                                {pet.isBoy ? "Male" : "Female"}
                            </li>
                            <li>
                                <span className="font-bold text-slate-700">Age: </span>
                                {pet.age}
                            </li>
                            <li>
                                <span className="font-bold text-slate-700">Status: </span>
                                {pet.isAdopted ? "Adopted" : "Available"}
                            </li>
                        </ul>

                        <Link to={`/`} className="inline-block bg-slate-300 py-2 px-6 rounded mt-8 hover:bg-slate-400
                                            transition-all duration-200">
                            &larr; Back
                        </Link>
                    </article>
                </div>
            </section>
        </>
    )
}