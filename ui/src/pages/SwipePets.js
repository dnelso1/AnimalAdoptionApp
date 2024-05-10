import React, {useEffect, useState, useMemo, useRef} from "react";
import jsonData from '../db.json';
import TinderCard from "react-tinder-card";
import '../styles/SwipePets.css';
import '../styles/SwipeButtons.css';
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SwipePets() {
    const petData = () => JSON.parse(JSON.stringify(jsonData));
    const [pets, setPets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(petData().length - 1);
    const [lastDirection, setLastDirection] = useState();
    const [currentPet, setCurrentPet] = useState(petData()[0]);
    console.log(`starting pet: ${currentPet.name}`);
    const currPet = petData()[0];
    const currentIndexRef = useRef(currentIndex);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const data = petData();
                console.log(`data: ${data}`);
                setPets(data.reverse());
                // updateCurrentIndex(petData().length - 1);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPets();
    }, []);

    const childRefs = useMemo(
        () =>
            Array(petData().length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        console.log(`Current index: ${currentIndex}`);
        setCurrentIndex(val);
        console.log(`New current index: ${val}`);
        currentIndexRef.current = val;
    }

    const canGoBack = currentIndex < pets.length - 1;

    const canSwipe = currentIndex >= 0;

    const swiped = (direction, idToDelete, index) => {
        console.log(`receiving direction: ${direction}, id: ${idToDelete}, index: ${index}`);
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
        updateCurrentPet(currentIndex - 1);
    }

    const outOfFrame = (pet, idx) => {
        console.log(`${pet.name} (${idx}) left the screen!`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < petData().length) {
            updateCurrentPet(currentIndex - 1);
            await childRefs[currentIndex].current.swipe(dir); // swipe the card
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return;
        const newIndex = currentIndex + 1;
        updateCurrentIndex(newIndex);
        console.log(pets[newIndex].name);
        updateCurrentPet(newIndex);
        await childRefs[newIndex].current.restoreCard();
    }

    const updateCurrentPet = (index) => {
        console.log(`Current pet: ${currentPet.name}`);
        setCurrentPet(pets[index]);
        console.log(`New current pet: ${currentPet.name}`);
    }

    return (
        <>
            <div className="swipeCards">
                <div className="swipeCards__container">
                    {pets.map((pet, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className="swipe"
                            key={pet.id}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, pet.id, index)}
                            onCardsLeftScreen={() => outOfFrame(pet, index)}
                        >
                            <div className="card" style={{backgroundImage: `url(images/${pet.image}`}}>
                                {/*<h2 className="text-3xl">{pet.name}</h2>*/}
                            </div>
                            <div className="swipeButtons">
                                <IconButton className="swipeButtons__left"
                                            style={{backgroundColor: !canSwipe && '#c3c4d3'}}
                                            onClick={() => swipe('left')}>
                                    <CloseIcon fontSize="large"/>
                                </IconButton>
                                <IconButton className="swipeButtons__undo"
                                            style={{backgroundColor: !canGoBack && '#c3c4d3'}}
                                            onClick={() => goBack()}>
                                    <ReplayIcon fontSize="large"/>
                                </IconButton>
                                <IconButton className="swipeButtons__right"
                                            style={{backgroundColor: !canSwipe && '#c3c4d3'}}
                                            onClick={() => swipe('right')}>
                                    <FavoriteIcon fontSize="large"/>
                                </IconButton>
                            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
            <div className="description">
                <h2 className="text-3xl">{currentPet.name} ({currentPet.age} y.o.)</h2>
                <ul style={{listStyleType: "disc"}}>
                    <li>{currentPet.breed}</li>
                    <li>{currentPet.isBoy ? "Male" : "Female"}</li>
                    <li>{currentPet.description}</li>
                </ul>
            </div>
        </>
    )
}