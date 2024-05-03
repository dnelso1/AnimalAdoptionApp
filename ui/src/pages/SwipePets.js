import React, {useEffect, useState} from "react";
import jsonData from '../db.json';
import TinderCard from "react-tinder-card";
import '../styles/SwipePets.css';

export default function SwipePets() {
    const [pets, setPets] = useState([]);
    const petData = () => JSON.parse(JSON.stringify(jsonData));

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = petData();
                console.log(data);
                setPets(data.reverse());
            } catch (e) {
                console.error(e);
            }
        }

        fetchPets();
    }, []);

    const swiped = (direction, idToDelete) => {
        console.log("receiving direction " + direction + " and id " + idToDelete);
    }

    const outOfFrame = pet => {
        console.log(pet.name + " left the screen");
    }

    return (
        <>
            <div className="swipeCards">
                <div className="swipeCards__container">
                    {pets.map((pet) => (
                        <TinderCard
                            className="swipe"
                            key={pet.id}
                            preventSwipe={['up', 'down']}
                            onSwipe={dir => swiped(dir, pet.id)}
                            onCardsLeftScreen={() => outOfFrame(pet)}
                        >
                            <div className="card" style={{ backgroundImage: `url(images/${pet.image}`}}>
                                <h2 className="text-3xl">{pet.name}</h2>
                            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
        </>
    )
}