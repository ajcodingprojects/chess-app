import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Landing from './screens/Landing';
import Game from './screens/Game';
import Loading from "./screens/Loading";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Loading /> } />
        <Route path="/chess" element={<Landing />} />
        <Route path="/chess/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
