import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Darshboard from "./pages/darshboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Room from "./pages/room";




const App = () => {

  return (

      <Router>
        <Routes>
          <Route path="/" element={<Darshboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </Router>
  );
}

export default App;
