import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShelterPage from './pages/ShelterPage';
import AddNewAnimalPage from './pages/AddNewAnimalPage';
import LandingPage from './pages/LandingPage';
import EditShelterPage from './pages/EditShelterPage';

function App() {
  return (
    <>
      <Router>
            <header>
              <h1>Pet Match</h1>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/shelter" element={<ShelterPage />} />
                <Route path="/shelter/add-animal" element={<AddNewAnimalPage />} />
                <Route path="shelter/edit-profile" element={<EditShelterPage />}/>
              </Routes>
            </main>

        </Router>
    </>
  );
}

export default App;
