import SideNav from "./SideNav";
import Main from "./Main";
import "../styles/App.css";
import React, { useState } from "react";
import sideImg from "../images/sidebar-icon.png";

const App = () => {
    const [wid, setWid] = useState("0%");

    const openSideNav = () => {
        setWid("25%");
    };

    const closeSideNav = () => {
        setWid("0%");
    };

    return (
        <div className="body">
            <button onClick={openSideNav}>
                <img src={sideImg} />
            </button>
            <SideNav width={wid} closeNav={closeSideNav} />
            <Main />
        </div>
    );
};

export default App;
