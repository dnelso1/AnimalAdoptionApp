import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import SwipePets from "./pages/SwipePets";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/:id/:name" element={<PetDetail />}></Route>
            <Route path="/swipe" element={<SwipePets />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
