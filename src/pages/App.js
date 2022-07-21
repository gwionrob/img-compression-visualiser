import SideNav from "../components/SideNav";
import Main from "./Main";
import "../styles/App.scss";
import { React, useState, useEffect } from "react";
import sideImg from "../images/sidebar-icon.png";
import { useLocation } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

const toTitle = (title) => {
    let newTitle = title === "" ? "Recreational Image Compression" : title;
    newTitle = newTitle.replaceAll("-", " ");
    return newTitle.replace(/\w\S*/g, (title) => {
        return title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();
    });
};

const App = () => {
    const title = toTitle(useLocation().pathname.slice(1).replaceAll("-", " "));

    const [navWid, setNavWid] = useState("0%");
    const { height, width } = useWindowDimensions();
    const isMobile = width < 600;

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
                <button onClick={openSideNav} className="sidenav-open">
                    <img
                        className="sidenav-btn-img"
                        src={sideImg}
                        alt="sidenav button icon"
                    />
                </button>
            </div>
            <SideNav
                width={navWid}
                closeNav={closeSideNav}
                currentTab={title}
            />
            <Main />
        </div>
    );
};

export default App;
