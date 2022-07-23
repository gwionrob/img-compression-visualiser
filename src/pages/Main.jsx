import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Visualiser from "./Visualiser";
import About from "./About";

function Main() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/img-compression-visualiser" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/:algo" element={<Visualiser />} />
        </Routes>
    );
}

export default Main;
