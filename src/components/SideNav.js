import { Link } from "react-router-dom";

const SideNav = (props) => {
    return (
        <div className="sideNav" style={{ width: props.width }}>
            <button onClick={props.closeNav} className="sidenav-close">
                X
            </button>
            <Link to="/" onClick={props.closeNav}>
                Home
            </Link>
            <Link to="/discrete-cosine-transform" onClick={props.closeNav}>
                Discrete Cosine Transform
            </Link>
            <Link to="/fractal-compression" onClick={props.closeNav}>
                Fractal Compression
            </Link>
            <Link to="/k-means" onClick={props.closeNav}>
                K-Means
            </Link>
        </div>
    );
};

export default SideNav;
