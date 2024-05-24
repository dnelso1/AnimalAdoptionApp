import React from 'react';

const PetCard = ({ pet }) => {
    const API_KEY = "live_Uhu45k5OeEV0MN82685p9RMm803ZWvqtHoOVkXPCLKUvtQMNszT6a4lmD2IK3ifD";
    return (
        <article key={ pet.id }>
            <img
                src={`images/${pet.image}`}
                alt={pet.name}
                loading="lazy"
                className="rounded md:h-72 w-full object-cover"
            />
            <h3 className="text-2xl font-bold mt-4">{pet.name} ({pet.age})<span className="text-lg text-slate-600"> - {pet.breed}</span></h3>
            <p className="text-slate-600">{(pet.isAdopted) ? "Adopted" : "Available"}</p>
        </article>
    )
}

export default PetCard;