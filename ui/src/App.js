import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShelterProfilePage from './pages/ShelterProfilePage'

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
              </Routes>
            </main>

        </Router>
    </>
  );
}

export default App;
