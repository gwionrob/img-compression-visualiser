import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Visualiser from "./Visualiser";
import About from "./About";

function Main(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/image-compression-visualiser" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/:algo" element={<Visualiser />} />
        </Routes>
    );
}

export default Main;
