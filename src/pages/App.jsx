import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideNav from "../components/SideNav";
import Main from "./Main";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/App.scss";
import sideImg from "../images/sidebar-icon.png";

const toTitle = (title) => {
    let newTitle = title === "" ? "Recreational Image Compression" : title;
    if (title.charAt(0) === ":") {
        newTitle = title.slice(1);
    }
    newTitle = newTitle.replaceAll("-", " ");
    return newTitle.replace(
        /\w\S*/g,
        (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase(),
    );
};

function App() {
    const title = toTitle(useLocation().pathname.slice(1).replaceAll("-", " "));

    const [navWid, setNavWid] = useState("0%");
    const isMobile = useIsMobile();

    useEffect(() => {
        document.title = title;
    });

    const openSideNav = () => {
        setNavWid(isMobile ? "75%" : "25%");
    };

    const closeSideNav = () => {
        setNavWid("0%");
    };

    return (
        <div className="app">
            <div className="top-bar">
                <button
                    type="button"
                    onClick={openSideNav}
                    className="sidenav-open"
                >
                    <img
                        className="sidenav-btn-img"
                        src={sideImg}
                        alt="sidenav button icon"
                    />
                </button>
            </div>
            <SideNav
                navWidth={navWid}
                closeNav={closeSideNav}
                currentTab={title}
            />
            <Main />
        </div>
    );
}

export default App;
