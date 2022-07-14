import { Link } from "react-router-dom";

const SideNav = (props) => {
    return (
        <div className="sidenav" style={{ width: props.width }}>
            <button onClick={props.closeNav} className="sidenav-close">
                X
            </button>
            <Link
                to="/img-compression-visualiser"
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
                to="/img-compression-visualiser/discrete-cosine-transform"
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
                to="/img-compression-visualiser/fractal-compression"
                onClick={props.closeNav}
                style={
                    props.currentTab.slice(0, 3) === "Fra"
                        ? { color: "red" }
                        : null
                }
            >
                Fractal Compression
            </Link>
            <Link
                to="/img-compression-visualiser/k-means"
                onClick={props.closeNav}
                style={
                    props.currentTab.slice(0, 3) === "K M"
                        ? { color: "red" }
                        : null
                }
            >
                K-Means
            </Link>
        </div>
    );
};

export default SideNav;
