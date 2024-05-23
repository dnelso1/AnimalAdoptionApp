import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShelterProfilePage from './pages/ShelterProfilePage';
import AddNewAnimalPage from './pages/AddNewAnimalPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <Router>
            <header>
              <h1>Pet Match</h1>
            </header>

            <main>
              <Routes>
                <Route path="/shelter-page" element={<ShelterProfilePage />} />
                <Route path="/add-animal" element={<AddNewAnimalPage />} />
                <Route path="/" element={<LandingPage />}/>
              </Routes>
            </main>

        </Router>
    </>
  );
}

export default App;
