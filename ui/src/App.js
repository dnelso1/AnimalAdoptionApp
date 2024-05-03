import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShelterProfilePage from './pages/ShelterProfilePage';
import AddNewAnimalPage from './pages/AddNewAnimalPage';

function App() {
  return (
    <>
      <Router>
            <header>
              <h1>Pet Match</h1>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<ShelterProfilePage />} />
                <Route path="/add-animal" element={<AddNewAnimalPage />} />
              </Routes>
            </main>

        </Router>
    </>
  );
}

export default App;
