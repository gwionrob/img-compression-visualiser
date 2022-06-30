import SideNav from "../components/SideNav";
import Main from "./Main";
import "../styles/App.scss";
import { React, useState, useEffect } from "react";
import sideImg from "../images/sidebar-icon.png";
import { useLocation } from "react-router-dom";

const toTitle = (title) => {
    let newTitle = title === "" ? "Recreational Image Compression" : title;
    newTitle = newTitle.replaceAll("-", " ");
    return newTitle.replace(/\w\S*/g, (title) => {
        return title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();
    });
};

const App = () => {
    const title = toTitle(useLocation().pathname.slice(1).replaceAll("-", " "));

    const [wid, setWid] = useState("0%");

    useEffect(() => {
        document.title = title;
    });

    const openSideNav = () => {
        setWid("25%");
    };

    const closeSideNav = () => {
        setWid("0%");
    };

    return (
        <div className="app">
            <div className="top-bar">
                <button onClick={openSideNav} className="sidenav-open">
                    <img
                        className="sidenav-btn-img"
                        src={sideImg}
                        alt="sidenav button icon"
                    />
                </button>
            </div>
            <SideNav width={wid} closeNav={closeSideNav} currentTab={title} />
            <Main />
        </div>
    );
};

export default App;
