import React, { MouseEventHandler, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
    navWidth: string;
    closeNav: MouseEventHandler;
    currentTab: string;
};

function SideNav({ navWidth, closeNav, currentTab }: Props): JSX.Element {
    const [ddHeight, setDdHeight] = useState<string>("0%");
    const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

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
                    currentTab.slice(0, 3) === "Rec"
                        ? { color: "red" }
                        : undefined
                }
            >
                Home
            </Link>
            <Link
                to="/about"
                onClick={closeNav}
                style={
                    currentTab.slice(0, 3) === "Abo"
                        ? { color: "red" }
                        : undefined
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
                        : undefined
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
                            : undefined
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
                            : undefined
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
                            : undefined
                    }
                >
                    Fractal Compression
                </Link>
            </div>
        </div>
    );
}

export default SideNav;
