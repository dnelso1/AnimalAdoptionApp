import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import SwipePets from "./pages/SwipePets";
import LandingPage from "./pages/LandingPage";
import ShelterPage from "./pages/ShelterPage";
import AddNewAnimalPage from "./pages/AddNewAnimalPage";
import EditShelterPage from "./pages/EditShelterPage";
import ShelterAnimals from "./pages/ShelterAnimals";
import ShelterAnimalDetails from "./pages/ShelterAnimalDetails";
import Login from './pages/Login';
import Register from './pages/Register';
import Index from './pages/Index';
import Logout from './pages/Logout';
import Edit from './pages/Edit';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/home/:id/:name" element={<PetDetail />}></Route>
            <Route path="/swipe" element={<SwipePets />}></Route>
            <Route path="/shelter" element={<ShelterPage />} />
            <Route path="/shelter/add-animal" element={<AddNewAnimalPage />} />
            <Route path="shelter/edit-profile" element={<EditShelterPage />}/>
            <Route path="shelter/animals" element={<ShelterAnimals />}/>
            <Route path="shelter/animal-details" element={<ShelterAnimalDetails />}/>
            <Route path= "/login" element={<Login />} />
            <Route path= "/register" element={<Register />} />
            <Route path= "/index" element={<Index />} />
            <Route path= "/logout" element={<Logout />} />
            <Route path= "/edit" element={<Edit />} />     
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
