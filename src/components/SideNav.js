import { Link } from "react-router-dom";
import { useState } from "react";

const SideNav = (props) => {
    const [ddHeight, setDdHeight] = useState("0%");
    const [dropDownVisible, setDropDownVisible] = useState(false);

    const toggleDd = () => {
        setDdHeight(dropDownVisible ? "0%" : "40%");
        setDropDownVisible(!dropDownVisible);
    };

    return (
        <div className="sidenav" style={{ width: props.width }}>
            <button onClick={props.closeNav} className="sidenav-close">
                X
            </button>
            <Link
                to="/"
                onClick={props.closeNav}
                style={
                    props.currentTab.slice(0, 3) === "Rec"
                        ? { color: "red" }
                        : null
                }
            >
                Home
            </Link>
            <Link
                to="/about"
                onClick={props.closeNav}
                style={
                    props.currentTab.slice(0, 3) === "Abo"
                        ? { color: "red" }
                        : null
                }
            >
                About
            </Link>
            <button
                className="dropdown-btn"
                onClick={toggleDd}
                style={
                    ["K M", "Dis", "Fra"].includes(props.currentTab.slice(0, 3))
                        ? { color: "red" }
                        : null
                }
            >
                Visualiser
            </button>
            <div className="dropdown-container" style={{ height: ddHeight }}>
                <Link
                    to="/:k-means"
                    onClick={props.closeNav}
                    style={
                        props.currentTab.slice(0, 3) === "K M"
                            ? { color: "red" }
                            : null
                    }
                >
                    K-Means
                </Link>
                <Link
                    to="/:discrete-cosine-transform"
                    onClick={props.closeNav}
                    style={
                        props.currentTab.slice(0, 3) === "Dis"
                            ? { color: "red" }
                            : null
                    }
                >
                    Discrete Cosine Transform
                </Link>
                <Link
                    to="/:fractal-compression"
                    onClick={props.closeNav}
                    style={
                        props.currentTab.slice(0, 3) === "Fra"
                            ? { color: "red" }
                            : null
                    }
                >
                    Fractal Compression
                </Link>
            </div>
        </div>
    );
};

export default SideNav;
