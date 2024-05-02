import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route> // render={() => <Home />} />
          <Route path="/:id/:name" element={<PetDetail />}></Route> // render={() => <PetDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
