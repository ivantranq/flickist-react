import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Navbar from "./components/Navbar";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
