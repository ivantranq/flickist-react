import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import MovieInfo from "./pages/MovieInfo";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path={`/search/:input`} element={<Search />} />
          <Route path="/:id" element={<MovieInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
