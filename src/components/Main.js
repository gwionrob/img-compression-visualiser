import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import KMeans from "./pages/KMeans";
import DCC from "./pages/DCC";
import FractalComp from "./pages/FractalComp";

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/discrete-cosine-transform" element={<DCC />} />

            <Route path="/fractal-compression" element={<FractalComp />} />

            <Route path="/k-means" element={<KMeans />} />
        </Routes>
    );
};

export default Main;
