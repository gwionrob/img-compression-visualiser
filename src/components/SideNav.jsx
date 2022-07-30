import { React, useState } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

function SideNav(props) {
    const { navWidth, closeNav, currentTab } = props;
    const [ddHeight, setDdHeight] = useState("0%");
    const [dropDownVisible, setDropDownVisible] = useState(false);

    const toggleDd = () => {
        setDdHeight(dropDownVisible ? "0%" : "40%");
        setDropDownVisible(!dropDownVisible);
    };

    return (
        <div className="sidenav" style={{ width: navWidth }}>
            <button type="button" onClick={closeNav} className="sidenav-close">
                X
            </button>
            <Link
                to="/"
                onClick={closeNav}
                style={
                    currentTab.slice(0, 3) === "Rec" ? { color: "red" } : null
                }
            >
                Home
            </Link>
            <Link
                to="/about"
                onClick={closeNav}
                style={
                    currentTab.slice(0, 3) === "Abo" ? { color: "red" } : null
                }
            >
                About
            </Link>
            <button
                type="button"
                className="dropdown-btn"
                onClick={toggleDd}
                style={
                    ["K M", "Dis", "Fra"].includes(currentTab.slice(0, 3))
                        ? { color: "red" }
                        : null
                }
            >
                Visualiser
            </button>
            <div className="dropdown-container" style={{ height: ddHeight }}>
                <Link
                    to="/:k-means"
                    onClick={closeNav}
                    style={
                        currentTab.slice(0, 3) === "K M"
                            ? { color: "red" }
                            : null
                    }
                >
                    K-Means
                </Link>
                <Link
                    to="/:discrete-cosine-transform"
                    onClick={closeNav}
                    style={
                        currentTab.slice(0, 3) === "Dis"
                            ? { color: "red" }
                            : null
                    }
                >
                    Discrete Cosine Transform
                </Link>
                <Link
                    to="/:fractal-compression"
                    onClick={closeNav}
                    style={
                        currentTab.slice(0, 3) === "Fra"
                            ? { color: "red" }
                            : null
                    }
                >
                    Fractal Compression
                </Link>
            </div>
        </div>
    );
}

SideNav.propTypes = {
    navWidth: propTypes.string.isRequired,
    closeNav: propTypes.func.isRequired,
    currentTab: propTypes.string.isRequired,
};

export default SideNav;
